import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import MembershipForm from './MembershipForm';

const aboutSubmenu = [
  { label: 'Преимущества', href: '/about', icon: 'Star' },
  { label: 'Документы', href: '/about#documents', icon: 'FileText' },
  { label: 'КПК vs Банк', href: '/about#comparison', icon: 'BarChart2' },
  { label: 'FAQ', href: '/about#faq', icon: 'HelpCircle' },
  { label: 'Контакты', href: '/about#contact', icon: 'Phone' },
];

const navItems = [
  { label: 'О фонде', href: '/about', icon: 'Building2', submenu: aboutSubmenu },
  { label: 'Сбережения', href: '/savings', icon: 'TrendingUp', submenu: null },
  { label: 'Займы', href: '/loans', icon: 'Wallet', submenu: null },
  { label: 'Членство', href: '/membership', icon: 'Users', submenu: null },
  { label: 'Стать агентом', href: '/agent', icon: 'Handshake', submenu: null },
];

function scrollToAnchor(hash: string) {
  if (!hash) return;
  setTimeout(() => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.hash) {
      scrollToAnchor(location.hash);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = (href: string) => {
    const path = href.split('#')[0];
    return location.pathname === path;
  };

  const handleNavLink = (href: string) => {
    setOpenDropdown(null);
    const [path, hash] = href.split('#');
    if (location.pathname === path && hash) {
      scrollToAnchor('#' + hash);
    }
  };

  const handleMobileLink = (href: string) => {
    setMobileOpen(false);
    const [, hash] = href.split('#');
    if (hash) setTimeout(() => scrollToAnchor('#' + hash), 350);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b shadow-sm">
        {/* Верхняя строка — контакты (только десктоп) */}
        <div className="hidden md:block border-b border-border/50 bg-muted/20">
          <div className="container mx-auto px-4 py-1.5 flex justify-end items-center">
            <a href="tel:88003023182" className="flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors">
              <Icon name="Phone" size={14} className="text-primary" />
              8 (800) 302-31-82
            </a>
          </div>
        </div>

        {/* Основная строка — лого + навигация + кнопки */}
        <div className="container mx-auto px-4 py-2.5 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 gradient-purple-blue rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ФФ</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold leading-tight">КПК «ФИН ФОРМУЛА»</div>
              <div className="text-xs text-muted-foreground">Фонд финансирования бизнеса</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.href} className="relative">
                {item.submenu ? (
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive(item.href) ? 'text-primary bg-primary/10' : 'text-foreground hover:text-primary hover:bg-primary/5'}`}
                  >
                    {item.label}
                    <Icon name="ChevronDown" size={13} className={`transition-transform ${openDropdown === item.href ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => handleNavLink(item.href)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive(item.href) ? 'text-primary bg-primary/10' : 'text-foreground hover:text-primary hover:bg-primary/5'}`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown */}
                {item.submenu && openDropdown === item.href && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border py-1.5 z-50">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        onClick={() => handleNavLink(sub.href)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-primary/5 hover:text-primary transition-colors"
                      >
                        <Icon name={sub.icon} size={15} className="text-muted-foreground" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Правый блок кнопок */}
          <div className="flex items-center gap-2">
            <a href="https://mykpk.ru" target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex">
              <Button size="sm" variant="outline" className="text-xs px-3">
                <Icon name="LogIn" size={14} />
                Личный кабинет
              </Button>
            </a>
            <a
              href="https://max.ru/u/f9LHodD0cOKlhlHdQBcCTxnF2xJzOrOZrDbcKvHWJZ8kAoLbEol6TCNeJOc"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex"
            >
              <Button size="sm" className="gradient-purple-blue text-white text-xs px-3">
                <img src="https://max.ru/favicon.ico" alt="MAX" className="w-3.5 h-3.5 rounded-sm" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
                Консультация в MAX
              </Button>
            </a>

            {/* Mobile burger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Icon name="Menu" size={22} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
                <SheetHeader className="px-5 pt-5 pb-4 border-b">
                  <SheetTitle className="flex items-center gap-3">
                    <div className="w-9 h-9 gradient-purple-blue rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">ФФ</span>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">КПК «ФИН ФОРМУЛА»</div>
                      <div className="text-xs text-muted-foreground font-normal">Меню навигации</div>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <nav className="px-3 py-3">
                  {navItems.map((item) => (
                    <div key={item.href}>
                      {item.submenu ? (
                        <>
                          <button
                            onClick={() => setMobileAccordion(mobileAccordion === item.href ? null : item.href)}
                            className="w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Icon name={item.icon} size={16} className="text-primary" />
                              </div>
                              <span className="font-medium text-sm">{item.label}</span>
                            </div>
                            <Icon name="ChevronDown" size={14} className={`text-muted-foreground transition-transform ${mobileAccordion === item.href ? 'rotate-180' : ''}`} />
                          </button>

                          {mobileAccordion === item.href && (
                            <div className="ml-11 mb-1 space-y-0.5">
                              {item.submenu.map((sub) => (
                                <Link
                                  key={sub.href}
                                  to={sub.href}
                                  onClick={() => handleMobileLink(sub.href)}
                                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm hover:bg-muted hover:text-primary transition-colors text-muted-foreground"
                                >
                                  <Icon name={sub.icon} size={14} />
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors
                            ${isActive(item.href) ? 'text-primary bg-primary/5' : ''}`}
                        >
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon name={item.icon} size={16} className="text-primary" />
                          </div>
                          <span className="font-medium text-sm">{item.label}</span>
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>

                <div className="px-5 pt-3 border-t space-y-2">
                  <MembershipForm source="Мобильное меню — кнопка «Получить консультацию»">
                    <Button className="w-full gradient-purple-blue text-white" size="lg">
                      <Icon name="MessageCircle" size={18} />
                      Получить консультацию
                    </Button>
                  </MembershipForm>
                  <a href="https://mykpk.ru" target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full" variant="outline" size="lg">
                      <Icon name="LogIn" size={18} />
                      Личный кабинет
                    </Button>
                  </a>
                </div>

                <div className="px-5 mt-4 space-y-2.5">
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">Контакты</div>
                  <a href="tel:88003023182" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Icon name="Phone" size={14} className="text-primary" />
                    <span>8 (800) 302-31-82</span>
                  </a>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Mail" size={14} className="text-primary" />
                    <span>ff@sll-expert.ru</span>
                  </div>
                  <a
                    href="https://max.ru/u/f9LHodD0cOKlhlHdQBcCTxnF2xJzOrOZrDbcKvHWJZ8kAoLbEol6TCNeJOc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                  >
                    <img src="https://max.ru/favicon.ico" alt="MAX" className="w-4 h-4 rounded-sm" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
                    <span>Написать в MAX</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16 md:pt-24">
        {children}
      </main>

      <footer className="border-t bg-muted/30 py-8 px-4 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 gradient-purple-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">ФФ</span>
              </div>
              <div>
                <div className="font-bold text-sm">КПК «ФИН ФОРМУЛА»</div>
                <div className="text-xs text-muted-foreground">Фонд финансирования бизнеса</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href} className="hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="tel:88003023182" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Icon name="Phone" size={14} className="text-primary flex-shrink-0" />
                8 (800) 302-31-82
              </a>
              <a href="mailto:ff@sll-expert.ru" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Icon name="Mail" size={14} className="text-primary flex-shrink-0" />
                ff@sll-expert.ru
              </a>
              <a
                href="https://max.ru/u/f9LHodD0cOKlhlHdQBcCTxnF2xJzOrOZrDbcKvHWJZ8kAoLbEol6TCNeJOc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <img src="https://max.ru/favicon.ico" alt="MAX" className="w-4 h-4 rounded-sm" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
                Написать в MAX
              </a>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} КПК «ФИН ФОРМУЛА». Деятельность регулируется ФЗ №190-ФЗ «О кредитной кооперации».
          </div>
        </div>
      </footer>
    </div>
  );
}