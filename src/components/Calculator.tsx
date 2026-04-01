import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const TERMS = [
  { months: 3,  label: '3 мес.',  bonus: 0 },
  { months: 6,  label: '6 мес.',  bonus: 1 },
  { months: 12, label: '12 мес.', bonus: 2 },
  { months: 18, label: '18 мес.', bonus: 3 },
];

const END_OF_TERM_BONUS = 0.5;

export default function Calculator() {
  const [amount, setAmount] = useState(500000);
  const [termIndex, setTermIndex] = useState(1); // 6 мес. по умолчанию
  const [paymentType, setPaymentType] = useState<'monthly' | 'end'>('monthly');
  const [keyRate, setKeyRate] = useState<number | null>(null);
  const [rateDate, setRateDate] = useState('');

  useEffect(() => {
    fetch('https://functions.poehali.dev/ccf7de98-a7e2-4192-b19d-9d93fe63324e', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setKeyRate(data.keyRate);
        if (data.date) {
          const d = new Date(data.date);
          setRateDate(d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }));
        }
      })
      .catch(() => setKeyRate(21));
  }, []);

  const term = TERMS[termIndex];
  const months = term.months;

  // Итоговая ставка = ключевая + бонус по сроку + бонус за выплату в конце
  const currentRate = keyRate !== null
    ? keyRate + term.bonus + (paymentType === 'end' ? END_OF_TERM_BONUS : 0)
    : null;

  // Расчёт дохода
  let income = 0;
  let totalReturn = 0;
  if (currentRate !== null) {
    if (paymentType === 'monthly') {
      // Простые проценты, выплата ежемесячно
      const annualRate = currentRate / 100;
      income = amount * annualRate * (months / 12);
      totalReturn = amount + income;
    } else {
      // Капитализация в конце срока (простые %)
      const annualRate = currentRate / 100;
      income = amount * annualRate * (months / 12);
      totalReturn = amount + income;
    }
  }

  const monthlyPayment = paymentType === 'monthly' ? income / months : 0;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <Card className="max-w-2xl mx-auto hover:shadow-2xl transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-2 md:gap-3 mb-2">
          <div className="w-10 h-10 md:w-12 md:h-12 gradient-purple-blue rounded-xl flex items-center justify-center flex-shrink-0">
            <Icon name="Calculator" size={20} className="text-white md:w-6 md:h-6" />
          </div>
          <div>
            <CardTitle className="text-lg md:text-2xl">Калькулятор доходности</CardTitle>
            <CardDescription className="text-xs md:text-sm">Рассчитайте доход от размещения средств</CardDescription>
          </div>
        </div>

        {/* Текущая ставка */}
        <div className="bg-primary/10 rounded-lg p-2 md:p-3 mt-3 md:mt-4">
          <div className="flex items-center justify-between flex-wrap gap-1">
            <span className="text-xs md:text-sm text-muted-foreground">Ставка размещения:</span>
            {currentRate !== null ? (
              <span className="text-base md:text-lg font-bold text-primary">{currentRate.toFixed(1)}% годовых</span>
            ) : (
              <span className="text-sm text-muted-foreground animate-pulse">Загрузка...</span>
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5 md:mt-1">
            {keyRate !== null ? (
              <>
                Ключевая ставка ЦБ ({keyRate}%) + {term.bonus}%
                {paymentType === 'end' ? ` + ${END_OF_TERM_BONUS}% (бонус за выплату в конце)` : ''}
                {rateDate ? ` · актуально на ${rateDate}` : ''}
              </>
            ) : (
              'Получаем актуальную ставку от ЦБ РФ...'
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 md:space-y-6">

        {/* Сумма */}
        <div className="space-y-2 md:space-y-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <Label htmlFor="amount" className="text-sm md:text-base">Сумма размещения</Label>
            <Input
              id="amount"
              type="text"
              value={formatNumber(amount)}
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d]/g, '');
                setAmount(Number(value) || 0);
              }}
              className="w-full sm:w-36 md:w-40 text-right font-semibold text-sm md:text-base"
            />
          </div>
          <Slider
            value={[amount]}
            onValueChange={(value) => setAmount(value[0])}
            min={100000}
            max={10000000}
            step={50000}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>100 000 ₽</span>
            <span>10 000 000 ₽</span>
          </div>
        </div>

        {/* Срок — кнопки */}
        <div className="space-y-2 md:space-y-3">
          <Label className="text-sm md:text-base">Срок размещения</Label>
          <div className="grid grid-cols-4 gap-2">
            {TERMS.map((t, i) => (
              <button
                key={t.months}
                onClick={() => setTermIndex(i)}
                className={`
                  py-2.5 px-1 rounded-xl text-sm font-semibold border-2 transition-all
                  ${termIndex === i
                    ? 'border-primary bg-primary text-white shadow-md scale-105'
                    : 'border-border bg-muted/40 text-foreground hover:border-primary/50 hover:bg-primary/5'}
                `}
              >
                <div>{t.months}</div>
                <div className="text-xs font-normal opacity-80">мес.</div>
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground px-1">
            <span>КС ЦБ</span>
            <span>КС + 1%</span>
            <span>КС + 2%</span>
            <span>КС + 3%</span>
          </div>
        </div>

        {/* Переключатель вида выплат */}
        <div className="space-y-2">
          <Label className="text-sm md:text-base">Вид выплаты процентов</Label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-muted/40 rounded-xl">
            <button
              onClick={() => setPaymentType('monthly')}
              className={`
                flex flex-col items-center gap-0.5 py-2.5 px-2 rounded-lg text-sm font-medium transition-all
                ${paymentType === 'monthly'
                  ? 'bg-white dark:bg-card shadow-sm text-primary'
                  : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              <Icon name="CalendarDays" size={16} className="mb-0.5" />
              <span>Ежемесячно</span>
            </button>
            <button
              onClick={() => setPaymentType('end')}
              className={`
                flex flex-col items-center gap-0.5 py-2.5 px-2 rounded-lg text-sm font-medium transition-all
                ${paymentType === 'end'
                  ? 'bg-white dark:bg-card shadow-sm text-primary'
                  : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              <Icon name="BadgeCheck" size={16} className="mb-0.5" />
              <span>В конце срока</span>
              <span className="text-xs text-emerald-600 font-semibold">+{END_OF_TERM_BONUS}% бонус</span>
            </button>
          </div>
        </div>

        {/* Результаты */}
        <div className="border-t pt-4 md:pt-5 space-y-3 md:space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-xl p-4 md:p-6 space-y-3 md:space-y-4">
            {paymentType === 'monthly' && (
              <div className="flex justify-between items-center gap-2">
                <span className="text-sm md:text-base text-muted-foreground">Ежемесячный доход:</span>
                <span className="text-lg md:text-xl font-bold text-emerald-600">
                  {formatNumber(monthlyPayment)}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center gap-2">
              <span className="text-sm md:text-base text-muted-foreground">Ваш доход за период:</span>
              <span className="text-lg md:text-2xl font-bold text-gradient">
                {formatNumber(income)}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-sm md:text-base text-muted-foreground">Сумма к возврату:</span>
              <span className="text-xl md:text-3xl font-bold">
                {formatNumber(totalReturn)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-3">
            <div className="text-center p-2 md:p-3 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-0.5 md:mb-1">Ставка</div>
              <div className="font-bold text-sm md:text-base text-primary">{currentRate?.toFixed(1)}%</div>
            </div>
            <div className="text-center p-2 md:p-3 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-0.5 md:mb-1">Период</div>
              <div className="font-bold text-sm md:text-base">{months} мес.</div>
            </div>
            <div className="text-center p-2 md:p-3 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-0.5 md:mb-1">Выплата</div>
              <div className="font-bold text-xs md:text-sm">{paymentType === 'monthly' ? 'Ежемес.' : 'В конце'}</div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 md:p-4 flex gap-2 md:gap-3">
          <Icon name="Info" size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm text-amber-900 dark:text-amber-100">
            <strong>Важно:</strong> Расчёт является предварительным. Точные условия размещения обсуждаются индивидуально с менеджером фонда.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
