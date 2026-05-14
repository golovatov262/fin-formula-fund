import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import IndividualApplicationForm from '@/components/IndividualApplicationForm';

type CommissionType = 'monthly' | 'oneTime';

interface Program {
  id: string;
  name: string;
  icon: string;
  rate: number;
  rateMax: number;
  amountMin: number;
  amountMax: number;
  monthsMin: number;
  monthsMax: number;
  amountDefault: number;
  monthsDefault: number;
  color: string;
  commissionType: CommissionType;
  commissionPercent: number;
  commissionMin?: number;
  commissionMax?: number;
  commissionLabel: string;
}

const programs: Program[] = [
  {
    id: 'unsecured',
    name: 'Без обеспечения',
    icon: 'UserCheck',
    rate: 27,
    rateMax: 49,
    amountMin: 20000,
    amountMax: 300000,
    monthsMin: 12,
    monthsMax: 60,
    amountDefault: 150000,
    monthsDefault: 24,
    color: 'orange',
    commissionType: 'monthly',
    commissionPercent: 0.6,
    commissionMin: 10000,
    commissionLabel: '0,6% в мес. от суммы займа, min 10 000 ₽',
  },
  {
    id: 'realestate',
    name: 'Под залог недвижимости',
    icon: 'Home',
    rate: 27,
    rateMax: 39,
    amountMin: 50000,
    amountMax: 3000000,
    monthsMin: 12,
    monthsMax: 180,
    amountDefault: 1000000,
    monthsDefault: 60,
    color: 'blue',
    commissionType: 'monthly',
    commissionPercent: 0.3,
    commissionMin: 10000,
    commissionMax: 200000,
    commissionLabel: '0,3% в мес. от суммы займа, min 10 000 ₽, max 200 000 ₽',
  },
  {
    id: 'mortgage',
    name: 'Ипотека',
    icon: 'Building',
    rate: 27,
    rateMax: 33,
    amountMin: 100000,
    amountMax: 3000000,
    monthsMin: 12,
    monthsMax: 180,
    amountDefault: 2000000,
    monthsDefault: 120,
    color: 'emerald',
    commissionType: 'oneTime',
    commissionPercent: 8.5,
    commissionLabel: '8,5% от суммы займа единовременно',
  },
  {
    id: 'auto',
    name: 'Авто займ',
    icon: 'Car',
    rate: 27,
    rateMax: 39,
    amountMin: 50000,
    amountMax: 2000000,
    monthsMin: 12,
    monthsMax: 84,
    amountDefault: 800000,
    monthsDefault: 36,
    color: 'amber',
    commissionType: 'monthly',
    commissionPercent: 0.3,
    commissionMin: 10000,
    commissionMax: 200000,
    commissionLabel: '0,3% в мес. от суммы займа, min 10 000 ₽, max 200 000 ₽',
  },
];

const tabColors: Record<string, { active: string; text: string }> = {
  orange:  { active: 'bg-orange-500 text-white',   text: 'text-orange-600' },
  blue:    { active: 'bg-blue-600 text-white',     text: 'text-blue-600' },
  emerald: { active: 'bg-emerald-600 text-white',  text: 'text-emerald-600' },
  amber:   { active: 'bg-amber-500 text-white',    text: 'text-amber-600' },
};

const fmt = (n: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n);

const fmtNum = (n: number) =>
  new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(n);

export default function IndividualLoanCalculator() {
  const [activeProg, setActiveProg] = useState(0);
  const prog = programs[activeProg];

  const [amount, setAmount] = useState(prog.amountDefault);
  const [months, setMonths] = useState(prog.monthsDefault);

  useEffect(() => {
    setAmount(prog.amountDefault);
    setMonths(prog.monthsDefault);
  }, [activeProg]);

  // Расчёт комиссии (включается в сумму займа)
  let commission = 0;
  if (prog.commissionType === 'oneTime') {
    commission = amount * (prog.commissionPercent / 100);
  } else {
    // Ежемесячная комиссия от первоначальной суммы займа за весь срок
    const monthlyCommission = amount * (prog.commissionPercent / 100);
    commission = monthlyCommission * months;
  }
  if (prog.commissionMin && commission < prog.commissionMin) commission = prog.commissionMin;
  if (prog.commissionMax && commission > prog.commissionMax) commission = prog.commissionMax;

  // Тело займа = сумма к получению + комиссия
  const loanBody = amount + commission;

  const rate = prog.rate / 100 / 12;
  const monthlyPayment = months > 0 ? (loanBody * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1) : 0;
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - loanBody;

  const colors = tabColors[prog.color];

  const step = prog.amountMax >= 1000000 ? 50000 : prog.amountMin <= 50000 ? 10000 : 25000;

  return (
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
                    : 'bg-muted/40 text-muted-foreground border-muted-foreground/25 hover:border-muted-foreground/50'
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
          <span className={`text-lg font-bold ${colors.text}`}>от {prog.rate}% до {prog.rateMax}% годовых</span>
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
            step={step}
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

        {/* Комиссия по программе */}
        <div className="rounded-lg px-4 py-2.5 bg-amber-50 border border-amber-200 text-xs space-y-1">
          <div className="flex items-start gap-2">
            <Icon name="Info" size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold text-amber-900">Комиссия за предоставление займа</div>
              <div className="text-amber-800">{prog.commissionLabel}</div>
              <div className="text-amber-800 mt-1">Включена в тело займа</div>
            </div>
          </div>
        </div>

        {/* Результат */}
        <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-5 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Комиссия за предоставление</span>
            <span className="font-semibold">{fmt(commission)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Сумма займа с комиссией</span>
            <span className="font-semibold">{fmt(loanBody)}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t">
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
        <IndividualApplicationForm
          source={`Калькулятор займа — программа «${prog.name}»`}
          defaultMessage={`Программа: ${prog.name}\nСумма к получению: ${fmtNum(amount)} ₽\nКомиссия: ${fmt(commission)}\nТело займа: ${fmt(loanBody)}\nСрок: ${months} мес.\nЕжемесячный платёж: ${fmt(monthlyPayment)}`}
        >
          <Button className="w-full gradient-orange-pink text-white text-base py-6">
            <Icon name="Send" size={18} />
            Подать заявку на займ
          </Button>
        </IndividualApplicationForm>

        <p className="text-xs text-muted-foreground text-center -mt-2">
          Расчёт предварительный по минимальной ставке программы. Точные условия согласовываются индивидуально.
        </p>
      </CardContent>
    </Card>
  );
}