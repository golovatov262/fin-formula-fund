import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Calculator from '@/components/Calculator';
import LoanCalculator from '@/components/LoanCalculator';

const investorService = {
  icon: 'TrendingUp',
  gradient: 'gradient-purple-blue',
  title: 'Для инвесторов — разместить средства',
  description: 'Получайте стабильный доход от размещения свободных средств компании по прозрачной формуле',
  features: [
    { icon: 'Percent', text: 'Ставка: Ключевая ЦБ + 2% — выше банковских депозитов' },
    { icon: 'CalendarDays', text: 'Гибкие сроки: от 3 месяцев до 3 лет' },
    { icon: 'ShieldCheck', text: 'Капитал работает внутри кооператива, среди проверенных участников' },
    { icon: 'FileText', text: 'Полная прозрачность: договор, отчётность, устав' },
  ]
};

const borrowerService = {
  icon: 'Wallet',
  gradient: 'gradient-orange-pink',
  title: 'Для заёмщиков — получить финансирование',
  description: 'Финансирование бизнеса без банковской бюрократии, залогов и жёстких ковенантов',
  features: [
    { icon: 'Zap', text: 'Решение за 24 часа после подачи заявки' },
    { icon: 'Ban', text: 'Без залога — для членов кооператива' },
    { icon: 'Shield', text: 'Без ковенантов: никаких ограничений на деятельность компании' },
    { icon: 'Users', text: 'Работаем с сегментами, которым отказывают банки' },
  ]
};

const turnovers = [
  { icon: 'Percent', text: 'Ставка 14,0% годовых — фиксированная' },
  { icon: 'CalendarDays', text: 'Срок от 7 до 30 дней, автопролонгация' },
  { icon: 'BadgeRussianRuble', text: 'Минимальная сумма от 500 000 ₽' },
  { icon: 'Calculator', text: 'Начисление ежедневно на фактический остаток' },
  { icon: 'ArrowDownToLine', text: 'Вывод в любой рабочий день без потери %' },
  { icon: 'PlusCircle', text: 'Пополнение в любое время' },
  { icon: 'ShieldCheck', text: 'Защита от блокировок' },
];

export default function AboutAndServices() {
  return (
    <>
      <section id="about" className="py-12 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Альтернатива банку — внутри вашего бизнес-сообщества</h2>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              КПК «ФИН ФОРМУЛА» — закрытый кооператив юридических лиц: одни участники размещают свободные средства под доходность выше рынка, другие получают финансирование без залогов и бюрократии
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 gradient-purple-blue rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Building2" size={24} className="text-white" />
                </div>
                <CardTitle>Как это работает?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Участники вносят паевые взносы и формируют общий фонд. Из этого фонда выдаётся финансирование другим членам кооператива — быстро, без залогов и банковских условий. Взнос возвращается при выходе в полном объёме.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 gradient-orange-pink rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Target" size={24} className="text-white" />
                </div>
                <CardTitle>Почему это выгодно?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Инвестор получает доходность выше банка без риска внешнего рынка. Заёмщик — деньги на развитие без залога и за 24 часа. Оба управляют фондом на равных правах. Работаем с 2016 года, активы — более 100 млн рублей.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Наши услуги</h2>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              Два направления для роста вашего бизнеса
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto mb-8 md:mb-16">
            {[investorService, borrowerService].map((service, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className={`h-2 ${service.gradient}`}></div>
                <CardHeader>
                  <div className={`w-12 h-12 md:w-16 md:h-16 ${service.gradient} rounded-2xl flex items-center justify-center mb-3 md:mb-4 animate-float`}>
                    <Icon name={service.icon as string} size={24} className="text-white md:w-8 md:h-8" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-sm md:text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 md:space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className={`w-7 h-7 ${service.gradient} rounded-md flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Icon name={feature.icon as string} size={14} className="text-white" />
                        </div>
                        <span className="text-sm md:text-base">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full mt-4 md:mt-6 ${service.gradient} text-white`} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    Оставить заявку
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Программа ОБОРОТНЫЙ ДОХОД */}
          <div className="max-w-6xl mx-auto mb-8 md:mb-16">
            <Card className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 animate-float">
                    <Icon name="RefreshCw" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-xl md:text-2xl">Оборотный доход</CardTitle>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">Новая программа</span>
                    </div>
                    <CardDescription className="text-sm md:text-base">
                      Краткосрочное размещение свободных средств с ежедневным начислением и свободным выводом
                    </CardDescription>
                  </div>
                  <div className="md:ml-auto flex flex-col items-start md:items-end flex-shrink-0">
                    <span className="text-3xl md:text-4xl font-bold text-emerald-600">14%</span>
                    <span className="text-sm text-muted-foreground">годовых</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-5">
                  {turnovers.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg">
                      <div className="w-7 h-7 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name={item.icon as string} size={14} className="text-white" />
                      </div>
                      <span className="text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full md:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-90"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Оставить заявку на программу
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
            <Calculator />
            <LoanCalculator />
          </div>
        </div>
      </section>
    </>
  );
}