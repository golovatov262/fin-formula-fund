import { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import Calculator from '@/components/Calculator';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import MembershipForm from '@/components/MembershipForm';
import SEO from '@/components/SEO';

export default function Savings() {
  const [keyRate, setKeyRate] = useState<number | null>(null);
  const [rateDate, setRateDate] = useState('');
  const [calcProgram, setCalcProgram] = useState<'savings' | 'turnover'>('savings');
  const calcRef = useRef<HTMLDivElement>(null);

  const handleCalculate = (program: 'savings' | 'turnover') => {
    setCalcProgram(program);
    setTimeout(() => {
      calcRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  useEffect(() => {
    fetch('https://functions.poehali.dev/ccf7de98-a7e2-4192-b19d-9d93fe63324e', { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        setKeyRate(data.keyRate);
        if (data.date) {
          const d = new Date(data.date);
          setRateDate(d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }));
        }
      })
      .catch(() => setKeyRate(21));
  }, []);

  const programs: Array<{
    key: 'savings' | 'turnover';
    gradient: string;
    bgLight: string;
    title: string;
    subtitle: string;
    rateNode: React.ReactNode;
    rateHint: string;
    btnColor: string;
    features: { icon: string; text: string }[];
  }> = [
    {
      key: 'savings',
      gradient: 'gradient-purple-blue',
      bgLight: 'bg-primary/5',
      btnColor: 'gradient-purple-blue',
      title: 'ДИНАМИЧНЫЙ ДОХОД',
      subtitle: 'Паевой счёт на срок от 3 до 18 месяцев',
      rateNode: (
        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-2xl md:text-3xl font-bold text-primary leading-snug">Доходность фонда</span>
        </div>
      ),
      rateHint: 'Переменная, по итогам периода. Не является фиксированной.',
      features: [
        { icon: 'CalendarDays', text: 'Срок: 3, 6, 12 или 18 месяцев' },
        { icon: 'Percent', text: 'Расчётная доходность — по правилам кооператива' },
        { icon: 'BadgeCheck', text: 'Бонус за выплату дохода в конце срока' },
        { icon: 'ShieldCheck', text: 'Пай возвращается при выходе в полном объёме' },
      ]
    },
    {
      key: 'turnover',
      gradient: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/20',
      btnColor: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      title: 'ОБОРОТНЫЙ ДОХОД',
      subtitle: 'Краткосрочный паевой взнос 7–30 дней',
      rateNode: (
        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-2xl md:text-3xl font-bold text-emerald-600 leading-snug">Доход пайщика</span>
        </div>
      ),
      rateHint: 'Расчёт дохода ежедневно на фактический остаток. Доходность ориентировочная, не фиксированная.',
      features: [
        { icon: 'RefreshCw', text: 'Срок: от 7 до 30 дней с автопролонгацией' },
        { icon: 'BadgeRussianRuble', text: 'Мин. паевой взнос от 500 000 ₽' },
        { icon: 'Calculator', text: 'Расчёт дохода ежедневно на фактический остаток' },
        { icon: 'ArrowDownToLine', text: 'Вывод в любой рабочий день без потери доходности' },
        { icon: 'PlusCircle', text: 'Пополнение в любое время' },
        { icon: 'ShieldCheck', text: 'Паевой счёт не является банковским счётом' },
      ]
    }
  ];

  return (
    <Layout>
      <SEO
        title="Паевой счёт для бизнеса — ФИН ФОРМУЛА"
        description="Паевые взносы юридических лиц и ИП в потребительском кооперативе ФИН ФОРМУЛА. Программы «Динамичный доход» и «Оборотный доход» — доход пайщика от участия в паевом фонде."
        path="/savings"
        breadcrumbs={[
          { name: 'Главная', path: '/' },
          { name: 'Паевой счёт для бизнеса', path: '/savings' },
        ]}
      />
      {/* Hero */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Icon name="TrendingUp" size={15} />
            Паевой счёт
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Вносите паевые взносы <span className="text-gradient">как альтернативу банку</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Две программы для разных задач: долгосрочное участие в паевом фонде или краткосрочный оборотный доход с периодическим расчётом и свободным выводом.
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
                  <h2 className="text-2xl font-black tracking-wide mb-3">{p.title}</h2>
                  {p.rateNode}
                  <div className="text-xs text-muted-foreground mb-5 -mt-3">{p.rateHint}</div>
                  <ul className="space-y-2.5 mb-5">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${p.gradient}`}>
                          <Icon name={f.icon} size={13} className="text-white" />
                        </div>
                        <span className="text-sm">{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full text-white ${p.btnColor}`}
                    onClick={() => handleCalculate(p.key)}
                  >
                    <Icon name="Calculator" size={16} />
                    Рассчитать доход
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Правовая основа */}
          <div className="mb-12">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8 flex items-start gap-4">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="Scale" size={20} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-slate-800 mb-1">Правовая основа</div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  ФИН ФОРМУЛА — потребительский кооператив по ст. 123.2 ГК РФ. Паевой счёт пайщика не является банковским счётом по ст. 845 ГК РФ — это паевой взнос в фонд кооператива.
                  Деятельность направлена на взаимную поддержку членов кооператива.
                </p>
              </div>
            </div>
          </div>

          {/* Калькулятор */}
          <div className="mb-12" ref={calcRef} id="calculator">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Рассчитайте ваш доход</h2>
            <Calculator initialProgram={calcProgram} />
          </div>

          {/* Как это работает */}
          <div className="bg-muted/30 rounded-2xl p-6 md:p-10 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Как открыть паевой счёт</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: '1', icon: 'UserPlus', title: 'Стать пайщиком', text: 'Вступить в кооператив, внеся паевой взнос от 30 000 ₽' },
                { step: '2', icon: 'FileSignature', title: 'Заключить договор', text: 'Подписать договор о паевом взносе на выбранных условиях' },
                { step: '3', icon: 'TrendingUp', title: 'Получать доход', text: 'Ежемесячно или в конце срока получать рассчитанный доход пайщика' },
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
            <MembershipForm source="Страница «Паевой счёт» — кнопка «Оставить заявку» (нижний блок)">
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