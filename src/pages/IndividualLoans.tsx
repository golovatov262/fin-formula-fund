import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import IndividualApplicationForm from '@/components/IndividualApplicationForm';
import IndividualLoanCalculator from '@/components/IndividualLoanCalculator';
import SEO from '@/components/SEO';

const loanPrograms = [
  {
    name: 'Без обеспечения',
    amount: 'от 20 до 300 тыс. ₽',
    term: 'от 12 до 60 мес.',
    rate: 'от 27% до 49%',
    commission: '0,6% в мес. от первоначальной суммы займа, min 10 000 ₽',
    collateral: 'Возможно привлечение поручителя',
    icon: 'UserCheck',
    color: 'orange',
  },
  {
    name: 'Займ под залог недвижимости',
    amount: 'от 50 — 3 000 тыс. ₽\nне более 90% от рыночной стоимости',
    term: 'от 12 до 180 мес.',
    rate: 'от 27% до 39%',
    commission: '0,3% в мес. от первоначальной суммы займа, min 10 000 ₽, max 200 000 ₽',
    collateral: 'Дом, квартира, объект незавершённого строительства (возможен залог от третьего лица)',
    icon: 'Home',
    color: 'blue',
  },
  {
    name: 'Ипотека',
    amount: 'от 100 — 3 000 тыс. ₽',
    term: 'от 12 до 180 мес.',
    rate: 'от 27% до 33%',
    commission: '8,5% от суммы займа',
    collateral: 'Дом, квартира на вторичном рынке или в новостройке',
    icon: 'Building',
    color: 'emerald',
  },
  {
    name: 'Авто займ',
    amount: 'от 50 — 2 000 тыс. ₽\nне более 90% от рыночной стоимости',
    term: 'от 12 до 84 мес.',
    rate: 'от 27% до 39%',
    commission: '0,3% в мес. от первоначальной суммы займа, min 10 000 ₽, max 200 000 ₽',
    collateral: 'Автомобиль отечественного производства не старше 10 лет, иностранного — не старше 15 лет',
    icon: 'Car',
    color: 'amber',
  },
  {
    name: 'Рефинансирование',
    amount: 'от 50 — 2 000 тыс. ₽',
    term: 'от 12 до 60 мес.',
    rate: 'от 27% до 49%',
    commission: '8,5% от суммы займа',
    collateral: 'До 300 000 ₽ без обеспечения, свыше — залог недвижимости и/или автомобиля',
    icon: 'ArrowLeftRight',
    color: 'purple',
  },
];

const colorMap: Record<string, { badge: string; icon: string; border: string }> = {
  orange:  { badge: 'bg-orange-100 text-orange-700',  icon: 'gradient-orange-pink',   border: 'border-orange-200' },
  blue:    { badge: 'bg-blue-100 text-blue-700',      icon: 'gradient-purple-blue',   border: 'border-blue-200' },
  emerald: { badge: 'bg-emerald-100 text-emerald-700',icon: 'bg-emerald-600',         border: 'border-emerald-200' },
  amber:   { badge: 'bg-amber-100 text-amber-700',    icon: 'bg-amber-500',           border: 'border-amber-200' },
  purple:  { badge: 'bg-purple-100 text-purple-700',  icon: 'bg-purple-600',          border: 'border-purple-200' },
};

const advantages = [
  { icon: 'Zap', title: 'Быстрое решение', text: 'Рассматриваем заявку в течение 24 часов' },
  { icon: 'Users', title: 'Самозанятым тоже', text: 'Работаем с гражданами и самозанятыми' },
  { icon: 'ShieldCheck', title: 'Прозрачные условия', text: 'Никаких скрытых комиссий и платежей' },
  { icon: 'Heart', title: 'Индивидуальный подход', text: 'Подбираем программу под вашу ситуацию' },
];

