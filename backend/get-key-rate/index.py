import json
import urllib.request
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''Получение актуальной ключевой ставки ЦБ РФ'''
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        url = 'https://www.cbr-xml-daily.ru/daily_json.js'
        
        with urllib.request.urlopen(url, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        key_rate = data.get('KeyRate', 16.0)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            },
            'body': json.dumps({
                'keyRate': key_rate,
                'date': data.get('Date', datetime.now().isoformat()),
                'source': 'cbr-xml-daily.ru'
            }),
            'isBase64Encoded': False
        }
    
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'keyRate': 16.0,
                'date': datetime.now().isoformat(),
                'source': 'fallback',
                'note': 'Используется резервное значение'
            }),
            'isBase64Encoded': False
        }
