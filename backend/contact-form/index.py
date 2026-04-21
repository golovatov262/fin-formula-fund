import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import urllib.request

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Отправка сообщения с контактной формы через Email и Telegram
    Принимает: POST запрос с данными формы (name, email, phone, message, source)
    Возвращает: HTTP ответ с результатом отправки
    '''
    method: str = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'}),
            'isBase64Encoded': False
        }

    body_data = json.loads(event.get('body', '{}'))
    name: str = body_data.get('name', '')
    email: str = body_data.get('email', '')
    phone: str = body_data.get('phone', '')
    message: str = body_data.get('message', '')
    source: str = body_data.get('source', 'Не указано')

    if not name or not email or not message:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Заполните все обязательные поля'}),
            'isBase64Encoded': False
        }

    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '587'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')

    results = {'email': False, 'telegram': False, 'errors': []}

    try:
        msg = MIMEMultipart('alternative')
        msg['From'] = smtp_user
        msg['To'] = smtp_user
        msg['Subject'] = f'Новое сообщение с сайта от {name}'

        html_body = f'''
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
                    ✉️ Новое сообщение с формы обратной связи
                </h2>

                <div style="background-color: #ede9fe; border-left: 4px solid #6366f1; padding: 12px 16px; border-radius: 4px; margin-bottom: 20px;">
                    <p style="margin: 0; font-size: 13px; color: #4c1d95;">
                        <strong>📍 Источник заявки:</strong> {source}
                    </p>
                </div>

                <div style="background-color: white; padding: 20px; border-radius: 6px;">
                    <p style="margin: 10px 0;"><strong>Имя:</strong> {name}</p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> {email}</p>
                    <p style="margin: 10px 0;"><strong>Телефон:</strong> {phone if phone else 'Не указан'}</p>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 6px;">
                        <p style="margin: 0 0 10px 0;"><strong>Сообщение:</strong></p>
                        <p style="margin: 0; white-space: pre-wrap;">{message}</p>
                    </div>
                </div>

                <div style="margin-top: 20px; padding: 15px; background-color: #e0e7ff; border-left: 4px solid #6366f1; border-radius: 4px;">
                    <p style="margin: 0; color: #4338ca; font-size: 14px;">
                        <strong>Действие:</strong> Свяжитесь с клиентом по указанным контактам.
                    </p>
                </div>
            </div>
        </body>
        </html>
        '''

        msg.attach(MIMEText(html_body, 'html', 'utf-8'))

        server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        results['email'] = True
    except Exception as e:
        results['errors'].append(f'Email ошибка: {str(e)}')

    try:
        telegram_message = f'''✉️ <b>Новое сообщение с сайта</b>

📍 <b>Источник:</b> {source}

👤 <b>Имя:</b> {name}
📧 <b>Email:</b> {email}
📞 <b>Телефон:</b> {phone if phone else 'Не указан'}

💬 <b>Сообщение:</b>
{message}'''

        telegram_url = f'https://api.telegram.org/bot{telegram_token}/sendMessage'
        telegram_data = json.dumps({
            'chat_id': telegram_chat_id,
            'text': telegram_message,
            'parse_mode': 'HTML'
        }).encode('utf-8')

        req = urllib.request.Request(
            telegram_url,
            data=telegram_data,
            headers={'Content-Type': 'application/json'}
        )

        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                results['telegram'] = True
    except Exception as e:
        results['errors'].append(f'Telegram ошибка: {str(e)}')

    if results['email'] or results['telegram']:
        status_code = 200
        message_text = 'Сообщение успешно отправлено'
    else:
        status_code = 500
        message_text = 'Не удалось отправить сообщение'

    return {
        'statusCode': status_code,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': results['email'] or results['telegram'],
            'message': message_text,
            'details': results
        }),
        'isBase64Encoded': False
    }
