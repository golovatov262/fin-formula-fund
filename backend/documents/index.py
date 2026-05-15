"""Управление документами: список, загрузка PDF в S3, добавление/удаление произвольных документов."""
import os
import json
import base64
import re
import uuid
import boto3
from botocore.exceptions import ClientError

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
}

MANIFEST_KEY = 'documents/manifest.json'

DEFAULT_DOCUMENTS = [
    {'slug': 'ustav', 'title': 'Устав', 'description': 'Основной учредительный документ кооператива'},
    {'slug': 'polozhenie-o-chlenstvo', 'title': 'Положение о членстве', 'description': 'Условия и порядок вступления в кооператив'},
    {'slug': 'polozhenie-o-zaymah', 'title': 'Положение о выдаче займов', 'description': 'Правила и условия предоставления займов членам'},
    {'slug': 'polozhenie-o-sberezheniyah', 'title': 'Положение о приёме сбережений', 'description': 'Порядок и условия приёма личных сбережений'},
]


def get_s3():
    return boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )


def check_auth(headers):
    token = headers.get('X-Authorization') or headers.get('x-authorization') or ''
    if token.startswith('Bearer '):
        token = token[7:]
    return token == os.environ.get('ADMIN_PASSWORD', '')


def load_manifest(s3):
    try:
        obj = s3.get_object(Bucket='files', Key=MANIFEST_KEY)
        data = json.loads(obj['Body'].read().decode('utf-8'))
        if isinstance(data, list):
            return data
    except ClientError:
        pass
    except Exception:
        pass
    return [dict(d) for d in DEFAULT_DOCUMENTS]


def save_manifest(s3, manifest):
    s3.put_object(
        Bucket='files',
        Key=MANIFEST_KEY,
        Body=json.dumps(manifest, ensure_ascii=False).encode('utf-8'),
        ContentType='application/json',
    )


def slugify(text):
    text = (text or '').strip().lower()
    translit = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    }
    result = ''.join(translit.get(ch, ch) for ch in text)
    result = re.sub(r'[^a-z0-9]+', '-', result).strip('-')
    if not result:
        result = f'doc-{uuid.uuid4().hex[:8]}'
    return result[:60]


def build_docs_response(s3, manifest):
    access_key = os.environ['AWS_ACCESS_KEY_ID']
    docs = []
    for item in manifest:
        slug = item.get('slug')
        if not slug:
            continue
        key = f'documents/{slug}.pdf'
        try:
            s3.head_object(Bucket='files', Key=key)
            uploaded = True
            url = f'https://cdn.poehali.dev/projects/{access_key}/bucket/{key}'
        except Exception:
            uploaded = False
            url = None
        docs.append({
            'slug': slug,
            'title': item.get('title', slug),
            'description': item.get('description', ''),
            'url': url,
            'uploaded': uploaded,
        })
    return docs


def handler(event: dict, context) -> dict:
    """Список, загрузка, добавление, переименование и удаление документов кооператива"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    headers = event.get('headers') or {}
    s3 = get_s3()

    if method == 'GET':
        manifest = load_manifest(s3)
        documents = build_docs_response(s3, manifest)
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'documents': documents})}

    if not check_auth(headers):
        return {'statusCode': 401, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Unauthorized'})}

    body = {}
    raw = event.get('body')
    if raw:
        try:
            body = json.loads(raw)
        except Exception:
            body = {}

    if method == 'POST':
        action = body.get('action')

        if action == 'create':
            title = (body.get('title') or '').strip()
            description = (body.get('description') or '').strip()
            if not title:
                return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Title required'})}
            manifest = load_manifest(s3)
            existing_slugs = {d['slug'] for d in manifest}
            base_slug = slugify(title)
            slug = base_slug
            i = 2
            while slug in existing_slugs:
                slug = f'{base_slug}-{i}'
                i += 1
            manifest.append({'slug': slug, 'title': title, 'description': description})
            save_manifest(s3, manifest)
            return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True, 'slug': slug})}

        slug = body.get('slug')
        file_data = body.get('file')
        manifest = load_manifest(s3)
        slugs = {d['slug'] for d in manifest}
        if slug not in slugs:
            return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Unknown document slug'})}
        if not file_data:
            return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'No file provided'})}
        pdf_bytes = base64.b64decode(file_data)
        key = f'documents/{slug}.pdf'
        s3.put_object(Bucket='files', Key=key, Body=pdf_bytes, ContentType='application/pdf')
        access_key = os.environ['AWS_ACCESS_KEY_ID']
        url = f'https://cdn.poehali.dev/projects/{access_key}/bucket/{key}'
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'url': url, 'slug': slug})}

    if method == 'PUT':
        slug = body.get('slug')
        title = (body.get('title') or '').strip()
        description = (body.get('description') or '').strip()
        manifest = load_manifest(s3)
        found = False
        for item in manifest:
            if item['slug'] == slug:
                if title:
                    item['title'] = title
                item['description'] = description
                found = True
                break
        if not found:
            return {'statusCode': 404, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Not found'})}
        save_manifest(s3, manifest)
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

    if method == 'DELETE':
        slug = body.get('slug')
        remove_entry = bool(body.get('removeEntry'))
        manifest = load_manifest(s3)
        slugs = {d['slug'] for d in manifest}
        if slug not in slugs:
            return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Unknown document slug'})}
        try:
            s3.delete_object(Bucket='files', Key=f'documents/{slug}.pdf')
        except Exception:
            pass
        if remove_entry:
            manifest = [d for d in manifest if d['slug'] != slug]
            save_manifest(s3, manifest)
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Method not allowed'})}