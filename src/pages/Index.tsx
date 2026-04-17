import Layout from '@/components/Layout';
import HeroSection from '@/components/sections/HeroSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import MembershipForm from '@/components/MembershipForm';

export default function Index() {
  return (
    <Layout>
      <HeroSection />

      {/* О фонде */}
      <section id="about" className="py-12 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              Альтернатива банку — внутри вашего бизнес-сообщества
            </h2>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              КПК «ФИН ФОРМУЛА» — закрытый кооператив юридических лиц: одни участники размещают свободные средства под доходность выше рынка, другие получают финансирование без залогов и бюрократии
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 gradient-purple-blue rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Building2" size={24} className="text-white" />
                </div>
                <CardTitle>Как это работает?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Участники вносят паевые взносы и формируют общий фонд. Из этого фонда выдаётся финансирование другим членам кооператива — быстро, без залогов и банковских условий. Взнос возвращается при выходе в полном объёме.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 gradient-orange-pink rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Target" size={24} className="text-white" />
                </div>
                <CardTitle>Почему это выгодно?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Инвестор получает доходность выше банка без риска внешнего рынка. Заёмщик — деньги на развитие без залога и за 24 часа. Оба управляют фондом на равных правах. Работаем с 2016 года, активы — более 100 млн рублей.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Два направления */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Два направления для вашего бизнеса</h2>
            <p className="text-muted-foreground">Выберите то, что актуально для вас сейчас</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Сбережения */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 group">
              <div className="h-2 gradient-purple-blue" />
              <CardContent className="pt-6 pb-6">
                <div className="w-14 h-14 gradient-purple-blue rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="TrendingUp" size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Разместить средства</h3>
                <p className="text-muted-foreground text-sm mb-5">
                  Получайте стабильный доход выше банковских депозитов. Ставка привязана к ключевой ЦБ — прозрачно и честно.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Сберегательная: КС ЦБ + до 3%',
                    'Оборотный доход: 14% годовых',
                    'Выплата ежемесячно или в конце срока',
                  ].map((t, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Icon name="CheckCircle" size={15} className="text-primary flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Link to="/savings">
                  <Button className="w-full gradient-purple-blue text-white">
                    Подробнее о сбережениях
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Займы */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 group">
              <div className="h-2 gradient-orange-pink" />
              <CardContent className="pt-6 pb-6">
                <div className="w-14 h-14 gradient-orange-pink rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="Wallet" size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Получить финансирование</h3>
                <p className="text-muted-foreground text-sm mb-5">
                  Деньги на бизнес без банковской бюрократии, залогов и ковенантов. Решение за 24 часа.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Без залога для членов кооператива',
                    'Решение за 24 часа',
                    'Гибкий индивидуальный график',
                  ].map((t, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Icon name="CheckCircle" size={15} className="text-orange-500 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
                <Link to="/loans">
                  <Button className="w-full gradient-orange-pink text-white">
                    Подробнее о займах
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA вступить */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Готовы стать участником?</h2>
          <p className="text-muted-foreground mb-7">
            Паевой взнос от 30 000 ₽ возвращается при выходе. Работаем с 2016 года — более 100 млн рублей активов.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <MembershipForm>
              <Button size="lg" className="gradient-purple-blue text-white px-8">
                <Icon name="UserPlus" size={18} />
                Стать членом кооператива
              </Button>
            </MembershipForm>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Узнать больше о фонде
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
