import Layout from '@/components/Layout';
import LoanCalculator from '@/components/LoanCalculator';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import MembershipForm from '@/components/MembershipForm';

const loanPrograms = [
  {
    num: '1',
    name: 'Оборотный',
    tagline: 'Пополнение оборотных средств, закупка товара, закрытие кассового разрыва',
    rate: 'от 20%',
    amount: '100 тыс. — 1 млн ₽',
    term: 'до 12 месяцев',
    collateral: 'без залога',
    decision: '24 часа',
    activity: 'от 3 месяцев',
    description: 'Самая быстрая программа — решение за сутки, деньги на счёте на следующий рабочий день. Доступна для бизнеса с историей от 3 месяцев — на 3 месяца раньше, чем разрешит большинство банков.',
    cases: ['Закупка товара под сезон или крупный заказ', 'Закрытие кассового разрыва между отгрузкой и оплатой', 'Оплата аренды, ФОТ, логистики при задержке выручки'],
    icon: 'RefreshCw',
    color: 'orange',
  },
  {
    num: '2',
    name: 'Кассовый экспресс',
    tagline: 'Срочное финансирование в течение 24 часов при кассовом разрыве',
    rate: 'от 22%',
    amount: '50 — 500 тыс. ₽',
    term: '7 — 90 дней',
    collateral: 'без залога',
    decision: '24 часа',
    activity: 'от 3 месяцев',
    description: 'Аналог банковского овердрафта — без привязки к расчётному счёту и требований к оборотам. Единственный инструмент, доступный при заблокированном банковском счёте.',
    cases: ['Срочная уплата налогов при задержке выручки', 'Предоплата поставщику для экстренной отгрузки', 'Работа при заблокированном расчётном счёте'],
    icon: 'Zap',
    color: 'amber',
  },
  {
    num: '3',
    name: 'Инвестиционный',
    tagline: 'Оборудование, транспорт, ремонт, расширение — среднесрочное финансирование',
    rate: 'от 21%',
    amount: '300 тыс. — 5 млн ₽',
    term: 'до 36 месяцев',
    collateral: 'гибко',
    decision: '48 часов',
    activity: 'от 6 месяцев',
    description: 'Первая среднесрочная программа КПК — до 3 лет для надёжных пайщиков. Ставка 21% против 30% в банке, без жёстких требований к залогу и обороту.',
    cases: ['Покупка оборудования или спецтехники', 'Приобретение транспортных средств', 'Ремонт и расширение производства'],
    icon: 'TrendingUp',
    color: 'blue',
  },
  {
    num: '4',
    name: 'Рефинансирование',
    tagline: 'Перевод дорогих банковских кредитов — ниже ставка, меньше нагрузка, больше оборотки',
    rate: 'от 20%',
    amount: '300 тыс. — 5 млн ₽',
    term: 'до 60 месяцев',
    collateral: 'гибко',
    decision: '48 часов',
    activity: 'от 6 месяцев',
    description: 'Для бизнеса, который обслуживает кредиты под 22–34%. Снижает ежемесячный платёж на 20–30%, высвобождает оборотные средства. Рефинансируем кредиты любых банков, МФО и частных инвесторов.',
    cases: ['Снижение ежемесячного платежа на 20–30%', 'Рефинансирование кредитов любых банков и МФО', 'Высвобождение оборотных средств'],
    icon: 'ArrowLeftRight',
    color: 'emerald',
  },
];

const colorMap: Record<string, { badge: string; icon: string; border: string; tag: string }> = {
  orange:  { badge: 'bg-orange-100 text-orange-700',  icon: 'gradient-orange-pink',   border: 'border-orange-200 hover:border-orange-400',  tag: 'text-orange-600' },
  amber:   { badge: 'bg-amber-100 text-amber-700',    icon: 'bg-amber-500',            border: 'border-amber-200 hover:border-amber-400',    tag: 'text-amber-600' },
  blue:    { badge: 'bg-blue-100 text-blue-700',      icon: 'gradient-purple-blue',    border: 'border-blue-200 hover:border-blue-400',      tag: 'text-blue-600' },
  emerald: { badge: 'bg-emerald-100 text-emerald-700',icon: 'bg-emerald-600',          border: 'border-emerald-200 hover:border-emerald-400',tag: 'text-emerald-600' },
};

const advantages = [
  { icon: 'Zap', title: 'Решение за 24 часа', text: 'Ответ по заявке на следующий рабочий день после подачи документов' },
  { icon: 'Ban', title: 'Без залога', text: 'Для членов кооператива финансирование доступно без обеспечения' },
  { icon: 'Shield', title: 'Без ковенантов', text: 'Никаких ограничений на деятельность компании и обязательных оборотов' },
  { icon: 'Users', title: 'Для любого бизнеса', text: 'Работаем с компаниями от 6 месяцев, которым отказывают банки' },
  { icon: 'Target', title: 'Свобода использования', text: 'Никаких ограничений на цели — направляйте средства туда, где нужно' },
  { icon: 'CalendarClock', title: 'Гибкий график', text: 'Учитываем сезонность бизнеса и кассовые разрывы' },
];


