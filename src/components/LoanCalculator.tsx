import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import LoanApplicationDialog from '@/components/LoanApplicationDialog';

const programs = [
  {
    id: 'oborotny',
    name: 'Оборотный',
    icon: 'RefreshCw',
    rate: 20,
    amountMin: 100000,
    amountMax: 1000000,
    monthsMin: 6,
    monthsMax: 12,
    amountDefault: 500000,
    monthsDefault: 9,
    color: 'orange',
  },
  {
    id: 'express',
    name: 'Кассовый экспресс',
    icon: 'Zap',
    rate: 22,
    amountMin: 50000,
    amountMax: 500000,
    monthsMin: 1,
    monthsMax: 3,
    amountDefault: 200000,
    monthsDefault: 2,
    color: 'amber',
  },
  {
    id: 'invest',
    name: 'Инвестиционный',
    icon: 'TrendingUp',
    rate: 21,
    amountMin: 300000,
    amountMax: 5000000,
    monthsMin: 1,
    monthsMax: 36,
    amountDefault: 1500000,
    monthsDefault: 24,
    color: 'blue',
  },
  {
    id: 'refi',
    name: 'Рефинансирование',
    icon: 'ArrowLeftRight',
    rate: 20,
    amountMin: 300000,
    amountMax: 5000000,
    monthsMin: 1,
    monthsMax: 60,
    amountDefault: 1500000,
    monthsDefault: 36,
    color: 'emerald',
  },
];

const tabColors: Record<string, { active: string; text: string }> = {
  orange:  { active: 'bg-orange-500 text-white',  text: 'text-orange-600' },
  amber:   { active: 'bg-amber-500 text-white',   text: 'text-amber-600' },
  blue:    { active: 'bg-blue-600 text-white',     text: 'text-blue-600' },
  emerald: { active: 'bg-emerald-600 text-white',  text: 'text-emerald-600' },
};

const fmt = (n: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n);

const fmtNum = (n: number) =>
  new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(n);

export default function LoanCalculator() {
  const [activeProg, setActiveProg] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const prog = programs[activeProg];

  const [amount, setAmount] = useState(prog.amountDefault);
  const [months, setMonths] = useState(prog.monthsDefault);

  useEffect(() => {
    setAmount(prog.amountDefault);
    setMonths(prog.monthsDefault);
  }, [activeProg]);

  const rate = prog.rate / 100 / 12;
  const monthlyPayment = months > 0 ? (amount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1) : 0;
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - amount;

  const colors = tabColors[prog.color];

  return (
    <>
      <Card className="max-w-2xl mx-auto hover:shadow-2xl transition-shadow">
        <CardContent className="pt-6 pb-6 space-y-5">
          {/* Заголовок */}
          <div className="flex items-center gap-3 mb-1">
            <div className="w-11 h-11 gradient-orange-pink rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name="Calculator" size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-lg">Калькулятор займа</div>
              <div className="text-xs text-muted-foreground">Выберите программу и рассчитайте платёж</div>
            </div>
          </div>

          {/* Табы программ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {programs.map((p, i) => {
              const isActive = i === activeProg;
              const c = tabColors[p.color];
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveProg(i)}
                  className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all border-2 ${
                    isActive
                      ? `${c.active} border-transparent shadow-md`
                      : 'bg-muted/40 text-muted-foreground border-transparent hover:border-muted-foreground/20'
                  }`}
                >
                  <Icon name={p.icon} size={13} />
                  <span className="leading-tight text-center">{p.name}</span>
                </button>
              );
            })}
          </div>

          {/* Ставка выбранной программы */}
          <div className="flex items-center justify-between rounded-lg px-4 py-2.5 bg-muted/40">
            <span className="text-sm text-muted-foreground">Ставка по программе</span>
            <span className={`text-lg font-bold ${colors.text}`}>{prog.rate}% годовых</span>
          </div>

          {/* Слайдер суммы */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm">Сумма займа</Label>
              <span className="font-bold text-base">{fmtNum(amount)} ₽</span>
            </div>
            <Slider
              value={[amount]}
              onValueChange={(v) => setAmount(v[0])}
              min={prog.amountMin}
              max={prog.amountMax}
              step={prog.amountMin <= 50000 ? 10000 : 50000}
              className="py-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{fmtNum(prog.amountMin)} ₽</span>
              <span>{fmtNum(prog.amountMax)} ₽</span>
            </div>
          </div>

          {/* Слайдер срока */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-sm">Срок займа</Label>
              <span className="font-bold text-base">{months} мес.</span>
            </div>
            <Slider
              value={[months]}
              onValueChange={(v) => setMonths(v[0])}
              min={prog.monthsMin}
              max={prog.monthsMax}
              step={1}
              className="py-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{prog.monthsMin} мес.</span>
              <span>{prog.monthsMax} мес.</span>
            </div>
          </div>

          {/* Результат */}
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 rounded-xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Ежемесячный платёж</span>
              <span className="text-2xl font-bold text-gradient">{fmt(monthlyPayment)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Переплата по процентам</span>
              <span className="font-semibold">{fmt(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t">
              <span className="text-sm text-muted-foreground">Итого к возврату</span>
              <span className="text-xl font-bold">{fmt(totalPayment)}</span>
            </div>
          </div>

          {/* Кнопка подачи заявки */}
          <Button
            className="w-full gradient-orange-pink text-white text-base py-6"
            onClick={() => setDialogOpen(true)}
          >
            <Icon name="Send" size={18} className="mr-2" />
            Подать заявку на займ
          </Button>

          <p className="text-xs text-muted-foreground text-center -mt-2">
            Расчёт предварительный. Точные условия согласовываются индивидуально.
          </p>
        </CardContent>
      </Card>

      <LoanApplicationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        loanProgram={prog.name}
        loanAmount={`${fmtNum(amount)} ₽`}
        loanMonths={`${months} мес.`}
        loanMonthlyPayment={fmt(monthlyPayment)}
      />
    </>
  );
}
