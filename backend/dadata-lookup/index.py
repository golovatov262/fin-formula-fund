import json
import os
import urllib.request
import urllib.error

def handler(event: dict, context) -> dict:
    '''API для получения данных компании по ИНН через DaData'''
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }

    try:
        body_str = event.get('body', '{}')
        if not body_str or body_str.strip() == '':
            body_str = '{}'
        body = json.loads(body_str)
        inn = body.get('inn', '').strip()

        if not inn:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'ИНН не указан'})
            }

        if len(inn) not in [10, 12]:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'ИНН должен содержать 10 или 12 цифр'})
            }

        api_key = os.environ.get('DADATA_API_KEY')
        if not api_key:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'API ключ DaData не настроен'})
            }

        url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party'
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': f'Token {api_key}'
        }
        data = json.dumps({'query': inn}).encode('utf-8')

        req = urllib.request.Request(url, data=data, headers=headers, method='POST')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode('utf-8'))

        if not result.get('suggestions'):
            return {
                'statusCode': 404,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Компания с таким ИНН не найдена'})
            }

        suggestion = result['suggestions'][0]
        data_obj = suggestion.get('data', {})

        response_data = {
            'success': True,
            'inn': data_obj.get('inn', inn),
            'kpp': data_obj.get('kpp', ''),
            'ogrn': data_obj.get('ogrn', ''),
            'name': {
                'short': data_obj.get('name', {}).get('short_with_opf', ''),
                'full': data_obj.get('name', {}).get('full_with_opf', ''),
            },
            'address': {
                'full': data_obj.get('address', {}).get('value', ''),
                'unrestricted': data_obj.get('address', {}).get('unrestricted_value', ''),
            },
            'management': data_obj.get('management', {}).get('name', ''),
            'status': data_obj.get('state', {}).get('status', ''),
            'type': data_obj.get('type', ''),
        }

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(response_data, ensure_ascii=False)
        }

    except urllib.error.HTTPError as e:
        error_body = e.read().decode('utf-8')
        return {
            'statusCode': e.code,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка DaData API: {error_body}'})
        }
    except urllib.error.URLError:
        return {
            'statusCode': 503,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Не удалось подключиться к DaData'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Внутренняя ошибка: {str(e)}'})
        }