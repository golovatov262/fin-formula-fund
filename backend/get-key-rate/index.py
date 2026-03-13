import json
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta

def handler(event: dict, context) -> dict:
    '''Получение актуальной ключевой ставки ЦБ РФ через официальный SOAP API'''

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    if event.get('httpMethod', 'GET') != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    try:
        date_to = datetime.now()
        date_from = date_to - timedelta(days=90)
        from_str = date_from.strftime('%Y-%m-%dT00:00:00')
        to_str = date_to.strftime('%Y-%m-%dT23:59:59')

        soap_body = f'''<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <KeyRate xmlns="http://web.cbr.ru/">
      <fromDate>{from_str}</fromDate>
      <ToDate>{to_str}</ToDate>
    </KeyRate>
  </soap:Body>
</soap:Envelope>'''.encode('utf-8')

        req = urllib.request.Request(
            'https://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx',
            data=soap_body,
            headers={
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': 'http://web.cbr.ru/KeyRate'
            },
            method='POST'
        )

        with urllib.request.urlopen(req, timeout=10) as response:
            xml_text = response.read().decode('utf-8')

        root = ET.fromstring(xml_text)
        ns = {'cbr': 'http://web.cbr.ru/'}

        # Ищем все записи KR и берём последнюю (самую свежую)
        records = root.findall('.//cbr:KR', ns)
        if not records:
            # Пробуем без namespace
            records = root.findall('.//KR')

        if not records:
            raise ValueError('No KR records found in response')

        # Последний элемент — самая актуальная ставка
        last = records[-1]
        rate_tag = last.find('cbr:Rate', ns) or last.find('Rate')
        date_tag = last.find('cbr:DT', ns) or last.find('DT')

        key_rate = float(rate_tag.text.replace(',', '.'))
        rate_date = date_tag.text if date_tag is not None else datetime.now().isoformat()

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=3600'
            },
            'body': json.dumps({
                'keyRate': key_rate,
                'date': rate_date,
                'source': 'cbr.ru'
            })
        }

    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'keyRate': 15.5,
                'date': datetime.now().isoformat(),
                'source': 'fallback',
                'note': str(e)
            })
        }