import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import Testimonials from '@/components/Testimonials';

const faqItems = [
  {
    q: 'Кто может стать членом КПК?',
    a: 'Членом кооператива может стать любое юридическое лицо, готовое внести паевой взнос и соблюдать устав фонда.'
  },
  {
    q: 'Какой размер паевого взноса?',
    a: 'Размер паевого взноса зависит от условий членства. Подробную информацию можно получить, связавшись с нами.'
  },
  {
    q: 'Какая доходность при размещении средств?',
    a: 'Ставки по размещению средств превышают банковские депозиты и зависят от суммы и срока размещения.'
  },
  {
    q: 'Как быстро можно получить финансирование?',
    a: 'Решение по заявке принимается в течение 1 рабочего дня после предоставления всех документов.'
  },
  {
    q: 'Нужен ли залог для получения финансирования?',
    a: 'Условия финансирования определяются индивидуально. Для членов кооператива возможно финансирование без залога.'
  },
  {
    q: 'Возвращается ли паевой взнос при выходе из кооператива?',
    a: 'Да, паевой взнос возвращается в полном объёме при выходе из кооператива. Это принципиальное отличие пая от взноса в уставный капитал или безвозвратного платежа — ваши средства остаются вашими.'
  }
];

export default function TestimonialsAndContact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/938a9d74-34bc-4518-b118-c16728c86fd6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Ошибка при отправке сообщения. Попробуйте позже.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Ошибка при отправке сообщения. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Testimonials />

      <section id="faq" className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Вопросы и ответы</h2>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              Ответы на частые вопросы
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-4 md:px-6">
                <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 flex gap-3 items-start rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
            <Icon name="ShieldCheck" size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-emerald-800 leading-snug">
              <span className="font-bold">Важно:</span> паевой взнос — это не безвозвратный платёж. При выходе из кооператива ваши средства возвращаются в полном объёме. Механизм закреплён уставом и регулируется{' '}
              <a
                href="https://www.consultant.ru/document/cons_doc_LAW_89568/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 font-semibold hover:text-emerald-900 transition-colors"
              >
                Федеральным законом №190-ФЗ «О кредитной кооперации»
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Свяжитесь с нами</h2>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              Оставьте заявку, и мы перезвоним в ближайшее время
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Телефон</h4>
                    <p className="text-sm text-muted-foreground">+7 (800) 302-31-82</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-sm text-muted-foreground">ff@sll-expert.ru</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Время работы</h4>
                    <p className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Оставить заявку</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Телефон"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Ваше сообщение"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full gradient-purple-blue text-white" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h3 className="font-bold text-lg mb-3 md:mb-4">О нас</h3>
              <p className="text-sm text-slate-300">
                КПК "ФИН ФОРМУЛА" — надежный партнер для развития вашего бизнеса с 2016 года.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 md:mb-4">Услуги</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#services" className="hover:text-white transition-colors">Размещение средств</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Финансирование</a></li>
                <li><a href="#membership" className="hover:text-white transition-colors">Членство</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 md:mb-4">Информация</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="#about" className="hover:text-white transition-colors">О фонде</a></li>
                <li><a href="#advantages" className="hover:text-white transition-colors">Преимущества</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 md:mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>+7 (800) 302-31-82</li>
                <li>ff@sll-expert.ru</li>
                <li></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-6 md:pt-8 text-center text-sm text-slate-400">
            <p>© 2024 КПК "ФИН ФОРМУЛА". Все права защищены.</p>
          </div>
        </div>
      </footer>
    </>
  );
}