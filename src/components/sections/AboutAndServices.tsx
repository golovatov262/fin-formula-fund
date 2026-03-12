import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Calculator from '@/components/Calculator';
import LoanCalculator from '@/components/LoanCalculator';

const services = [
  {
    icon: 'TrendingUp',
    title: 'Разместить средства',
    description: 'Получайте доход выше банковских депозитов при размещении свободных денежных средств',
    features: ['Высокие ставки', 'Прозрачность условий', 'Гибкие сроки'],
    gradient: 'gradient-purple-blue'
  },
  {
    icon: 'Wallet',
    title: 'Получить финансирование',
    description: 'Финансирование бизнеса без зависимости от банковских кредитов и их условий',
    features: ['Быстрое решение', 'Лояльные условия', 'Без залогов'],
    gradient: 'gradient-orange-pink'
  }
];

export default function AboutAndServices() {
  return (
    <>
      <section id="about" className="py-12 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">О фонде</h2>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              Мы создаем условия для роста вашего бизнеса через взаимное финансирование
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 gradient-purple-blue rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Building2" size={24} className="text-white" />
                </div>
                <CardTitle>Что такое КПК?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Кредитный потребительский кооператив — это объединение юридических лиц, которые формируют фонд за счет паевых взносов. Члены кооператива могут получать финансирование на развитие бизнеса без зависимости от банковских условий.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 gradient-orange-pink rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Target" size={24} className="text-white" />
                </div>
                <CardTitle>Наша миссия</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Обеспечить доступное финансирование для развития бизнеса и создать выгодные условия для размещения свободных средств участников с гарантией прозрачности и надежности.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Наши услуги</h2>
            <p className="text-base md:text-lg text-muted-foreground px-4">
              Два направления для роста вашего бизнеса
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto mb-8 md:mb-16">
            {services.map((service, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className={`h-2 ${service.gradient}`}></div>
                <CardHeader>
                  <div className={`w-12 h-12 md:w-16 md:h-16 ${service.gradient} rounded-2xl flex items-center justify-center mb-3 md:mb-4 animate-float`}>
                    <Icon name={service.icon as string} size={24} className="text-white md:w-8 md:h-8" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl">{service.title}</CardTitle>
                  <CardDescription className="text-sm md:text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 md:space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Icon name="CheckCircle2" size={18} className="text-primary" />
                        <span className="text-sm md:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full mt-4 md:mt-6 ${service.gradient} text-white`} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
            <Calculator />
            <LoanCalculator />
          </div>
        </div>
      </section>
    </>
  );
}