import Layout from '@/components/Layout';
import Calculator from '@/components/Calculator';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import MembershipForm from '@/components/MembershipForm';

const programs = [
  {
    gradient: 'gradient-purple-blue',
    bgLight: 'bg-primary/5',
    title: 'Сберегательная программа',
    subtitle: 'Фиксированные сроки от 3 до 18 месяцев',
    rate: 'КС ЦБ + до 3%',
    features: [
      { icon: 'CalendarDays', text: 'Срок: 3, 6, 12 или 18 месяцев' },
      { icon: 'Percent', text: 'Ставка: Ключевая ЦБ + бонус по сроку' },
      { icon: 'BadgeCheck', text: '+0,5% за выплату процентов в конце срока' },
      { icon: 'ShieldCheck', text: 'Пай возвращается при выходе в полном объёме' },
    ]
  },
  {
    gradient: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/20',
    title: 'Оборотный доход',
    subtitle: 'Краткосрочное размещение 7–30 дней',
    rate: '14% годовых',
    features: [
      { icon: 'RefreshCw', text: 'Срок: от 7 до 30 дней с автопролонгацией' },
      { icon: 'BadgeRussianRuble', text: 'Мин. сумма от 500 000 ₽' },
      { icon: 'Calculator', text: 'Начисление ежедневно на фактический остаток' },
      { icon: 'ArrowDownToLine', text: 'Вывод в любой рабочий день без потери %' },
      { icon: 'PlusCircle', text: 'Пополнение в любое время' },
      { icon: 'ShieldCheck', text: 'Защита от блокировок' },
    ]
  }
];

export default function Savings() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Icon name="TrendingUp" size={15} />
            Сбережения
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Размещайте средства <span className="text-gradient">выгоднее банка</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Два продукта для разных задач: долгосрочные накопления по ставке ЦБ+3% или краткосрочный оборотный доход с ежедневным начислением и свободным выводом
          </p>
        </div>
      </section>

      {/* Программы */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {programs.map((p, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-xl transition-all">
                <div className={`h-2 ${p.gradient}`} />
                <CardContent className="pt-6 pb-6">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${p.bgLight}`}>
                    {p.subtitle}
                  </div>
                  <div className="flex items-end justify-between mb-5">
                    <h2 className="text-xl font-bold">{p.title}</h2>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{p.rate}</div>
                      <div className="text-xs text-muted-foreground">годовых</div>
                    </div>
                  </div>
                  <ul className="space-y-2.5">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${p.gradient}`}>
                          <Icon name={f.icon} size={13} className="text-white" />
                        </div>
                        <span className="text-sm">{f.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Калькулятор */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Рассчитайте ваш доход</h2>
            <Calculator />
          </div>

          {/* Как это работает */}
          <div className="bg-muted/30 rounded-2xl p-6 md:p-10 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Как разместить средства</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: '1', icon: 'UserPlus', title: 'Стать членом', text: 'Вступить в кооператив, внеся паевой взнос от 30 000 ₽' },
                { step: '2', icon: 'FileSignature', title: 'Заключить договор', text: 'Подписать договор о размещении средств на выбранных условиях' },
                { step: '3', icon: 'TrendingUp', title: 'Получать доход', text: 'Ежемесячно или в конце срока получать начисленные проценты' },
              ].map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 gradient-purple-blue rounded-2xl flex items-center justify-center mb-3">
                    <Icon name={s.icon} size={24} className="text-white" />
                  </div>
                  <div className="text-xs font-bold text-primary mb-1">Шаг {s.step}</div>
                  <div className="font-bold mb-1">{s.title}</div>
                  <div className="text-sm text-muted-foreground">{s.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <MembershipForm>
              <Button size="lg" className="gradient-purple-blue text-white px-10">
                <Icon name="UserPlus" size={18} />
                Оставить заявку
              </Button>
            </MembershipForm>
          </div>
        </div>
      </section>
    </Layout>
  );
}
