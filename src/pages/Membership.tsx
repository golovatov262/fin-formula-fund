import Layout from '@/components/Layout';
import MembershipForm from '@/components/MembershipForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const steps = [
  { icon: 'Send', title: 'Оставить заявку', text: 'Заполните форму на сайте — укажите ИНН и контакт. Данные о компании подгрузятся автоматически из реестра.' },
  { icon: 'Phone', title: 'Консультация', text: 'Менеджер свяжется в течение рабочего дня, ответит на вопросы и расскажет об условиях.' },
  { icon: 'FileSignature', title: 'Подписать документы', text: 'Заключить договор о вступлении и внести паевой взнос — от 30 000 ₽ частями.' },
  { icon: 'CheckCircle', title: 'Стать участником', text: 'Получить доступ к размещению средств, финансированию и управлению фондом.' },
];

const rights = [
  { icon: 'TrendingUp', title: 'Размещать средства', text: 'Под ставку выше банковских депозитов с прозрачной формулой' },
  { icon: 'Wallet', title: 'Получать финансирование', text: 'Без залога и банковской бюрократии — за 24 часа' },
  { icon: 'Vote', title: 'Участвовать в управлении', text: 'Один голос независимо от размера взноса' },
  { icon: 'FileText', title: 'Получать отчётность', text: 'Полная прозрачность деятельности фонда' },
];

export default function Membership() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Icon name="Users" size={15} />
            Членство
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Вступите в закрытый <span className="text-gradient">клуб предпринимателей</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Кооператив юридических лиц — равные права для всех участников. Паевой взнос возвращается при выходе в полном объёме
          </p>
          <MembershipForm>
            <Button size="lg" className="gradient-purple-blue text-white px-10">
              <Icon name="UserPlus" size={18} />
              Подать заявку на членство
            </Button>
          </MembershipForm>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">

          {/* Ключевые факты */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {[
              { value: '2016', label: 'Год основания' },
              { value: 'от 30 000 ₽', label: 'Паевой взнос' },
              { value: '100%', label: 'Возврат взноса при выходе' },
              { value: '1 голос', label: 'Равное право у каждого' },
            ].map((f, i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-5 pb-5">
                  <div className="text-2xl font-bold text-gradient mb-1">{f.value}</div>
                  <div className="text-xs text-muted-foreground">{f.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Как стать членом */}
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Как вступить в кооператив</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((s, i) => (
                <div key={i} className="relative">
                  <Card className="h-full">
                    <CardContent className="pt-6 pb-5">
                      <div className="w-12 h-12 gradient-purple-blue rounded-xl flex items-center justify-center mb-4">
                        <Icon name={s.icon} size={22} className="text-white" />
                      </div>
                      <div className="text-xs font-bold text-primary mb-1">Шаг {i + 1}</div>
                      <h3 className="font-bold mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.text}</p>
                    </CardContent>
                  </Card>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-10 -right-3 z-10 w-6 h-6 bg-white border rounded-full items-center justify-center shadow-sm">
                      <Icon name="ChevronRight" size={14} className="text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Права участника */}
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Права участника</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {rights.map((r, i) => (
                <Card key={i} className="hover:shadow-lg transition-all">
                  <CardContent className="pt-5 pb-5 flex gap-4">
                    <div className="w-11 h-11 gradient-purple-blue rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={r.icon} size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{r.title}</h3>
                      <p className="text-sm text-muted-foreground">{r.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Условия членства — подробно */}
          <Card className="mb-10">
            <CardContent className="pt-6 pb-6">
              <h2 className="text-2xl font-bold mb-6">Подробные условия</h2>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="BadgeRussianRuble" size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Паевой взнос</h3>
                    <p className="text-sm text-muted-foreground">Минимальный размер — 30 000 ₽. Размер может зависеть от активов организации. Допускается внесение частями. Взнос возвращается в полном объёме при выходе из кооператива.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 gradient-orange-pink rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Award" size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Права участников</h3>
                    <p className="text-sm text-muted-foreground">Каждый член кооператива имеет право на участие в управлении, получение финансирования и размещение свободных средств. Один участник — один голос, независимо от суммы взноса.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="BookOpen" size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Обязательства участников</h3>
                    <p className="text-sm text-muted-foreground">Соблюдать устав кооператива, получать ежегодную финансовую отчётность и участвовать в общих собраниях (личное присутствие не обязательно).</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3 items-start rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 px-4 py-3">
                <Icon name="ShieldCheck" size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-800 dark:text-emerald-200 leading-snug">
                  <span className="font-bold">Важно:</span> паевой взнос — это не безвозвратный платёж. При выходе из кооператива ваши средства возвращаются в полном объёме. Механизм закреплён уставом и регулируется{' '}
                  <a href="https://www.consultant.ru/document/cons_doc_LAW_89568/" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:text-emerald-900 transition-colors">
                    ФЗ №190-ФЗ «О кредитной кооперации»
                  </a>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center py-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">Готовы вступить?</h2>
            <p className="text-muted-foreground mb-6">Оставьте заявку — менеджер свяжется в течение рабочего дня</p>
            <MembershipForm>
              <Button size="lg" className="gradient-purple-blue text-white px-10">
                <Icon name="UserPlus" size={18} />
                Подать заявку
              </Button>
            </MembershipForm>
          </div>
        </div>
      </section>
    </Layout>
  );
}
