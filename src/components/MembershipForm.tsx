import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface MembershipFormProps {
  children: React.ReactNode;
  source?: string;
}

interface CompanyData {
  inn: string;
  kpp: string;
  ogrn: string;
  name: {
    short: string;
    full: string;
  };
  address: {
    full: string;
  };
  management: string;
  status: string;
  type: string;
}

export default function MembershipForm({ children, source = 'Не указано' }: MembershipFormProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
    ogrn: ''
  });

  const formatINN = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 12);
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 1) return `+7 (${cleaned}`;
    if (cleaned.length <= 4) return `+7 (${cleaned.slice(1)}`;
    if (cleaned.length <= 7) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
    if (cleaned.length <= 9) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
  };

  const handleINNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatINN(e.target.value);
    setFormData({ ...formData, inn: formatted });
  };

  const fetchCompanyData = async (inn: string) => {
    if (inn.length !== 10 && inn.length !== 12) return;

    setIsLoadingCompany(true);
    try {
      const response = await fetch('https://functions.poehali.dev/abe5ec81-4ae5-45a4-b32e-479835cf1aab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inn }),
      });

      const result = await response.json();

      if (result.success) {
        setCompanyData(result);
        setFormData(prev => ({
          ...prev,
          companyName: result.name.short || result.name.full,
          address: result.address.full,
          kpp: result.kpp,
          ogrn: result.ogrn,
          fullName: prev.fullName || result.management
        }));
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    } finally {
      setIsLoadingCompany(false);
    }
  };

  useEffect(() => {
    if (formData.inn.length === 10 || formData.inn.length === 12) {
      const timer = setTimeout(() => {
        fetchCompanyData(formData.inn);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setCompanyData(null);
    }
  }, [formData.inn]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/427a83bd-614a-45b4-9f59-ae24429bd021', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, source }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setFormData({ inn: '', phone: '', fullName: '', companyName: '', address: '', kpp: '', ogrn: '' });
        setCompanyData(null);
        setOpen(false);
        navigate('/thank-you');
      } else {
        alert('Ошибка при отправке заявки. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Ошибка при отправке заявки. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidINN = formData.inn.length === 10 || formData.inn.length === 12;
  const isValidPhone = formData.phone.replace(/\D/g, '').length === 11;
  const isFormValid = isValidINN && isValidPhone && formData.fullName.trim().length >= 3;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 gradient-purple-blue rounded-xl flex items-center justify-center">
              <Icon name="UserPlus" size={24} className="text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl">Заявка на членство</DialogTitle>
              <DialogDescription>
                Заполните форму для вступления в КПК
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="inn" className="text-base">
              ИНН организации (ИП) <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="inn"
                type="text"
                placeholder="1234567890 или 123456789012"
                value={formData.inn}
                onChange={handleINNChange}
                className="text-base"
                required
              />
              {isLoadingCompany && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Icon name="Loader2" size={16} className="animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              10 цифр для ИП или 12 цифр для организации
            </p>
          </div>

          {companyData && (
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="CheckCircle" size={18} className="text-green-600" />
                <span className="font-semibold text-sm text-green-900 dark:text-green-100">Компания найдена</span>
              </div>
              <div className="text-sm space-y-1">
                <p><strong>Название:</strong> {companyData.name.short || companyData.name.full}</p>
                {companyData.kpp && <p><strong>КПП:</strong> {companyData.kpp}</p>}
                {companyData.ogrn && <p><strong>ОГРН:</strong> {companyData.ogrn}</p>}
                {companyData.address.full && <p><strong>Адрес:</strong> {companyData.address.full}</p>}
                {companyData.management && <p><strong>Руководитель:</strong> {companyData.management}</p>}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base">
              Номер телефона <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onChange={handlePhoneChange}
              className="text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-base">
              ФИО контактного лица <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Иванов Иван Иванович"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="text-base"
              required
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
            <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              После отправки заявки наш менеджер свяжется с вами для обсуждения условий вступления и размера паевого взноса.
            </div>
          </div>

          <Button
            type="submit"
            className="w-full gradient-purple-blue text-white"
            size="lg"
            disabled={!isFormValid || isSubmitting}
          >
            <Icon name={isSubmitting ? "Loader2" : "Send"} size={20} className={isSubmitting ? "animate-spin" : ""} />
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </Button>

          {!isFormValid && (
            <p className="text-xs text-center text-muted-foreground">
              Заполните все обязательные поля корректно
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}