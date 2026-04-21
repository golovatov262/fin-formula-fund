import Layout from '@/components/Layout';
import AdvantagesAndMembership from '@/components/sections/AdvantagesAndMembership';
import DocumentsSection from '@/components/sections/DocumentsSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import TestimonialsAndContact from '@/components/sections/TestimonialsAndContact';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Icon name="Building2" size={15} />
            О фонде
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            КПК «ФИН ФОРМУЛА» — <span className="text-gradient">кооператив юридических лиц</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Работаем с 2016 года. Объединяем компании, которые размещают свободные средства и получают финансирование — без банковской бюрократии и на равных правах
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/savings">
              <Button className="gradient-purple-blue text-white">
                <Icon name="TrendingUp" size={16} />
                Разместить средства
              </Button>
            </Link>
            <Link to="/loans">
              <Button variant="outline">
                <Icon name="Wallet" size={16} />
                Получить финансирование
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