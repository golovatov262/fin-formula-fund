import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import MembershipForm from '@/components/MembershipForm';

const incomeRows = [
  { count: '1 пайщик', reward: '5 000 ₽', income: '5 000 ₽', bonus: '' },
  { count: '3 пайщика', reward: '5 000 ₽', income: '15 000 ₽', bonus: '' },
  { count: '5 пайщиков', reward: '5 000 ₽', income: '25 000 ₽', bonus: '+ 5 000 ₽ бонус = 30 000 ₽' },
  { count: '10 пайщиков', reward: '5 000 ₽', income: '50 000 ₽', bonus: '+ 10 000 ₽ бонус = 60 000 ₽' },
  { count: '20 пайщиков', reward: '5 000 ₽', income: '100 000 ₽', bonus: '+ 20 000 ₽ бонус = 120 000 ₽' },
];

const steps = [
  {
    num: '01',
    title: 'Свяжитесь с нами',
    desc: 'Позвоните по номеру 8-800-302-31-82 или напишите на ff@sll-expert.ru. Расскажите о вашей базе клиентов — подберём формат сотрудничества.',
    icon: 'Phone',
  },
  {
    num: '02',
    title: 'Подпишите агентский договор',
    desc: 'Оформляем официальный агентский договор: фиксируем размер вознаграждения, порядок идентификации клиентов и сроки выплат.',
    icon: 'FileSignature',
  },
  {
    num: '03',
    title: 'Получите материалы',
    desc: 'Предоставим коммерческое предложение для ваших клиентов, презентационные материалы, ответы на типичные вопросы и поддержку специалиста КПК.',
    icon: 'PackageOpen',
  },
  {
    num: '04',
    title: 'Рекомендуйте и зарабатывайте',
    desc: 'Рекомендуете КПК вашим клиентам-ЮЛ. Клиент вступает, оплачивает взносы, указывает вас как агента. Вы получаете 5 000 ₽.',
    icon: 'BadgeRuble',
  },
];

const advantages = [
  { icon: 'Ban', title: 'Нет вложений', desc: 'Работаете на базе текущих клиентских отношений — никаких стартовых затрат' },
  { icon: 'ShieldCheck', title: 'Нет рисков', desc: 'Вознаграждение выплачивается только по факту вступления пайщика' },
  { icon: 'Infinity', title: 'Без ограничений', desc: 'Каждый новый пайщик приносит 5 000 ₽. Верхней планки нет' },
  { icon: 'FileText', title: 'Официально', desc: 'Работа по агентскому договору в соответствии с гл. 52 ГК РФ' },
  { icon: 'Users', title: 'Ценность для клиентов', desc: 'Предлагаете реальные финансовые инструменты, недоступные в банке' },
  { icon: 'HeadphonesIcon', title: 'Поддержка КПК', desc: 'Персональный менеджер и консультации специалиста для ваших клиентов' },
];

const clientArgs = [
  { num: 1, title: 'Размещение до 18,5% / год', desc: 'Банк даёт 8–12% на депозит ЮЛ. КПК — до 18,5%. При 1 млн ₽ разница за год — 65 000 ₽.' },
  { num: 2, title: 'Ежедневное начисление 14%', desc: 'Деньги между платежами зарабатывают, а не лежат под 2–3% на расчётном счёте.' },
  { num: 3, title: 'Займ за 24 часа', desc: 'Банк рассматривает заявку 3–20 дней. КПК — 24 часа. Кассовый разрыв закрывается сразу.' },
  { num: 4, title: 'Займ при блокировке ИФНС', desc: 'Банк откажет. КПК выдаст и перечислит поставщику напрямую. Уникальный инструмент на рынке.' },
  { num: 5, title: 'Инвестиционный займ до 5 млн', desc: 'Банк за те же деньги возьмёт 29–34%. Оборудование и расширение — без залога до 1 млн.' },
  { num: 6, title: 'Защита от блокировок ИФНС', desc: 'Счёт пайщика не является банковским (ст. 845 ГК РФ). ИФНС заблокировать его не вправе.' },
  { num: 7, title: 'Вступить заранее — успеть вовремя', desc: 'Оформление занимает 1 день. В кризис этого дня нет. Пайщик с историей получает лучшие условия.' },
];

