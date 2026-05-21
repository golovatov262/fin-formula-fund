import Layout from '@/components/Layout';
import AdvantagesAndMembership from '@/components/sections/AdvantagesAndMembership';
import DocumentsSection from '@/components/sections/DocumentsSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import TestimonialsAndContact from '@/components/sections/TestimonialsAndContact';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import SEO from '@/components/SEO';

export default function About() {
  return (
    <Layout>
      <SEO
        title="О кооперативе ФИН ФОРМУЛА — преимущества, документы, FAQ"
        description="О потребительском кооперативе ФИН ФОРМУЛА: документы, сравнение с банком, ответы на частые вопросы и контакты. Работаем в Ростовской области и Краснодарском крае. Правовая основа — ст. 123.2 ГК РФ."
        path="/about"
        breadcrumbs={[
          { name: 'Главная', path: '/' },
          { name: 'О фонде', path: '/about' },
        ]}
      />
      {/* Hero */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Icon name="Building2" size={15} />
            О кооперативе
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            ФИН ФОРМУЛА — <span className="text-gradient">потребительский кооператив поддержки бизнеса</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Работаем с 2016 года. Объединяем компании для взаимной поддержки — финансовой, товарной, услуговой, информационной. Правовая основа — ст. 123.2 ГК РФ.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/savings">
              <Button className="gradient-purple-blue text-white">
                <Icon name="TrendingUp" size={16} />
                Открыть паевой счёт
              </Button>
            </Link>
            <Link to="/loans">
              <Button variant="outline">
                <Icon name="Wallet" size={16} />
                Получить финансовую поддержку
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Якорные разделы */}
      <AdvantagesAndMembership />
      <DocumentsSection />
      <ComparisonSection />
      <TestimonialsAndContact />
    </Layout>
  );
}