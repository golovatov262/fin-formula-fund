import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import IndividualApplicationForm from '@/components/IndividualApplicationForm';
import SavingsCalculator from '@/components/SavingsCalculator';
import SEO from '@/components/SEO';

const program = {
  name: '«Динамичный доход»',
  amountFrom: '50 000 ₽',
  amountTo: '30 000 000 ₽',
  payout: 'Выплата дохода авансом при открытии счёта, ежемесячно либо в конце срока',
};

const rows = [
  { term: '3 мес.', monthly: '15%', end: '15,50%' },
  { term: '6 мес.', monthly: '16%', end: '16,50%' },
  { term: '12 мес.', monthly: '17%', end: '17,50%' },
  { term: '18 мес.', monthly: '18%', end: '18,50%' },
];

const advantages = [
  { icon: 'TrendingUp', title: 'Доходность фонда', text: 'Расчётная доходность по правилам кооператива. По итогам периода, не фиксированная.' },
  { icon: 'Shield', title: 'Правовая основа — ст. 123.2 ГК РФ', text: 'Потребительский кооператив. Паевой счёт не является банковским счётом.' },
  { icon: 'Wallet', title: 'Гибкие выплаты', text: 'Получайте доход авансом, ежемесячно или в конце срока' },
  { icon: 'Coins', title: 'От 50 000 ₽', text: 'Минимальный паевой взнос доступен большинству пайщиков' },
];

export default function IndividualSavings() {
  return (
    <Layout>
      <SEO
        title="Паевой счёт с доходностью до 18,5% годовых — ФИН ФОРМУЛА"
        description="Откройте паевой счёт с доходностью до 18,5% годовых. Срок от 3 до 18 месяцев, взнос от 50 000 ₽. Выплата дохода авансом, ежемесячно или в конце срока. Программа «Динамичный доход»."
        path="/individual/savings"
        breadcrumbs={[
          { name: 'Главная', path: '/' },
          { name: 'Паевой счёт для физических лиц', path: '/individual/savings' },
        ]}
      />
      {/* Hero */}
      <section className="py-12 md:py-18 px-4 bg-gradient-to-b from-purple-50/60 to-transparent overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Левая часть */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
                <Icon name="TrendingUp" size={15} />
                Для физических лиц
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                Откройте паевой счёт<br />с доходностью<br /><span className="text-gradient">до 18,5% годовых</span>
              </h1>
              <ul className="space-y-2 mb-7">
                {[
                  'Высокий доход',
                  'Выбирайте, когда получать проценты',
                  'Срок от 3 до 18 месяцев',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-base text-muted-foreground">
                    <span className="w-5 h-0.5 bg-primary rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <a href="#calculator">
                  <Button size="lg" className="gradient-purple-blue text-white px-8">
                    <Icon name="Calculator" size={18} />
                    Рассчитать доход
                  </Button>
                </a>
                <a href="https://max.ru/u/f9LHodD0cOKlhlHdQBcCTxnF2xJzOrOZrDbcKvHWJZ8kAoLbEol6TCNeJOc" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline">
                    <Icon name="Phone" size={18} />
                    Консультация в МАХ
                  </Button>
                </a>
              </div>
            </div>
            {/* Правая часть — иллюстрация */}
            <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
              <div
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden"
                style={{
                  backgroundImage: 'url(https://cdn.poehali.dev/projects/1051bbab-a467-4b71-b050-32335ddce05d/files/2da15988-bd4c-453d-b788-d13e3b144b43.jpg)',
                  backgroundSize: '130%',
                  backgroundPosition: 'center',
                }}
              >
                <div className="relative flex items-center justify-center h-full">
                  <div
                    className="text-8xl font-black leading-none"
                    style={{
                      color: '#ff6b00',
                      textShadow: '0 1px 0 #cc4400, 0 2px 0 #aa3300, 0 3px 0 #882200, 0 4px 0 #661100, 0 6px 14px rgba(180,60,0,0.4)',
                    }}
                  >18,5%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-10 md:py-14 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {advantages.map((a) => (
              <Card key={a.title} className="border hover:shadow-md transition-shadow">
                <CardContent className="pt-5 pb-5">
                  <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center mb-3">
                    <Icon name={a.icon} size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold mb-1">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Описание программы */}
      <section className="py-10 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Программа «Динамичный доход»</h2>
          <p className="text-center text-muted-foreground mb-10">Чем дольше срок — тем выше расчётная доходность</p>

          {/* Параметры программы */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: 'Sparkles', label: 'Программа', value: '«Динамичный доход»' },
              { icon: 'Wallet', label: 'Сумма взноса', value: '50 000 ₽ — 30 000 000 ₽' },
              { icon: 'CalendarClock', label: 'Выплата дохода', value: 'Авансом, ежемесячно или в конце срока' },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl border p-5 flex gap-4 items-start shadow-sm">
                <div className="w-10 h-10 gradient-purple-blue rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name={item.icon} size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                  <div className="font-bold text-sm leading-snug">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Карточки ставок */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {rows.map((r, i) => (
              <div
                key={r.term}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                {/* Шапка */}
                <div className="gradient-purple-blue px-5 py-3 flex items-center justify-between">
                  <span className="text-white font-bold text-lg">{r.term}</span>
                  <div className="bg-white/20 rounded-full px-2 py-0.5 text-white text-xs font-medium">срок</div>
                </div>
                {/* Тело */}
                <div className="bg-white px-5 py-4 space-y-3">
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">Ежемесячно / авансом</div>
                    <div className="text-3xl font-black text-primary">{r.monthly}</div>
                  </div>
                  <div className="h-px bg-muted" />
                  <div>
                    <div className="text-xs text-muted-foreground mb-0.5">В конце срока</div>
                    <div className="text-3xl font-black text-purple-600">{r.end}</div>
                  </div>
                </div>
                {/* Акцент последней карточки */}
                {i === rows.length - 1 && (
                  <div className="bg-orange-50 border-t border-orange-200 px-5 py-2 text-center">
                    <span className="text-xs font-bold text-orange-600">Максимальная доходность</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Паевые взносы принимаются только от пайщиков кооператива. Указанные значения доходности — ориентировочные, по итогам периода. Доходность не является фиксированной.
          </p>
        </div>
      </section>



      {/* Калькулятор доходности */}
      <section id="calculator" className="py-10 md:py-14 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Рассчитайте свой доход</h2>
          <p className="text-center text-muted-foreground mb-8">Выберите сумму, срок и способ выплаты дохода</p>
          <SavingsCalculator />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Готовы открыть паевой счёт?</h2>
          <p className="text-white/90 mb-6">Оставьте заявку — мы расскажем условия и поможем оформить договор</p>
          <IndividualApplicationForm source="Страница «Паевой счёт для физлиц» — нижний CTA">
            <Button size="lg" variant="secondary" className="px-10">
              <Icon name="Send" size={18} />
              Получить консультацию
            </Button>
          </IndividualApplicationForm>
        </div>
      </section>
    </Layout>
  );
}