const faq = [
  { q: 'Нужно ли мне самому становиться пайщиком?', a: 'Нет. Для работы агентом членство в КПК не обязательно. Достаточно агентского договора.' },
  { q: 'Что если клиент не оплатит взносы?', a: 'Вознаграждение выплачивается только по факту оплаты взносов пайщиком. Если клиент передумал до оплаты — вознаграждение не начисляется.' },
  { q: 'Как подтверждается, что пайщик пришёл от меня?', a: 'На сайте вы оформляете заявку на потенциального клиента (ИНН организации и контакты). Это фиксируется в нашей системе учёта.' },
  { q: 'Могу ли я работать из другого региона?', a: 'КПК принимает пайщиков только из Ростовской области и Краснодарского края. Если ваши клиенты из этих регионов — ограничений нет, вне зависимости от вашего местонахождения.' },
  { q: 'Сколько клиентов я могу привлекать?', a: 'Без ограничений. Каждый новый пайщик ЮЛ, оплативший взносы, даёт 5 000 ₽ вознаграждения.' },
  { q: 'Что если клиент задаёт сложные вопросы?', a: 'Мы предоставляем поддержку: специалист КПК проведёт консультацию с вашим клиентом напрямую. Вы только представляете нас — детальные вопросы на нас.' },
];