export default function Loans() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-orange-50/60 to-transparent dark:from-orange-950/10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Icon name="Wallet" size={15} />
            Займы
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Финансирование бизнеса <span className="text-gradient">без банковской бюрократии</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Деньги на развитие бизнеса без залогов, ковенантов и долгих проверок. Решение за 24 часа — для членов кооператива
          </p>
          <MembershipForm source="Страница «Займы» — кнопка «Получить финансирование» (Hero)">
            <Button size="lg" className="gradient-orange-pink text-white px-10">
              <Icon name="Zap" size={18} />
              Получить финансирование
            </Button>
          </MembershipForm>
        </div>
      </section>

      {/* Программы займов */}
      <section className="py-10 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Программы займов</h2>
          <p className="text-center text-muted-foreground mb-10">Выберите подходящую программу — или мы подберём её вместе</p>
          <div className="grid md:grid-cols-2 gap-6">
            {loanPrograms.map((p) => {
              const c = colorMap[p.color];
              return (
                <Card key={p.num} className={`border-2 ${c.border} hover:shadow-xl transition-all group`}>
                  <CardContent className="pt-6 pb-6">
                    {/* Шапка */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 ${c.icon} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon name={p.icon} size={22} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold leading-tight">«{p.name}»</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{p.tagline}</p>
                      </div>
                    </div>

                    {/* Ключевые параметры */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        { label: 'Ставка', value: p.rate },
                        { label: 'Сумма', value: p.amount },
                        { label: 'Срок', value: p.term },
                        { label: 'Залог', value: p.collateral },
                        { label: 'Решение', value: p.decision },
                        { label: 'Деятельность', value: p.activity },
                      ].map((item) => (
                        <div key={item.label} className="bg-muted/40 rounded-lg px-3 py-2 text-center">
                          <div className="text-xs text-muted-foreground mb-0.5">{item.label}</div>
                          <div className="text-xs font-bold">{item.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Описание */}
                    <p className="text-sm text-muted-foreground mb-4">{p.description}</p>

                    {/* Типичные ситуации */}
                    <ul className="space-y-1.5 mb-5">
                      {p.cases.map((c2, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Icon name="CheckCircle2" size={14} className={`${c.tag} flex-shrink-0 mt-0.5`} />
                          <span>{c2}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <MembershipForm
                      source={`Страница «Займы» — программа «${p.name}»`}
                      title={`Заявка на займ «${p.name}»`}
                      description={p.tagline}
                    >
                      <Button className={`w-full ${p.color === 'blue' || p.color === 'emerald' ? 'gradient-purple-blue' : 'gradient-orange-pink'} text-white`}>
                        Подать заявку на «{p.name}»
                      </Button>
                    </MembershipForm>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Почему выбирают нас</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {advantages.map((a, i) => (
              <Card key={i} className="hover:shadow-lg transition-all hover:-translate-y-1 group">
                <CardContent className="pt-5 pb-5">
                  <div className="w-11 h-11 gradient-orange-pink rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon name={a.icon} size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold mb-1.5">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Калькулятор */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Рассчитайте стоимость займа</h2>
            <LoanCalculator />
          </div>

          {/* Как получить */}
          <div className="bg-muted/30 rounded-2xl p-6 md:p-10 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Как получить финансирование</h2>
            <div className="grid sm:grid-cols-4 gap-5">
              {[
                { step: '1', icon: 'UserPlus', title: 'Вступить в КПК', text: 'Внести паевой взнос от 30 000 ₽' },
                { step: '2', icon: 'Send', title: 'Подать заявку', text: 'Заполнить форму и предоставить базовые документы' },
                { step: '3', icon: 'CheckCircle', title: 'Получить решение', text: 'В течение 1 рабочего дня' },
                { step: '4', icon: 'Banknote', title: 'Получить деньги', text: 'На расчётный счёт компании' },
              ].map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 gradient-orange-pink rounded-2xl flex items-center justify-center mb-3">
                    <Icon name={s.icon} size={22} className="text-white" />
                  </div>
                  <div className="text-xs font-bold text-orange-500 mb-1">Шаг {s.step}</div>
                  <div className="font-bold text-sm mb-1">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <MembershipForm source="Страница «Займы» — кнопка «Оставить заявку» (нижний блок)">
              <Button size="lg" className="gradient-orange-pink text-white px-10">
                <Icon name="Zap" size={18} />
                Оставить заявку
              </Button>
            </MembershipForm>
          </div>
        </div>
      </section>
    </Layout>
  );
}