export default function IndividualLoans() {
  return (
    <Layout>
      <SEO
        title="Займы для физических лиц и самозанятых — КПК «ФИН ФОРМУЛА»"
        description="Займы для физлиц и самозанятых: без обеспечения, под залог недвижимости, ипотека, авто займ, рефинансирование. Суммы от 20 000 ₽ до 3 000 000 ₽, решение за 24 часа. Ростовская область и Краснодарский край."
        path="/individual/loans"
        breadcrumbs={[
          { name: 'Главная', path: '/' },
          { name: 'Для физических лиц', path: '/individual/loans' },
          { name: 'Займы', path: '/individual/loans' },
        ]}
      />
      {/* Hero */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-orange-50/60 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Icon name="Wallet" size={15} />
            Для физических лиц
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Займы для физических лиц <span className="text-gradient">и самозанятых</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Деньги на ваши цели — от потребительских займов без залога до ипотеки и кредита под залог недвижимости или авто. Программы доступны членам кооператива.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <IndividualApplicationForm source="Страница «Займы для физлиц» — Hero">
              <Button size="lg" className="gradient-orange-pink text-white px-10">
                <Icon name="Send" size={18} />
                Оставить заявку
              </Button>
            </IndividualApplicationForm>
            <Link to="/individual/membership">
              <Button size="lg" variant="outline">
                <Icon name="Users" size={18} />
                Условия членства
              </Button>
            </Link>
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

      {/* Карточки программ */}
      <section className="py-10 md:py-14 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Программы займов</h2>
          <p className="text-center text-muted-foreground mb-8">Для физических лиц, в том числе самозанятых</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {loanPrograms.map((p) => {
              const c = colorMap[p.color];
              return (
                <Card key={p.name} className={`border-2 ${c.border} hover:shadow-xl transition-all`}>
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`w-11 h-11 ${c.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon name={p.icon} size={22} className="text-white" />
                      </div>
                      <h3 className="text-lg font-bold leading-tight">{p.name}</h3>
                    </div>

                    <div className="space-y-2.5 text-sm">
                      <div>
                        <div className="text-xs text-muted-foreground">Сумма</div>
                        <div className="font-semibold whitespace-pre-line">{p.amount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Срок</div>
                        <div className="font-semibold">{p.term}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Ставка (годовых)</div>
                        <div className="font-bold text-base text-primary">{p.rate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Единовременная комиссия</div>
                        <div className="text-xs">{p.commission}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Обеспечение</div>
                        <div className="text-xs">{p.collateral}</div>
                      </div>
                    </div>

                    <IndividualApplicationForm
                      source={`Страница «Займы для физлиц» — программа «${p.name}»`}
                      defaultMessage={`Интересует программа: ${p.name}`}
                    >
                      <Button className="w-full mt-5" variant="outline">
                        <Icon name="ArrowRight" size={16} />
                        Подать заявку
                      </Button>
                    </IndividualApplicationForm>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Калькулятор займа */}
      <section className="py-10 md:py-14 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Рассчитайте свой займ</h2>
          <p className="text-center text-muted-foreground mb-8">Выберите программу, сумму и срок — увидите примерный платёж</p>
          <IndividualLoanCalculator />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Подобрать программу займа</h2>
          <p className="text-white/90 mb-6">Напишите нам в мессенджере MAX — ответим и подберём условия под вашу ситуацию</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://max.ru/u/f9LHodD0cOKlhlHdQBcCTxnF2xJzOrOZrDbcKvHWJZ8kAoLbEol6TCNeJOc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="secondary" className="px-10">
                <img
                  src="https://max.ru/favicon.ico"
                  alt="MAX"
                  className="w-4 h-4 rounded-sm"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                Получить консультацию в MAX
              </Button>
            </a>
            <IndividualApplicationForm source="Страница «Займы для физлиц» — нижний CTA (форма)">
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-purple-700 px-10">
                <Icon name="Send" size={18} />
                Оставить заявку
              </Button>
            </IndividualApplicationForm>
          </div>
        </div>
      </section>
    </Layout>
  );
}