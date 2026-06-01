import Layout from '@/components/Layout';
import MembershipForm from '@/components/MembershipForm';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import SEO from '@/components/SEO';

const steps = [
  { icon: 'Send', title: 'Оставить заявку', text: 'Заполните форму на сайте — укажите ИНН и контакт. Данные о компании подгрузятся автоматически из реестра.' },
  { icon: 'Phone', title: 'Консультация', text: 'Менеджер свяжется в течение рабочего дня, ответит на вопросы и расскажет об условиях.' },
  { icon: 'FileSignature', title: 'Подписать документы', text: 'Заключить договор о вступлении, внести вступительный взнос 2 500 ₽ и паевой взнос.' },
  { icon: 'CheckCircle', title: 'Стать пайщиком', text: 'Получить доступ к паевому фонду, финансовой поддержке и управлению кооперативом.' },
];

const rights = [
  { icon: 'TrendingUp', title: 'Вносить паевые взносы', text: 'Доход пайщика от участия в паевом фонде по прозрачным правилам' },
  { icon: 'Wallet', title: 'Получать финансовую поддержку', text: 'Без залога и банковской бюрократии — за 24 часа' },
  { icon: 'Vote', title: 'Участвовать в управлении', text: 'Один голос независимо от размера паевого взноса' },
  { icon: 'FileText', title: 'Получать отчётность', text: 'Полная прозрачность деятельности кооператива' },
];

export default function Membership() {
  return (
    <Layout>
      <SEO
        title="Членство для бизнеса — ФИН ФОРМУЛА"
        description="Условия вступления в потребительский кооператив для ЮЛ и ИП. Паевой взнос возвращается при выходе. Доступ к паевому фонду и финансовой поддержке на условиях кооператива."
        path="/membership"
        breadcrumbs={[
          { name: 'Главная', path: '/' },
          { name: 'Членство для бизнеса', path: '/membership' },
        ]}
      />
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
            Потребительский кооператив для бизнеса — равные права у всех пайщиков. Паевой взнос возвращается при выходе в полном объёме.
          </p>
          <MembershipForm source="Страница «Членство» — кнопка «Подать заявку на членство» (Hero)">
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
              { value: '2 500 ₽', label: 'Вступительный взнос' },
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

          {/* Взносы */}
          <Card className="mb-14">
            <CardContent className="pt-5">
              <div className="text-center text-base font-bold text-primary uppercase tracking-wide mb-4">Условия вступления</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Вступительный взнос</div>
                  <div className="text-xl font-bold">2 500 ₽</div>
                  <div className="text-xs text-muted-foreground">единоразово</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Паевой взнос</div>
                  <div className="text-xl font-bold">30–80 тыс. ₽</div>
                  <div className="text-xs text-muted-foreground">возвращается при выходе · рассрочка 3–6 мес.</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Членский взнос</div>
                  <div className="text-xl font-bold">6 000 / 18 000 / 36 000 ₽ / год</div>
                  <div className="text-xs text-muted-foreground">в зависимости от масштабов вашего бизнеса и потребностей</div>
                </div>
              </div>
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-2">
                <Icon name="Info" size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-900">Паевой взнос — это не расходы. Это возвратный капитал, который формирует фонд взаимопомощи и возвращается в полном объёме при выходе из кооператива.</p>
              </div>
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
                <Icon name="CalendarClock" size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-amber-900">Членский взнос уплачивается только со <strong>второго года</strong> членства в кооперативе. В первый год — вступительный и паевой взносы.</p>
              </div>
            </CardContent>
          </Card>

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
                    <p className="text-sm text-muted-foreground">Размер определяется индивидуально в зависимости от масштабов бизнеса. Допускается внесение частями. Взнос возвращается в полном объёме при выходе из кооператива.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 gradient-orange-pink rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Award" size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Права участников</h3>
                    <p className="text-sm text-muted-foreground">Каждый пайщик имеет право на участие в управлении, получение финансовой поддержки и участие в паевом фонде. Один пайщик — один голос, независимо от суммы паевого взноса.</p>
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
                  <span className="font-bold">Важно:</span> паевой взнос — это не безвозвратный платёж. При выходе из кооператива ваши средства возвращаются в полном объёме. Правовая основа — ст. 123.2 ГК РФ.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center py-8 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-2xl">
            <h2 className="text-2xl font-bold mb-3">Готовы вступить?</h2>
            <p className="text-muted-foreground mb-6">Оставьте заявку — менеджер свяжется в течение рабочего дня</p>
            <MembershipForm source="Страница «Членство» — кнопка «Подать заявку» (нижний блок)">
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