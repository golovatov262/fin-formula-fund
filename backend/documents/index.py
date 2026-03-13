"""Управление документами: загрузка PDF в S3 и получение списка документов."""
import os
import json
import base64
import boto3
from datetime import datetime

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
}

DOCUMENT_SLUGS = {
    'ustav': 'Устав',
    'polozhenie-o-chlenstvo': 'Положение о членстве',
    'polozhenie-o-zaymah': 'Положение о выдаче займов',
    'polozhenie-o-sberezheniyah': 'Положение о приёме сбережений',
}

DOCUMENT_DESCRIPTIONS = {
    'ustav': 'Основной учредительный документ кооператива',
    'polozhenie-o-chlenstvo': 'Условия и порядок вступления в кооператив',
    'polozhenie-o-zaymah': 'Правила и условия предоставления займов членам',
    'polozhenie-o-sberezheniyah': 'Порядок и условия приёма личных сбережений',
}

def get_s3():
    return boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

def check_auth(headers):
    token = headers.get('X-Authorization', '')
    if token.startswith('Bearer '):
        token = token[7:]
    return token == os.environ.get('ADMIN_PASSWORD', '')

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    headers = event.get('headers') or {}

    # GET — список документов (публичный)
    if method == 'GET':
        s3 = get_s3()
        access_key = os.environ['AWS_ACCESS_KEY_ID']
        documents = []
        for slug, title in DOCUMENT_SLUGS.items():
            key = f'documents/{slug}.pdf'
            try:
                s3.head_object(Bucket='files', Key=key)
                url = f'https://cdn.poehali.dev/projects/{access_key}/bucket/{key}'
                documents.append({
                    'slug': slug,
                    'title': title,
                    'description': DOCUMENT_DESCRIPTIONS[slug],
                    'url': url,
                    'uploaded': True,
                })
            except Exception:
                documents.append({
                    'slug': slug,
                    'title': title,
                    'description': DOCUMENT_DESCRIPTIONS[slug],
                    'url': None,
                    'uploaded': False,
                })
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'documents': documents})}

    # POST — загрузка документа (требует авторизации)
    if method == 'POST':
        if not check_auth(headers):
            return {'statusCode': 401, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Unauthorized'})}

        body = json.loads(event.get('body') or '{}')
        slug = body.get('slug')
        file_data = body.get('file')

        if slug not in DOCUMENT_SLUGS:
            return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Unknown document slug'})}
        if not file_data:
            return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'No file provided'})}

        pdf_bytes = base64.b64decode(file_data)
        key = f'documents/{slug}.pdf'
        s3 = get_s3()
        s3.put_object(Bucket='files', Key=key, Body=pdf_bytes, ContentType='application/pdf')

        access_key = os.environ['AWS_ACCESS_KEY_ID']
        url = f'https://cdn.poehali.dev/projects/{access_key}/bucket/{key}'
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'url': url, 'slug': slug})}

    # DELETE — удаление документа (требует авторизации)
    if method == 'DELETE':
        if not check_auth(headers):
            return {'statusCode': 401, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Unauthorized'})}

        body = json.loads(event.get('body') or '{}')
        slug = body.get('slug')
        if slug not in DOCUMENT_SLUGS:
            return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Unknown document slug'})}

        s3 = get_s3()
        s3.delete_object(Bucket='files', Key=f'documents/{slug}.pdf')
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Method not allowed'})}
