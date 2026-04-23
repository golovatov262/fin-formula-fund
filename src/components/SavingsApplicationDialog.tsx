import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface SavingsApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: string;
  amount: string;
  term: string;
  paymentType: string;
  rate: string;
  income: string;
  total: string;
}

interface CompanyData {
  inn: string;
  kpp: string;
  ogrn: string;
  name: { short: string; full: string };
  address: { full: string };
  management: string;
  status: string;
  type: string;
}

const formatPhone = (value: string) => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length === 0) return '';
  if (cleaned.length <= 1) return `+7 (${cleaned}`;
  if (cleaned.length <= 4) return `+7 (${cleaned.slice(1)}`;
  if (cleaned.length <= 7) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
  if (cleaned.length <= 9) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
};

export default function SavingsApplicationDialog({
  open,
  onOpenChange,
  program,
  amount,
  term,
  paymentType,
  rate,
  income,
  total,
}: SavingsApplicationDialogProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCompany, setIsLoadingCompany] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [formData, setFormData] = useState({
    inn: '',
    phone: '',
    fullName: '',
    companyName: '',
    address: '',
    kpp: '',
    ogrn: '',
  });

  const handleINNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 12);
    setFormData(prev => ({ ...prev, inn: val }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, phone: formatPhone(e.target.value) }));
  };

  useEffect(() => {
    const inn = formData.inn;
    if (inn.length !== 10 && inn.length !== 12) {
      setCompanyData(null);
      return;
    }
    const timer = setTimeout(async () => {
      setIsLoadingCompany(true);
      try {
        const res = await fetch('https://functions.poehali.dev/abe5ec81-4ae5-45a4-b32e-479835cf1aab', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inn }),
        });
        const data = await res.json();
        if (data.success) {
          setCompanyData(data);
          setFormData(prev => ({
            ...prev,
            companyName: data.name.short || data.name.full,
            address: data.address.full,
            kpp: data.kpp,
            ogrn: data.ogrn,
            fullName: prev.fullName || data.management,
          }));
        }
      } catch (err) {
        console.error('DaData lookup error:', err);
      } finally {
        setIsLoadingCompany(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.inn]);

  const reset = () => {
    setFormData({ inn: '', phone: '', fullName: '', companyName: '', address: '', kpp: '', ogrn: '' });
    setCompanyData(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('https://functions.poehali.dev/427a83bd-614a-45b4-9f59-ae24429bd021', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: `Калькулятор сбережений — программа «${program}»`,
          savingsProgram: program,
          savingsAmount: amount,
          savingsTerm: term,
          savingsPaymentType: paymentType,
          savingsRate: rate,
          savingsIncome: income,
          savingsTotal: total,
        }),
      });
      const result = await res.json();
      if (result.success) {
        reset();
        onOpenChange(false);
        navigate('/thank-you');
      } else {
        alert('Ошибка при отправке заявки. Попробуйте позже.');
      }
    } catch {
      alert('Ошибка при отправке заявки. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidINN = formData.inn.length === 10 || formData.inn.length === 12;
  const isValidPhone = formData.phone.replace(/\D/g, '').length === 11;
  const isFormValid = isValidINN && isValidPhone && formData.fullName.trim().length >= 3;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 gradient-purple-blue rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name="TrendingUp" size={22} className="text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl">Заявка на размещение средств</DialogTitle>
              <DialogDescription>Заполните контактные данные — менеджер свяжется с вами</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Параметры размещения */}
        <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 space-y-2">
          <div className="text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wide mb-1">Параметры расчёта</div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground text-xs">Программа</div>
              <div className="font-semibold">{program}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Сумма</div>
              <div className="font-semibold">{amount}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Срок</div>
              <div className="font-semibold">{term}</div>
            </div>
          </div>
          <div className="pt-1 border-t border-purple-200 dark:border-purple-800 grid grid-cols-3 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground text-xs">Ставка</div>
              <div className="font-bold text-purple-700">{rate}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Доход</div>
              <div className="font-bold text-purple-700">{income}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-xs">Итого</div>
              <div className="font-bold text-purple-700">{total}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-1">
          {/* ИНН */}
          <div className="space-y-1.5">
            <Label htmlFor="sa-inn">ИНН организации (ИП) <span className="text-destructive">*</span></Label>
            <div className="relative">
              <Input
                id="sa-inn"
                type="text"
                placeholder="1234567890 или 123456789012"
                value={formData.inn}
                onChange={handleINNChange}
                required
              />
              {isLoadingCompany && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Icon name="Loader2" size={15} className="animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">10 цифр для ИП или 12 цифр для организации</p>
          </div>

          {/* Компания найдена */}
          {companyData && (
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-3 space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="CheckCircle" size={16} className="text-green-600" />
                <span className="font-semibold text-sm text-green-900 dark:text-green-100">Компания найдена</span>
              </div>
              <div className="text-sm space-y-0.5">
                <p><strong>Название:</strong> {companyData.name.short || companyData.name.full}</p>
                {companyData.kpp && <p><strong>КПП:</strong> {companyData.kpp}</p>}
                {companyData.ogrn && <p><strong>ОГРН:</strong> {companyData.ogrn}</p>}
                {companyData.address.full && <p><strong>Адрес:</strong> {companyData.address.full}</p>}
              </div>
            </div>
          )}

          {/* Телефон */}
          <div className="space-y-1.5">
            <Label htmlFor="sa-phone">Телефон <span className="text-destructive">*</span></Label>
            <Input
              id="sa-phone"
              type="tel"
              placeholder="+7 (999) 123-45-67"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
            />
          </div>

          {/* ФИО */}
          <div className="space-y-1.5">
            <Label htmlFor="sa-name">Контактное лицо <span className="text-destructive">*</span></Label>
            <Input
              id="sa-name"
              type="text"
              placeholder="Иванов Иван Иванович"
              value={formData.fullName}
              onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full gradient-purple-blue text-white"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Icon name="Loader2" size={18} className="animate-spin mr-2" />
                Отправляем заявку...
              </>
            ) : (
              <>
                <Icon name="TrendingUp" size={18} className="mr-2" />
                Отправить заявку
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
