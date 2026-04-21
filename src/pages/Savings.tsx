import { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import Calculator from '@/components/Calculator';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import MembershipForm from '@/components/MembershipForm';

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

  // Максимальная ставка по Динамичному доходу (18 мес. + выплата в конце)
  const maxRate = keyRate !== null ? keyRate + 3 + 0.5 : null;

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
      subtitle: 'Фиксированные сроки от 3 до 18 месяцев',
      rateNode: maxRate !== null ? (
        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-5xl font-black text-primary leading-none">до {maxRate}%</span>
          <span className="text-lg font-semibold text-muted-foreground">годовых</span>
        </div>
      ) : (
        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-5xl font-black text-primary/40 leading-none animate-pulse">—%</span>
          <span className="text-lg font-semibold text-muted-foreground">годовых</span>
        </div>
      ),
      rateHint: keyRate !== null ? `КС ЦБ (${keyRate}%) + до 3% + 0,5% бонус · актуально на ${rateDate}` : 'Загружаем актуальную ставку ЦБ...',
      features: [
        { icon: 'CalendarDays', text: 'Срок: 3, 6, 12 или 18 месяцев' },
        { icon: 'Percent', text: 'Ставка: КС ЦБ + бонус в зависимости от срока' },
        { icon: 'BadgeCheck', text: '+0,5% за выплату процентов в конце срока' },
        { icon: 'ShieldCheck', text: 'Пай возвращается при выходе в полном объёме' },
      ]
    },
    {
      key: 'turnover',
      gradient: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/20',
      btnColor: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      title: 'ОБОРОТНЫЙ ДОХОД',
      subtitle: 'Краткосрочное размещение 7–30 дней',
      rateNode: (
        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-5xl font-black text-emerald-500 leading-none">14%</span>
          <span className="text-lg font-semibold text-muted-foreground">годовых</span>
        </div>
      ),
      rateHint: 'Фиксированная ставка · начисление ежедневно на фактический остаток',
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
            Два продукта для разных задач: долгосрочные накопления по высокой ставке или краткосрочный оборотный доход с ежедневным начислением и свободным выводом
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

          {/* Гарантии и защита */}
          <div className="mb-12">
            <div className="rounded-2xl border border-primary/20 bg-primary/3 overflow-hidden">
              <div className="gradient-purple-blue px-6 py-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Icon name="ShieldCheck" size={22} className="text-white" />
                  Надёжность и защита ваших средств
                </h2>
              </div>
              <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
                {/* Реестры */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="BadgeCheck" size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-emerald-800 mb-0.5">Реестр ЦБ РФ</div>
                      <p className="text-sm text-emerald-700">
                        КПК включён в реестр Банка России.{' '}
                        <a
                          href="https://cbr.ru/finorg/foinfo/?ogrn=1163668081895"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 font-semibold hover:text-emerald-900 transition-colors"
                        >
                          Проверить в реестре ЦБ
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Building2" size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-blue-800 mb-0.5">Реестр СРО</div>
                      <p className="text-sm text-blue-700">
                        Включены в реестр саморегулируемой организации. Компенсационный и резервные фонды обеспечивают защиту в случае банкротства.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-xl bg-violet-50 border border-violet-100">
                    <div className="w-9 h-9 bg-violet-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Layers" size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-violet-800 mb-0.5">Единый подход к фонду</div>
                      <p className="text-sm text-violet-700">
                        Минимальные риски за счёт единого подхода к формированию и расходованию средств только внутри фонда. Сохранность средств членов фонда от блокировок ФНС и ФССП.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Правовая защита */}
                <div className="flex items-start gap-3 p-5 rounded-xl bg-slate-50 border border-slate-200 h-fit">
                  <div className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Scale" size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 mb-2 uppercase text-sm tracking-wide">Правовая основа защиты</div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      Счета пайщиков в КПК не являются банковскими счетами в смысле{' '}
                      <span className="font-semibold">ст. 845 ГК РФ</span>.
                      Требования ИФНС по ст. 76 НК РФ и требования ФССП распространяются исключительно на банковские счета.
                    </p>
                    <div className="mt-3 p-3 bg-slate-100 rounded-lg">
                      <p className="text-sm text-slate-700 font-medium">
                        Средства в КПК защищены от блокировок вне зависимости от налоговых споров и исполнительных производств.
                      </p>
                    </div>
                  </div>
                </div>
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