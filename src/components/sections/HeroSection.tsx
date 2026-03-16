import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import AnimatedCounter from '@/components/AnimatedCounter';

const stats = [
  { value: 2016, label: 'Работаем с', isYear: true },
  { value: 100, label: 'Активы фонда, млн ₽', suffix: '+', decimals: 0 },
  { value: 50, label: 'Участников-юрлиц', suffix: '+', decimals: 0 },
  { value: 24, label: 'Решение за, часа', suffix: '', decimals: 0 }
];

export default function HeroSection() {
  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-purple-blue opacity-5"></div>
      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            Доход выше банка —{' '}
            <span className="text-gradient">финансирование без залога</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            Закрытый кооператив юридических лиц: размещайте свободные средства под Ключевую ставку&nbsp;+&nbsp;2% или получайте финансирование на бизнес за 24 часа — без банковской бюрократии
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Button size="lg" className="gradient-purple-blue text-white w-full sm:w-auto" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="TrendingUp" size={20} />
              <span className="hidden sm:inline">Разместить средства</span>
              <span className="sm:hidden">Разместить</span>
            </Button>
            <Button size="lg" variant="outline" className="border-2 w-full sm:w-auto" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
              <Icon name="Wallet" size={20} />
              <span className="hidden sm:inline">Получить финансирование</span>
              <span className="sm:hidden">Финансирование</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-8 md:mt-16 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <Card key={idx} className="text-center animate-scale-in hover:shadow-lg transition-shadow" style={{ animationDelay: `${idx * 0.1}s` }}>
              <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
                <div className="text-2xl md:text-3xl font-bold text-gradient mb-1 md:mb-2">
                  {stat.isYear ? (
                    stat.value
                  ) : (
                    <AnimatedCounter 
                      end={stat.value} 
                      suffix={stat.suffix || ''} 
                      decimals={stat.decimals || 0} 
                    />
                  )}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}