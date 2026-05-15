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
  payout: 'Авансом при открытии счёта, ежемесячно либо в конце срока',
};

const rows = [
  { term: '3 мес.', monthly: '15%', end: '15,50%' },
  { term: '6 мес.', monthly: '16%', end: '16,50%' },
  { term: '12 мес.', monthly: '17%', end: '17,50%' },
  { term: '18 мес.', monthly: '18%', end: '18,50%' },
];

const advantages = [
  { icon: 'TrendingUp', title: 'До 18,50% годовых', text: 'Ставка выше банковских вкладов на сопоставимых сроках' },
  { icon: 'Shield', title: 'Контроль ЦБ РФ', text: 'Деятельность кооператива регулируется Банком России' },
  { icon: 'Wallet', title: 'Гибкие выплаты', text: 'Получайте проценты авансом, ежемесячно или в конце срока' },
  { icon: 'Coins', title: 'От 50 000 ₽', text: 'Минимальный порог входа доступен большинству пайщиков' },
];

export default function IndividualSavings() {
  return (
    <Layout>
      <SEO
        title="Сбережения для физлиц до 18,5% годовых — КПК «ФИН ФОРМУЛА»"
        description="Программа «Динамичный доход» для физических лиц и самозанятых: сумма от 50 000 ₽ до 30 000 000 ₽, срок 3–18 месяцев, ставка до 18,50% годовых. Выплата ежемесячно, авансом или в конце срока."
        path="/individual/savings"
        breadcrumbs={[
          { name: 'Главная', path: '/' },
          { name: 'Сбережения для физических лиц', path: '/individual/savings' },
        ]}
      />
      {/* Hero */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-purple-50/60 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Icon name="TrendingUp" size={15} />
            Для физических лиц
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Сбережения <span className="text-gradient">до 18,50% годовых</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Программа «Динамичный доход» — для членов кооператива. Размещайте средства от 50 000 ₽ на срок от 3 до 18 месяцев с гибкими выплатами процентов.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <IndividualApplicationForm source="Страница «Сбережения для физлиц» — Hero">
              <Button size="lg" className="gradient-purple-blue text-white px-10">
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

      {/* Описание программы */}
      <section className="py-10 md:py-14 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Программа сбережений</h2>
          <p className="text-center text-muted-foreground mb-8">Чем дольше срок — тем выше ставка</p>

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
                  <div className="text-xs text-muted-foreground mb-1">Выплата %</div>
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
                    <TableHead colSpan={2} className="font-bold text-foreground text-center border-l">Ставка (годовых)</TableHead>
                  </TableRow>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="font-semibold text-foreground border-l">% Ежемесячно или авансом</TableHead>
                    <TableHead className="font-semibold text-foreground">% В конце срока</TableHead>
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
            Сбережения принимаются только от членов кооператива. Действует страхование сбережений пайщиков.
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
                  <div className="text-sm text-muted-foreground mb-1">Срок размещения</div>
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
                    source={`Страница «Сбережения для физлиц» — срок ${r.term}`}
                    defaultMessage={`Интересует размещение на срок ${r.term}`}
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
      <section className="py-10 md:py-14 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Рассчитайте свой доход</h2>
          <p className="text-center text-muted-foreground mb-8">Выберите сумму, срок и способ выплаты процентов</p>
          <SavingsCalculator />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Готовы разместить сбережения?</h2>
          <p className="text-white/90 mb-6">Оставьте заявку — мы расскажем условия и поможем оформить договор</p>
          <IndividualApplicationForm source="Страница «Сбережения для физлиц» — нижний CTA">
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