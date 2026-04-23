import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any
import urllib.request
import urllib.error

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Отправка заявки на членство в КПК через Email и Telegram.
    Принимает: POST запрос с данными формы (inn, phone, fullName, source).
    Опционально: loanProgram, loanAmount, loanMonths — параметры желаемого займа из калькулятора.
    Возвращает: HTTP ответ с результатом отправки.
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
    inn: str = body_data.get('inn', '')
    phone: str = body_data.get('phone', '')
    full_name: str = body_data.get('fullName', '')
    company_name: str = body_data.get('companyName', '')
    address: str = body_data.get('address', '')
    kpp: str = body_data.get('kpp', '')
    ogrn: str = body_data.get('ogrn', '')
    source: str = body_data.get('source', 'Не указано')
    loan_program: str = body_data.get('loanProgram', '')
    loan_amount: str = body_data.get('loanAmount', '')
    loan_months: str = body_data.get('loanMonths', '')
    savings_program: str = body_data.get('savingsProgram', '')
    savings_amount: str = body_data.get('savingsAmount', '')
    savings_term: str = body_data.get('savingsTerm', '')
    savings_payment_type: str = body_data.get('savingsPaymentType', '')
    savings_rate: str = body_data.get('savingsRate', '')
    savings_income: str = body_data.get('savingsIncome', '')
    savings_total: str = body_data.get('savingsTotal', '')

    if not inn or not phone or not full_name:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Все поля обязательны'}),
            'isBase64Encoded': False
        }

    smtp_host = os.environ.get('SMTP_HOST')
    smtp_port = int(os.environ.get('SMTP_PORT', '465'))
    smtp_user = os.environ.get('SMTP_USER')
    smtp_password = os.environ.get('SMTP_PASSWORD')
    telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')

    results = {'email': False, 'telegram': False, 'errors': []}

    loan_block_html = ''
    if loan_program:
        loan_block_html = f'''
        <div style="background-color: #fff7ed; border-left: 4px solid #f97316; padding: 16px 20px; border-radius: 6px; margin-top: 16px;">
            <h3 style="margin: 0 0 12px; color: #c2410c; font-size: 15px;">💰 Параметры желаемого займа</h3>
            <p style="margin: 6px 0;"><strong>Программа:</strong> {loan_program}</p>
            {"<p style='margin: 6px 0;'><strong>Сумма:</strong> " + loan_amount + "</p>" if loan_amount else ""}
            {"<p style='margin: 6px 0;'><strong>Срок:</strong> " + loan_months + "</p>" if loan_months else ""}
        </div>'''

    savings_block_html = ''
    if savings_program:
        savings_block_html = f'''
        <div style="background-color: #f5f3ff; border-left: 4px solid #7c3aed; padding: 16px 20px; border-radius: 6px; margin-top: 16px;">
            <h3 style="margin: 0 0 12px; color: #5b21b6; font-size: 15px;">📈 Параметры размещения средств</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 5px 0; color: #6b7280; width: 50%">Программа</td>
                    <td style="padding: 5px 0; font-weight: bold;">{savings_program}</td>
                </tr>
                {"<tr><td style='padding: 5px 0; color: #6b7280;'>Сумма размещения</td><td style='padding: 5px 0; font-weight: bold;'>" + savings_amount + "</td></tr>" if savings_amount else ""}
                {"<tr><td style='padding: 5px 0; color: #6b7280;'>Срок</td><td style='padding: 5px 0; font-weight: bold;'>" + savings_term + "</td></tr>" if savings_term else ""}
                {"<tr><td style='padding: 5px 0; color: #6b7280;'>Вид выплаты</td><td style='padding: 5px 0; font-weight: bold;'>" + savings_payment_type + "</td></tr>" if savings_payment_type else ""}
                {"<tr><td style='padding: 5px 0; color: #6b7280;'>Ставка</td><td style='padding: 5px 0; font-weight: bold; color: #7c3aed;'>" + savings_rate + "</td></tr>" if savings_rate else ""}
            </table>
            <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #ddd6fe; display: flex; gap: 16px;">
                {"<div style='flex: 1; background: #ede9fe; border-radius: 6px; padding: 10px; text-align: center;'><div style='font-size: 11px; color: #6b7280; margin-bottom: 4px;'>Доход за период</div><div style='font-size: 17px; font-weight: bold; color: #7c3aed;'>" + savings_income + "</div></div>" if savings_income else ""}
                {"<div style='flex: 1; background: #ede9fe; border-radius: 6px; padding: 10px; text-align: center;'><div style='font-size: 11px; color: #6b7280; margin-bottom: 4px;'>Итого к получению</div><div style='font-size: 17px; font-weight: bold; color: #5b21b6;'>" + savings_total + "</div></div>" if savings_total else ""}
            </div>
        </div>'''

    try:
        msg = MIMEMultipart('alternative')
        msg['From'] = smtp_user
        msg['To'] = smtp_user
        msg['Subject'] = f'Новая заявка на членство в КПК от {full_name}'

        html_body = f'''
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
                    📋 Новая заявка на членство в КПК
                </h2>

                <div style="background-color: #ede9fe; border-left: 4px solid #6366f1; padding: 12px 16px; border-radius: 4px; margin-bottom: 20px;">
                    <p style="margin: 0; font-size: 13px; color: #4c1d95;">
                        <strong>📍 Источник заявки:</strong> {source}
                    </p>
                </div>

                <div style="background-color: white; padding: 20px; border-radius: 6px;">
                    <p style="margin: 10px 0;"><strong>ФИО контактного лица:</strong> {full_name}</p>
                    <p style="margin: 10px 0;"><strong>Телефон:</strong> {phone}</p>
                    <p style="margin: 10px 0;"><strong>ИНН:</strong> {inn}</p>
                    {"<p style='margin: 10px 0;'><strong>Компания:</strong> " + company_name + "</p>" if company_name else ""}
                    {"<p style='margin: 10px 0;'><strong>КПП:</strong> " + kpp + "</p>" if kpp else ""}
                    {"<p style='margin: 10px 0;'><strong>ОГРН:</strong> " + ogrn + "</p>" if ogrn else ""}
                    {"<p style='margin: 10px 0;'><strong>Адрес:</strong> " + address + "</p>" if address else ""}
                </div>

                {loan_block_html}
                {savings_block_html}

                <div style="margin-top: 20px; padding: 15px; background-color: #e0e7ff; border-left: 4px solid #6366f1; border-radius: 4px;">
                    <p style="margin: 0; color: #4338ca; font-size: 14px;">
                        <strong>Следующий шаг:</strong> Свяжитесь с клиентом для обсуждения условий вступления и размера паевого взноса.
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
        company_line = f'\n🏢 <b>Компания:</b> {company_name}' if company_name else ''
        loan_block_tg = ''
        if loan_program:
            loan_block_tg = f'\n\n💰 <b>Желаемый займ:</b>'
            loan_block_tg += f'\n📌 Программа: {loan_program}'
            if loan_amount:
                loan_block_tg += f'\n💵 Сумма: {loan_amount}'
            if loan_months:
                loan_block_tg += f'\n📅 Срок: {loan_months}'

        savings_block_tg = ''
        if savings_program:
            savings_block_tg = f'\n\n📈 <b>Размещение средств:</b>'
            savings_block_tg += f'\n📌 Программа: {savings_program}'
            if savings_amount:
                savings_block_tg += f'\n💵 Сумма: {savings_amount}'
            if savings_term:
                savings_block_tg += f'\n📅 Срок: {savings_term}'
            if savings_rate:
                savings_block_tg += f'\n📊 Ставка: {savings_rate}'
            if savings_income:
                savings_block_tg += f'\n✅ Доход: {savings_income}'
            if savings_total:
                savings_block_tg += f'\n💎 Итого: {savings_total}'

        telegram_message = f'''🆕 <b>Новая заявка на членство</b>

📍 <b>Источник:</b> {source}

👤 <b>ФИО:</b> {full_name}
📞 <b>Телефон:</b> {phone}
🔢 <b>ИНН:</b> {inn}{company_line}{loan_block_tg}{savings_block_tg}

💡 Свяжитесь с клиентом для обсуждения условий вступления'''

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
        message = 'Заявка успешно отправлена'
    else:
        status_code = 500
        message = 'Не удалось отправить заявку'

    return {
        'statusCode': status_code,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': results['email'] or results['telegram'],
            'message': message,
            'details': results
        }),
        'isBase64Encoded': False
    }