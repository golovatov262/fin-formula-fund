import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import Testimonials from '@/components/Testimonials';

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
        body: JSON.stringify({ ...formData, source: 'Страница «О Фонде» — форма «Свяжитесь с нами»' }),
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
              Раздел обновляется
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/20 px-6 py-10 text-center">
            <Icon name="HelpCircle" size={32} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-base md:text-lg text-muted-foreground leading-snug">
              Раздел FAQ обновляется. Скоро здесь появятся ответы на популярные вопросы о кооперативе ФИН ФОРМУЛА.
            </p>
          </div>

          <div className="mt-8 flex gap-3 items-start rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
            <Icon name="ShieldCheck" size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-emerald-800 leading-snug">
              <span className="font-bold">Важно:</span> паевой взнос — это не безвозвратный платёж. При выходе из кооператива ваши средства возвращаются в полном объёме. Правовая основа — ст. 123.2 ГК РФ.
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

    </>
  );
}