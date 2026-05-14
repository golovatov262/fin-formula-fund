import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Props {
  children: React.ReactNode;
  source?: string;
  title?: string;
  description?: string;
  defaultMessage?: string;
}

export default function IndividualApplicationForm({
  children,
  source = 'Не указано',
  title = 'Заявка для физического лица',
  description = 'Оставьте контакты — мы перезвоним и проконсультируем',
  defaultMessage = '',
}: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: defaultMessage,
  });

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
    setFormData({ ...formData, phone: formatPhone(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('https://functions.poehali.dev/938a9d74-34bc-4518-b118-c16728c86fd6', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || 'не указан',
          message: formData.message || 'Заявка с сайта (физическое лицо)',
          source: `[ФИЗ.ЛИЦО] ${source}`,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setFormData({ name: '', phone: '', email: '', message: defaultMessage });
        setOpen(false);
        navigate('/thank-you');
      } else {
        alert('Ошибка при отправке заявки. Попробуйте позже.');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка при отправке заявки. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidPhone = formData.phone.replace(/\D/g, '').length === 11;
  const isValidName = formData.name.trim().length >= 3;
  const isFormValid = isValidPhone && isValidName;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 gradient-purple-blue rounded-xl flex items-center justify-center">
              <Icon name="UserPlus" size={24} className="text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="ind-name" className="text-base">
              ФИО <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ind-name"
              type="text"
              placeholder="Иванов Иван Иванович"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ind-phone" className="text-base">
              Телефон <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ind-phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ind-email" className="text-base">Email</Label>
            <Input
              id="ind-email"
              type="email"
              placeholder="example@mail.ru"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ind-message" className="text-base">Комментарий</Label>
            <Textarea
              id="ind-message"
              placeholder="Кратко опишите, что вас интересует"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="w-full gradient-purple-blue text-white"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Icon name="Loader2" size={18} className="animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Icon name="Send" size={18} />
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
