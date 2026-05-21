import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import AnimatedCounter from '@/components/AnimatedCounter';
import { Link } from 'react-router-dom';

const stats = [
  { value: 2016, label: 'Год основания', isYear: true },
  { value: 100, label: 'Активы фонда', suffix: '+ млн', decimals: 0 },
  { value: 50, label: 'Участников', suffix: '+', decimals: 0 },
  { value: 98, label: 'Удовлетворенность', suffix: '%', decimals: 0 }
];

export default function HeroSection() {
  return (
    <section className="pt-16 md:pt-20 pb-12 md:pb-20 px-4 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://cdn.poehali.dev/projects/1051bbab-a467-4b71-b050-32335ddce05d/bucket/934daf35-b6c9-41f2-b418-09e15fb1517a.png')" }}
      />
      <div className="absolute inset-0 bg-white/60" />
      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            Экосистема взаимной поддержки пайщиков:{' '}
            <span className="text-gradient">финансовая, товарная, услуговая, информационная</span>
          </h2>
          <p className="mb-6 md:mb-8 max-w-2xl mx-auto px-2">
            <span className="block text-lg sm:text-xl md:text-2xl font-bold text-gradient mb-2">
              Партнёрское объединение бизнеса в форме потребительского кооператива
            </span>
            <span className="block text-base sm:text-lg md:text-xl text-muted-foreground">Объединяем бизнес для взаимной поддержки — финансами, ресурсами, опытом. Правовая основа — ст. 123.2 ГК РФ.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Link to="/savings" className="w-full sm:w-auto">
              <Button size="lg" className="gradient-purple-blue text-white w-full">
                <Icon name="TrendingUp" size={20} />
                <span className="hidden sm:inline">Открыть паевой счёт</span>
                <span className="sm:hidden">Паевой счёт</span>
              </Button>
            </Link>
            <Link to="/loans" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-2 w-full">
                <Icon name="Wallet" size={20} />
                <span className="hidden sm:inline">Получить финансовую поддержку</span>
                <span className="sm:hidden">Поддержка</span>
              </Button>
            </Link>
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
                <div className="text-xs md:text-sm text-muted-foreground break-words hyphens-auto">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}