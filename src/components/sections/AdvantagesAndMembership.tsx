import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const advantages = [
  { icon: 'Users', title: 'Объединение юр. лиц', text: 'Формирование фонда за счет паевых взносов участников' },
  { icon: 'Shield', title: 'Независимость', text: 'Финансирование без условий и ограничений банков' },
  { icon: 'Percent', title: 'Выгодные ставки', text: 'Доходность выше банковских депозитов' },
  { icon: 'Vote', title: 'Участие в управлении', text: 'Каждый член может влиять на решения фонда' },
  { icon: 'FileText', title: 'Прозрачность', text: 'Полная отчетность и открытость операций' },
  { icon: 'Zap', title: 'Быстрые решения', text: 'Оперативное рассмотрение заявок' }
];

export default function AdvantagesAndMembership() {
  return (
    <>
      <section id="advantages" className="py-12 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Преимущества фонда</h2>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              Почему стоит выбрать КПК "ФИН ФОРМУЛА"
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
            {advantages.map((adv, idx) => (
              <Card key={idx} className="text-center hover:shadow-xl transition-all hover:-translate-y-1 group">
                <CardContent className="pt-6 md:pt-8 pb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 gradient-purple-blue rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                    <Icon name={adv.icon as string} size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{adv.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground">{adv.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="membership" className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Условия членства</h2>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              Присоединяйтесь к сообществу активных предпринимателей
            </p>
          </div>

          <Card className="hover:shadow-2xl transition-shadow">
            <CardContent className="pt-6 md:pt-8">
              <div className="space-y-4 md:space-y-6">
                <div className="flex gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="UserPlus" size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Как стать членом</h3>
                    <p className="text-sm md:text-base text-muted-foreground">Для вступления в кооператив необходимо внести паевой взнос, который формирует фонд финансирования. Размер взноса зависит от активов организации, его минимальная величина составляет 30 000 руб. Внесение допускается частями.</p>
                    <div className="mt-3 flex gap-2 items-start rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                      <Icon name="ShieldCheck" size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-emerald-800 font-medium leading-snug"><span className="font-bold">Важно:</span> ваши средства возвращаются при выходе из кооператива — паевой взнос не является безвозвратным платежом или взносом в уставный капитал.</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 gradient-orange-pink rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Award" size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Права участников</h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Каждый член кооператива имеет право на участие в управлении фондом, получение финансирования на развитие бизнеса и размещение свободных средств под выгодные проценты.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Shield" size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Гарантии стабильности</h3>
                    <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        Работаем с 2016 года
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        Активы фонда более 100 млн рублей
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" size={18} className="text-primary" />
                        Более 50 активных участников
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}