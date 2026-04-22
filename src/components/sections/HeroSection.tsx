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
            Экосистема взаимного финансирования: от доходных инвестиций до{' '}
            <span className="text-gradient">беззалоговых займов</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto px-2">Закрытый кооператив юридических лиц: размещайте свободные средства под Ключевую ставку + 3% или получайте финансирование для бизнеса за 24 часа без банковской бюрократии</p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Link to="/savings" className="w-full sm:w-auto">
              <Button size="lg" className="gradient-purple-blue text-white w-full">
                <Icon name="TrendingUp" size={20} />
                <span className="hidden sm:inline">Разместить средства</span>
                <span className="sm:hidden">Разместить</span>
              </Button>
            </Link>
            <Link to="/loans" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="border-2 w-full">
                <Icon name="Wallet" size={20} />
                <span className="hidden sm:inline">Получить финансирование</span>
                <span className="sm:hidden">Финансирование</span>
              </Button>
            </Link>
          </div>

          {/* Знаки доверия — реестры */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6 px-4">
            <a
              href="https://cbr.ru/finorg/foinfo/?ogrn=1163668081895"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border-2 border-emerald-200 hover:border-emerald-400 rounded-xl px-5 py-3.5 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img
                  src="https://cbr.ru/favicon.ico"
                  alt="ЦБ РФ"
                  className="w-7 h-7 object-contain"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    el.parentElement!.innerHTML = '<span class="text-emerald-700 font-black text-xs">ЦБ</span>';
                  }}
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <Icon name="BadgeCheck" size={14} className="text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">Включены в реестр</span>
                </div>
                <div className="text-sm font-bold text-foreground group-hover:text-emerald-700 transition-colors">Банка России (ЦБ РФ)</div>
              </div>
              <Icon name="ExternalLink" size={14} className="text-muted-foreground ml-auto flex-shrink-0" />
            </a>

            <a
              href="https://coopfin.ru/cpage/8034"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border-2 border-blue-200 hover:border-blue-400 rounded-xl px-5 py-3.5 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img
                  src="https://coopfin.ru/img/favicon.ico"
                  alt="СРО"
                  className="w-7 h-7 object-contain"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    el.parentElement!.innerHTML = '<span class="text-blue-700 font-black text-xs">СРО</span>';
                  }}
                />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <Icon name="BadgeCheck" size={14} className="text-blue-600 flex-shrink-0" />
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Включены в реестр</span>
                </div>
                <div className="text-sm font-bold text-foreground group-hover:text-blue-700 transition-colors">СРО «Кооперативные Финансы»</div>
              </div>
              <Icon name="ExternalLink" size={14} className="text-muted-foreground ml-auto flex-shrink-0" />
            </a>
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