import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import IndividualApplicationForm from '@/components/IndividualApplicationForm';

type PayoutType = 'monthly' | 'advance' | 'end';

interface TermOption {
  months: number;
  label: string;
  rateMonthly: number;
  rateEnd: number;
}

const terms: TermOption[] = [
  { months: 3, label: '3 мес.', rateMonthly: 15, rateEnd: 15.5 },
  { months: 6, label: '6 мес.', rateMonthly: 16, rateEnd: 16.5 },
  { months: 12, label: '12 мес.', rateMonthly: 17, rateEnd: 17.5 },
  { months: 18, label: '18 мес.', rateMonthly: 18, rateEnd: 18.5 },
];

const payoutOptions: { id: PayoutType; label: string; icon: string; hint: string }[] = [
  { id: 'monthly', label: 'Ежемесячно', icon: 'Calendar', hint: 'Начисление дохода каждый месяц' },
  { id: 'advance', label: 'Авансом', icon: 'Zap', hint: 'Выплата дохода сразу при открытии' },
  { id: 'end', label: 'В конце срока', icon: 'Trophy', hint: 'Максимальная доходность фонда' },
];

const fmt = (n: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n);

const fmtNum = (n: number) =>
  new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(n);

export default function SavingsCalculator() {
  const [amount, setAmount] = useState(500000);
  const [termIdx, setTermIdx] = useState(2);
  const [payout, setPayout] = useState<PayoutType>('monthly');

  const term = terms[termIdx];
  const rate = payout === 'end' ? term.rateEnd : term.rateMonthly;

  const totalIncome = (amount * (rate / 100) * term.months) / 12;
  const totalAmount = amount + totalIncome;
  const monthlyIncome = totalIncome / term.months;

  useEffect(() => {
    if (amount < 50000) setAmount(50000);
    if (amount > 30000000) setAmount(30000000);
  }, [amount]);

  const payoutInfo = payoutOptions.find((p) => p.id === payout)!;

  return (
    <Card className="max-w-2xl mx-auto hover:shadow-2xl transition-shadow">
      <CardContent className="pt-6 pb-6 space-y-5">
        {/* Заголовок */}
        <div className="flex items-center gap-3 mb-1">
          <div className="w-11 h-11 gradient-purple-blue rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="Calculator" size={20} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-lg">Калькулятор доходности</div>
            <div className="text-xs text-muted-foreground">Рассчитайте доход от паевого взноса</div>
          </div>
        </div>

        {/* Сумма */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-sm">Сумма паевого взноса</Label>
            <span className="font-bold text-base">{fmtNum(amount)} ₽</span>
          </div>
          <Slider
            value={[amount]}
            onValueChange={(v) => setAmount(v[0])}
            min={50000}
            max={30000000}
            step={50000}
            className="py-3"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>50 000 ₽</span>
            <span>30 000 000 ₽</span>
          </div>
        </div>

        {/* Срок */}
        <div className="space-y-2">
          <Label className="text-sm">Срок участия</Label>
          <div className="grid grid-cols-4 gap-2">
            {terms.map((t, i) => {
              const isActive = i === termIdx;
              return (
                <button
                  key={t.months}
                  onClick={() => setTermIdx(i)}
                  className={`rounded-xl px-2 py-2.5 text-sm font-semibold transition-all border-2 ${
                    isActive
                      ? 'bg-purple-600 text-white border-transparent shadow-md'
                      : 'bg-muted/40 text-muted-foreground border-muted-foreground/25 hover:border-muted-foreground/50'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Способ выплаты */}
        <div className="space-y-2">
          <Label className="text-sm">Выплата дохода</Label>
          <div className="grid grid-cols-3 gap-2">
            {payoutOptions.map((p) => {
              const isActive = p.id === payout;
              return (
                <button
                  key={p.id}
                  onClick={() => setPayout(p.id)}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-3 text-xs font-semibold transition-all border-2 ${
                    isActive
                      ? 'bg-purple-600 text-white border-transparent shadow-md'
                      : 'bg-muted/40 text-muted-foreground border-muted-foreground/25 hover:border-muted-foreground/50'
                  }`}
                >
                  <Icon name={p.icon} size={16} />
                  <span className="leading-tight text-center">{p.label}</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground pl-1">{payoutInfo.hint}</p>
        </div>

        {/* Ставка */}
        <div className="flex items-center justify-between rounded-lg px-4 py-2.5 bg-purple-50 border border-purple-200">
          <span className="text-sm text-purple-900">Доходность фонда по выбранным параметрам</span>
          <span className="text-lg font-bold text-purple-700">{rate}% годовых</span>
        </div>

        {/* Акцентный блок — доход */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name="TrendingUp" size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wide text-white/80 font-semibold">Ваш доход за весь срок</div>
              <div className="text-3xl font-extrabold leading-tight mt-0.5">{fmt(totalIncome)}</div>
            </div>
          </div>
        </div>

        {/* Детализация */}
        <div className="bg-muted/40 rounded-xl p-5 space-y-3">
          {payout === 'monthly' && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Ежемесячная выплата</span>
              <span className="font-semibold">{fmt(monthlyIncome)}</span>
            </div>
          )}
          {payout === 'advance' && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Выплата при открытии</span>
              <span className="font-semibold">{fmt(totalIncome)}</span>
            </div>
          )}
          {payout === 'end' && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Выплата в конце срока</span>
              <span className="font-semibold">{fmt(totalIncome)}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Сумма паевого взноса</span>
            <span className="font-semibold">{fmt(amount)}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t">
            <span className="text-sm text-muted-foreground">Итого через {term.label}</span>
            <span className="text-xl font-bold">{fmt(totalAmount)}</span>
          </div>
        </div>

        {/* Кнопка подачи заявки */}
        <IndividualApplicationForm
          source={`Калькулятор паевого счёта — ${term.label}, ${payoutInfo.label}`}
          defaultMessage={`Программа: «Динамичный доход»\nСумма: ${fmtNum(amount)} ₽\nСрок: ${term.label}\nВыплата дохода: ${payoutInfo.label}\nДоходность фонда: ${rate}% годовых\nДоход за весь срок: ${fmt(totalIncome)}`}
        >
          <Button className="w-full gradient-purple-blue text-white text-base py-6">
            <Icon name="Send" size={18} />
            Открыть паевой счёт
          </Button>
        </IndividualApplicationForm>

        <p className="text-xs text-muted-foreground text-center -mt-2">
          Расчёт предварительный. Доходность ориентировочная, не является фиксированной. Паевые взносы принимаются только от членов кооператива.
        </p>
      </CardContent>
    </Card>
  );
}