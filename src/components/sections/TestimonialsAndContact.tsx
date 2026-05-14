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
    q: 'Что такое КПК «Фин Формула» и чем он отличается от банка или МФО?',
    a: 'КПК «Фин Формула» — кредитный потребительский кооператив, некоммерческая организация, работающая на основании Федерального закона № 190-ФЗ под надзором Банка России. В отличие от банка, кооператив работает только для своих членов. В отличие от МФО, ставки по займам значительно ниже, а условия — индивидуальные. Паевой взнос при выходе возвращается полностью.'
  },
  {
    q: 'Кто может стать членом кооператива?',
    a: 'Членом КПК «Фин Формула» может стать физическое лицо, индивидуальный предприниматель или юридическое лицо, зарегистрированное и ведущее деятельность в Ростовской области или Краснодарском крае. Достаточно внести паевой взнос и подписать заявление о вступлении.'
  },
  {
    q: 'В каких регионах работает КПК «Фин Формула»?',
    a: 'Кооператив работает в Ростовской области и Краснодарском крае. Офис расположен в г. Шахты. Большинство вопросов можно решить дистанционно.'
  },
  {
    q: 'Как вступить в кооператив — какие документы нужны?',
    a: 'Для физического лица и ИП: только паспорт. Для юридического лица: учредительные документы, паспорт руководителя. Вступление занимает 1 рабочий день.'
  },
  {
    q: 'Возвращается ли паевой взнос при выходе из кооператива?',
    a: 'Да, паевой взнос возвращается в полном объёме при выходе из кооператива. Это принципиальное отличие от взноса в уставный капитал или других безвозвратных платежей — ваши деньги остаются вашими.'
  },
  {
    q: 'Какую доходность даёт размещение средств в КПК?',
    a: 'Ставки по сбережениям членов кооператива превышают банковские вклады и депозиты для ЮЛ. Точные условия зависят от суммы и срока — уточняйте при обращении.'
  },
  {
    q: 'Застрахованы ли средства в КПК?',
    a: 'Средства в КПК не входят в систему страхования вкладов АСВ. Однако КПК обязан состоять в саморегулируемой организации (СРО), которая формирует компенсационный фонд. КПК «Фин Формула» состоит в СРО и работает под надзором Банка России. А также формирует собственный резервный фонд согласно требованиям ФЗ и ЦБ РФ.'
  },
  {
    q: 'Как получить займ в КПК «Фин Формула»?',
    a: 'Шаг 1 — вступите в кооператив (1 рабочий день). Шаг 2 — подайте заявку на займ онлайн или в офисе. Шаг 3 — получите решение в течение 1 рабочего дня. Шаг 4 — подпишите договор и получите средства.'
  },
  {
    q: 'Нужен ли залог для получения займа?',
    a: 'Условия определяются индивидуально. Для членов кооператива возможно финансирование без залога. По крупным суммам может потребоваться обеспечение — залог имущества или поручительство.'
  },
  {
    q: 'На какой срок можно взять займ?',
    a: 'Займы выдаются на срок от 1 месяца. Краткосрочные займы — до 12 месяцев. Условия по более длительным срокам уточняйте при обращении.'
  },
  {
    q: 'Можно ли рефинансировать займ из другого банка или МФО?',
    a: 'Да, КПК «Фин Формула» предоставляет рефинансирование действующих кредитов и займов. Это позволяет снизить ставку и ежемесячный платёж. Заявку можно подать онлайн.'
  },
  {
    q: 'Как разместить сбережения в КПК — это как вклад в банке?',
    a: 'Принцип похож, но юридически это называется «сбережения члена кооператива». Вы передаёте средства кооперативу по договору, получаете фиксированный доход. Ставки выше банковских. Минимальная сумма и сроки уточняются при обращении.'
  },
  {
    q: 'Как связаться с КПК «Фин Формула»?',
    a: 'Сайт: ffrf.ru. Офис: г. Шахты, пр-кт. Пушкина 29А. Тел. 8 (800) 302-31-82. Заявку можно оставить онлайн на сайте — менеджер свяжется в течение рабочего дня.'
  },
  {
    q: 'Какие документы регулируют деятельность КПК?',
    a: 'КПК «Фин Формула» работает на основании Федерального закона № 190-ФЗ «О кредитной кооперации», зарегистрирован и поднадзорен Банку России. Деятельность ведётся в соответствии с уставом и внутренними положениями кооператива, которые можно скачать и изучить в разделе «Документы».'
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

    </>
  );
}