import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const investorAdvantages = [
  { icon: 'Percent', title: 'Доходность фонда', text: 'Переменная, по итогам периода. Прозрачные правила расчёта дохода пайщика — не произвольные' },
  { icon: 'ShieldCheck', title: 'Защищённость капитала', text: 'Средства работают внутри кооператива среди проверенных пайщиков, а не уходят на внешний рынок' },
  { icon: 'CalendarDays', title: 'Гибкие сроки участия в паевом фонде', text: 'От 3 месяцев до 3 лет — выбирайте горизонт под свои задачи' },
];

const borrowerAdvantages = [
  { icon: 'Zap', title: 'Решение за 24 часа', text: 'Без затяжных банковских процедур — ответ по заявке на следующий рабочий день' },
  { icon: 'Ban', title: 'Без залога', text: 'Для пайщиков кооператива финансовая поддержка доступна без обеспечения — главное отличие от банков' },
  { icon: 'Shield', title: 'Без банковских ковенантов', text: 'Никаких жёстких ограничений на деятельность компании, обязательных оборотов по счёту и навязанных продуктов' },
];

const governanceAdvantages = [
  { icon: 'Vote', title: 'Один пайщик — один голос', text: 'Независимо от размера паевого взноса каждый пайщик имеет равный голос на собрании' },
  { icon: 'Settings', title: 'Влияние на политику фонда', text: 'Пайщики участвуют в утверждении правил финансовой поддержки и доходности фонда' },
  { icon: 'Users', title: 'Закрытый клуб партнёров', text: 'Деловая среда среди пайщиков — без случайных участников' },
];

export default function AdvantagesAndMembership() {
  return (
    <>
      <section id="advantages" className="py-12 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Преимущества фонда</h2>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              Конкретные выгоды для вашего бизнеса — в зависимости от роли в кооперативе
            </p>
          </div>

          <div className="space-y-10 md:space-y-14">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 gradient-purple-blue rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="TrendingUp" size={18} className="text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Для пайщиков</h3>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {investorAdvantages.map((adv, idx) => (
                  <Card key={idx} className="hover:shadow-xl transition-all hover:-translate-y-1 group">
                    <CardContent className="pt-5 md:pt-6 pb-5">
                      <div className="w-11 h-11 gradient-purple-blue rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon name={adv.icon as string} size={20} className="text-white" />
                      </div>
                      <h4 className="text-base md:text-lg font-bold mb-1.5">{adv.title}</h4>
                      <p className="text-sm text-muted-foreground">{adv.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 gradient-orange-pink rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Banknote" size={18} className="text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Для получателей финансовой поддержки</h3>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {borrowerAdvantages.map((adv, idx) => (
                  <Card key={idx} className="hover:shadow-xl transition-all hover:-translate-y-1 group">
                    <CardContent className="pt-5 md:pt-6 pb-5">
                      <div className="w-11 h-11 gradient-orange-pink rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon name={adv.icon as string} size={20} className="text-white" />
                      </div>
                      <h4 className="text-base md:text-lg font-bold mb-1.5">{adv.title}</h4>
                      <p className="text-sm text-muted-foreground">{adv.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Crown" size={18} className="text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold">Участие в управлении</h3>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {governanceAdvantages.map((adv, idx) => (
                  <Card key={idx} className="hover:shadow-xl transition-all hover:-translate-y-1 group">
                    <CardContent className="pt-5 md:pt-6 pb-5">
                      <div className="w-11 h-11 bg-slate-700 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Icon name={adv.icon as string} size={20} className="text-white" />
                      </div>
                      <h4 className="text-base md:text-lg font-bold mb-1.5">{adv.title}</h4>
                      <p className="text-sm text-muted-foreground">{adv.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
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
                      Каждый пайщик имеет право на участие в управлении фондом, получение финансовой поддержки на развитие бизнеса и участие в паевом фонде на условиях кооператива.
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