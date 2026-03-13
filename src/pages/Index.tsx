import { Button } from '@/components/ui/button';
import MembershipForm from '@/components/MembershipForm';
import MobileMenu from '@/components/MobileMenu';
import HeroSection from '@/components/sections/HeroSection';
import AboutAndServices from '@/components/sections/AboutAndServices';
import AdvantagesAndMembership from '@/components/sections/AdvantagesAndMembership';
import TestimonialsAndContact from '@/components/sections/TestimonialsAndContact';
import DocumentsSection from '@/components/sections/DocumentsSection';

export default function Index() {
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ФФ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">КПК "ФИН ФОРМУЛА"</h1>
              <p className="text-xs text-muted-foreground">Фонд финансирования бизнеса</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О фонде</a>
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Услуги</a>
            <a href="#advantages" className="text-sm font-medium hover:text-primary transition-colors">Преимущества</a>
            <a href="#membership" className="text-sm font-medium hover:text-primary transition-colors">Членство</a>
            <a href="#documents" className="text-sm font-medium hover:text-primary transition-colors">Документы</a>
            <a href="#faq" className="text-sm font-medium hover:text-primary transition-colors">FAQ</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center gap-2">
            <MembershipForm>
              <Button className="gradient-purple-blue text-white hidden md:flex">
                Стать членом
              </Button>
            </MembershipForm>
            <MobileMenu />
          </div>
        </div>
      </header>

      <HeroSection />
      <AboutAndServices />
      <AdvantagesAndMembership />
      <DocumentsSection />
      <TestimonialsAndContact />
    </div>
  );
}