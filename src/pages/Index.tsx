import Layout from '@/components/Layout';
import HeroSection from '@/components/sections/HeroSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import MembershipForm from '@/components/MembershipForm';
import SEO from '@/components/SEO';

export default function Index() {
  return (
    <Layout>
      <SEO
        title="ФИН ФОРМУЛА — экосистема взаимной поддержки пайщиков"
        description="Потребительский кооператив поддержки бизнеса по ст. 123.2 ГК РФ. Взаимная поддержка пайщиков в Ростовской области и Краснодарском крае: финансовая, товарная, услуговая, информационная."
        path="/"
      />
      <HeroSection />

      {/* О фонде */}
      <section id="about" className="py-12 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              Альтернатива банку — внутри вашего бизнес-сообщества
            </h2>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              ФИН ФОРМУЛА — закрытый потребительский кооператив: пайщики вносят паевые взносы и получают взаимную поддержку. Правовая основа — ст. 123.2 ГК РФ.
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
                <p className="text-muted-foreground">Участники вносят паевые взносы и формируют общий фонд. Из этого фонда осуществляется поддержка других членов кооператива — быстро, выгодно и без бюрократических условий. Взнос возвращается при выходе в полном объёме.</p>
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
                <p className="text-muted-foreground">Пайщик получает доход от участия в паевом фонде. Получатель финансовой поддержки — средства на развитие бизнеса. Все управляют фондом на равных правах. Работаем с 2016 года, активы — более 50 млн рублей.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Где выгоднее развивать бизнес */}
      <ComparisonSection />

      {/* Два направления */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Два направления для вашего бизнеса</h2>
            <p className="text-muted-foreground">Выберите то, что актуально для вас сейчас</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Паевой счёт */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 group">
              <div className="h-2 gradient-purple-blue" />
              <CardContent className="pt-6 pb-6">
                <div className="w-14 h-14 gradient-purple-blue rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="TrendingUp" size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Открыть паевой счёт</h3>
                <p className="text-muted-foreground text-sm mb-5">
                  Доход пайщика от участия в паевом фонде кооператива. Расчёт дохода прозрачный, по правилам кооператива.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Доходность фонда — переменная, по итогам периода',
                    'Программа «Оборотный доход» с периодическим расчётом',
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
                    Подробнее о паевом счёте
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Финансовая поддержка */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 group">
              <div className="h-2 gradient-orange-pink" />
              <CardContent className="pt-6 pb-6">
                <div className="w-14 h-14 gradient-orange-pink rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon name="Wallet" size={26} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Получить финансовую поддержку</h3>
                <p className="text-muted-foreground text-sm mb-5">
                  Финансирование бизнеса без банковской бюрократии и ковенантов. Решение за 24 часа.
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Без залога для пайщиков кооператива',
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
                    Подробнее о поддержке
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
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Готовы стать пайщиком?</h2>
          <p className="text-muted-foreground mb-7">
            Паевой взнос от 30 000 ₽ возвращается при выходе. Работаем с 2016 года — более 100 млн рублей активов.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <MembershipForm source="Главная страница — кнопка «Стать пайщиком»">
              <Button size="lg" className="gradient-purple-blue text-white px-8">
                <Icon name="UserPlus" size={18} />
                Стать пайщиком
              </Button>
            </MembershipForm>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Узнать больше о кооперативе
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}