export default function Agent() {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 px-4 bg-gradient-to-b from-emerald-50 via-teal-50/30 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <Icon name="Handshake" size={15} />
            Партнёрская программа
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
            Зарабатывайте <span className="text-gradient">5 000 ₽</span><br className="hidden md:block" /> за каждого нового пайщика
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Рекомендуйте КПК «ФИН ФОРМУЛА» вашим клиентам — юридическим лицам. Без вложений, без рисков, на базе уже существующих отношений.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <MembershipForm
              source="Страница агентов — кнопка «Стать агентом»"
              title="Заявка на агентский договор"
              description="Оставьте контакты — менеджер свяжется и расскажет об условиях сотрудничества"
            >
              <Button size="lg" className="gradient-purple-blue text-white px-8">
                <Icon name="Handshake" size={20} />
                Стать агентом
              </Button>
            </MembershipForm>
            <a href="tel:88003023182">
              <Button size="lg" variant="outline" className="px-8">
                <Icon name="Phone" size={20} />
                8-800-302-31-82
              </Button>
            </a>
          </div>

          {/* Ключевые цифры */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-4 shadow-sm border">
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">5 000 ₽</div>
              <div className="text-xs text-muted-foreground mt-1">за каждого пайщика</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border">
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">×2</div>
              <div className="text-xs text-muted-foreground mt-1">бонус за каждого 5-го</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border">
              <div className="text-2xl md:text-3xl font-bold text-emerald-600">∞</div>
              <div className="text-xs text-muted-foreground mt-1">без верхней планки</div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества агента */}
      <section className="py-14 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ваши преимущества как агента</h2>
            <p className="text-muted-foreground">Программа создана так, чтобы вы не рисковали и могли сосредоточиться на рекомендациях</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {advantages.map((adv) => (
              <Card key={adv.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-3">
                    <Icon name={adv.icon} size={20} className="text-emerald-700" />
                  </div>
                  <div className="font-semibold mb-1">{adv.title}</div>
                  <div className="text-sm text-muted-foreground">{adv.desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Таблица доходов */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ваши потенциальные доходы</h2>
            <p className="text-muted-foreground">Каждый пятый пайщик в месяц оплачивается в двойном размере — 10 000 ₽</p>
          </div>

          <Card className="overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b">
                    <th className="text-left px-5 py-3.5 font-semibold">Новых пайщиков</th>
                    <th className="text-center px-5 py-3.5 font-semibold">За 1 пайщика</th>
                    <th className="text-right px-5 py-3.5 font-semibold">Ваш доход</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeRows.map((row, i) => (
                    <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? '' : 'bg-muted/20'}`}>
                      <td className="px-5 py-3.5 font-medium">{row.count}</td>
                      <td className="px-5 py-3.5 text-center text-muted-foreground">{row.reward}</td>
                      <td className="px-5 py-3.5 text-right">
                        <span className="font-bold text-emerald-600">{row.income}</span>
                        {row.bonus && (
                          <div className="text-xs text-emerald-700 font-semibold">{row.bonus}</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex gap-3">
            <Icon name="Lightbulb" size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-900">
              <strong>Верхней планки нет.</strong> Если у вас база из 100+ юрлиц — при конверсии даже 10% это 10 пайщиков в месяц и <strong>60 000 ₽</strong> дополнительного дохода.
            </p>
          </div>
        </div>
      </section>

      {/* Аргументы для клиентов */}
      <section className="py-14 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Что вы предлагаете вашим клиентам</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Вы рекомендуете не просто продукт — вы открываете клиентам доступ к финансовой инфраструктуре, которой нет в банке</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {clientArgs.map((arg) => (
              <div key={arg.num} className="flex gap-4 p-4 bg-white border rounded-xl hover:shadow-md transition-shadow">
                <div className="w-8 h-8 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                  {arg.num}
                </div>
                <div>
                  <div className="font-semibold mb-1">{arg.title}</div>
                  <div className="text-sm text-muted-foreground">{arg.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Условия вступления для клиента */}
          <Card className="mt-8">
            <CardContent className="pt-5">
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Условия вступления для клиента — ЮЛ</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Вступительный взнос</div>
                  <div className="text-xl font-bold">10 000 ₽</div>
                  <div className="text-xs text-muted-foreground">единоразово</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Паевой взнос</div>
                  <div className="text-xl font-bold">30–80 тыс. ₽</div>
                  <div className="text-xs text-muted-foreground">возвращается при выходе · рассрочка 3–6 мес.</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Членский взнос</div>
                  <div className="text-xl font-bold">12 000 ₽/год</div>
                  <div className="text-xs text-muted-foreground">= 1 000 ₽ в месяц</div>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
                <Icon name="Info" size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-900">Паевой взнос — это не расходы клиента. Это возвратный капитал, который формирует фонд взаимопомощи и возвращается в полном объёме при выходе из КПК.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4 шага */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Как стать агентом — 4 шага</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-4 p-5 bg-white border rounded-xl hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 gradient-purple-blue rounded-xl flex items-center justify-center">
                    <Icon name={step.icon} size={22} className="text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">{step.num}</div>
                  <div className="font-semibold mb-1.5">{step.title}</div>
                  <div className="text-sm text-muted-foreground">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Почему легко рекомендовать */}
      <section className="py-14 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Почему КПК легко рекомендовать</h2>
            <p className="text-muted-foreground">Хорошая рекомендация — та, после которой клиент благодарит, а не жалуется</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-5">
                <div className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="ShieldCheck" size={18} className="text-primary" />
                  Надёжность и прозрачность
                </div>
                <ul className="space-y-2.5">
                  {[
                    'Надзор Банка России — cbr.ru / ОГРН 1163668081895',
                    'Член СРО «Кооперативные Финансы» — coopfin.ru',
                    'Работаем с 2016 года — 9 лет на рынке',
                    'Открытая ежеквартальная отчётность',
                    'Личный кабинет пайщика онлайн',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <div className="font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Star" size={18} className="text-primary" />
                  Ценность для клиента
                </div>
                <ul className="space-y-2.5">
                  {[
                    'Паевой взнос возвращается — клиент не теряет капитал',
                    'Реальная защита от блокировок ИФНС по закону',
                    'Размещение на 30–50% выгоднее банковского депозита',
                    'Займ за 24 часа против 3–20 дней в банке',
                    'Вступает один раз — пользуется инструментами всегда',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3">
            <Icon name="Scale" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              <strong>Правовая основа защиты:</strong> счета пайщиков в КПК не являются банковскими счетами (ст. 845 ГК РФ). Требования ИФНС по ст. 76 НК РФ и требования ФССП распространяются исключительно на банковские счета. Рекомендуя КПК, вы предлагаете клиенту реальную правовую защиту — не маркетинговое обещание.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Вопросы и ответы</h2>
          </div>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <Card key={i}>
                <CardContent className="pt-4 pb-4">
                  <div className="font-semibold mb-2 flex items-start gap-2">
                    <Icon name="HelpCircle" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    {item.q}
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="gradient-purple-blue rounded-2xl p-8 md:p-12 text-center text-white">
            <Icon name="Handshake" size={48} className="mx-auto mb-5 opacity-90" />
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Готовы к партнёрству?</h2>
            <p className="text-white/80 mb-8 text-lg">Обсудим формат сотрудничества и подпишем агентский договор</p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <a href="tel:88003023182" className="bg-white/15 rounded-xl p-4 hover:bg-white/25 transition-colors">
                <Icon name="Phone" size={22} className="mx-auto mb-2" />
                <div className="font-semibold text-sm">Телефон</div>
                <div className="text-white/80 text-sm">8-800-302-31-82</div>
                <div className="text-white/60 text-xs">бесплатно</div>
              </a>
              <a href="mailto:ff@sll-expert.ru" className="bg-white/15 rounded-xl p-4 hover:bg-white/25 transition-colors">
                <Icon name="Mail" size={22} className="mx-auto mb-2" />
                <div className="font-semibold text-sm">Email</div>
                <div className="text-white/80 text-sm">ff@sll-expert.ru</div>
              </a>
              <div className="bg-white/15 rounded-xl p-4">
                <Icon name="MapPin" size={22} className="mx-auto mb-2" />
                <div className="font-semibold text-sm">Адрес</div>
                <div className="text-white/80 text-sm">г. Шахты, пр. Пушкина, 29А</div>
                <div className="text-white/60 text-xs">Пн–Пт 9:00–18:00</div>
              </div>
            </div>
            <MembershipForm
              source="Страница агентов — CTA блок"
              title="Заявка на агентский договор"
              description="Оставьте контакты — менеджер свяжется и расскажет об условиях сотрудничества"
            >
              <Button size="lg" className="bg-white text-primary font-semibold hover:bg-white/90 px-10">
                <Icon name="Handshake" size={20} />
                Стать агентом
              </Button>
            </MembershipForm>
          </div>
        </div>
      </section>
    </Layout>
  );
}