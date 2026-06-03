import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
                <IndividualApplicationForm source="Страница «Паевой счёт для физлиц» — Hero">
                  <Button size="lg" variant="outline">
                    <Icon name="Phone" size={18} />
                    Консультация в МАХ
                  </Button>
                </IndividualApplicationForm>
              </div>
            </div>
            {/* Правая часть — иллюстрация */}
            <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
              <div
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden"
                style={{
                  backgroundImage: 'url(https://cdn.poehali.dev/projects/1051bbab-a467-4b71-b050-32335ddce05d/files/625ce2bc-949f-4d58-98f3-c444f8af768d.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black/45" />
                <div className="relative flex flex-col items-center justify-center h-full gap-4">
                  <div className="text-center">
                    <div className="text-8xl font-black leading-none text-white" style={{ textShadow: '0 0 30px rgba(140,100,255,0.8), 0 2px 8px rgba(0,0,0,0.8)' }}>18,5%</div>
                    <div className="text-base font-semibold text-white mt-2" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}>расчётная доходность</div>
                  </div>
                  <div className="w-16 h-0.5 bg-white/40 rounded-full" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>от 50 000 ₽</div>
                    <div className="text-sm text-white/80" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>сумма взноса</div>
                  </div>
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
      <section className="py-10 md:py-14 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Программа «Динамичный доход»</h2>
          <p className="text-center text-muted-foreground mb-8">Чем дольше срок — тем выше расчётная доходность</p>

          <Card className="border-2 mb-6">
            <CardContent className="pt-6 pb-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Программа</div>
                  <div className="text-lg font-bold">{program.name}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Сумма</div>
                  <div className="text-lg font-bold">{program.amountFrom} — {program.amountTo}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Выплата дохода</div>
                  <div className="text-sm font-semibold">{program.payout}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Таблица ставок */}
          <Card className="border-2 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/60 hover:bg-muted/60">
                    <TableHead rowSpan={2} className="font-bold text-foreground align-middle">Срок</TableHead>
                    <TableHead colSpan={2} className="font-bold text-foreground text-center border-l">Доходность фонда (годовых)</TableHead>
                  </TableRow>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="font-semibold text-foreground border-l">Выплата дохода ежемесячно или авансом</TableHead>
                    <TableHead className="font-semibold text-foreground">Выплата дохода в конце срока</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.term}>
                      <TableCell className="font-semibold">{r.term}</TableCell>
                      <TableCell className="font-bold text-lg text-primary">{r.monthly}</TableCell>
                      <TableCell className="font-bold text-lg text-purple-700">{r.end}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Паевые взносы принимаются только от пайщиков кооператива. Указанные значения доходности — ориентировочные, по итогам периода. Доходность не является фиксированной.
          </p>
        </div>
      </section>

      {/* Карточки сроков */}
      <section className="py-10 md:py-14 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Выберите подходящий срок</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {rows.map((r) => (
              <Card key={r.term} className="border-2 hover:shadow-xl hover:border-purple-400 transition-all">
                <CardContent className="pt-6 pb-6 text-center">
                  <div className="w-12 h-12 mx-auto gradient-purple-blue rounded-xl flex items-center justify-center mb-3">
                    <Icon name="Clock" size={22} className="text-white" />
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">Срок участия</div>
                  <div className="text-2xl font-bold mb-4">{r.term}</div>
                  <div className="space-y-2 mb-4">
                    <div className="bg-muted/40 rounded-lg p-2">
                      <div className="text-xs text-muted-foreground">Ежемесячно</div>
                      <div className="text-xl font-bold text-primary">{r.monthly}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-2">
                      <div className="text-xs text-muted-foreground">В конце срока</div>
                      <div className="text-xl font-bold text-purple-700">{r.end}</div>
                    </div>
                  </div>
                  <IndividualApplicationForm
                    source={`Страница «Паевой счёт для физлиц» — срок ${r.term}`}
                    defaultMessage={`Интересует паевой взнос на срок ${r.term}`}
                  >
                    <Button className="w-full" variant="outline" size="sm">
                      <Icon name="ArrowRight" size={14} />
                      Выбрать
                    </Button>
                  </IndividualApplicationForm>
                </CardContent>
              </Card>
            ))}
          </div>
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