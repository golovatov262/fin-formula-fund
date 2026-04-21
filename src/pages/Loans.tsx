import Layout from '@/components/Layout';
import LoanCalculator from '@/components/LoanCalculator';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import MembershipForm from '@/components/MembershipForm';

const advantages = [
  { icon: 'Zap', title: 'Решение за 24 часа', text: 'Ответ по заявке на следующий рабочий день после подачи документов' },
  { icon: 'Ban', title: 'Без залога', text: 'Для членов кооператива финансирование доступно без обеспечения' },
  { icon: 'Shield', title: 'Без ковенантов', text: 'Никаких ограничений на деятельность компании и обязательных оборотов' },
  { icon: 'Users', title: 'Для любого бизнеса', text: 'Работаем с компаниями от 6 месяцев, которым отказывают банки' },
  { icon: 'Target', title: 'Свобода использования', text: 'Никаких ограничений на цели — направляйте средства туда, где нужно' },
  { icon: 'CalendarClock', title: 'Гибкий график', text: 'Учитываем сезонность бизнеса и кассовые разрывы' },
];

const requirements = [
  'Юридическое лицо или ИП',
  'Деятельность от 6 месяцев',
  'Членство в кооперативе',
  'Базовый пакет документов',
];

export default function Loans() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-orange-50/60 to-transparent dark:from-orange-950/10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Icon name="Wallet" size={15} />
            Займы
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Финансирование бизнеса <span className="text-gradient">без банковской бюрократии</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Деньги на развитие бизнеса без залогов, ковенантов и долгих проверок. Решение за 24 часа — для членов кооператива
          </p>
          <MembershipForm source="Страница «Займы» — кнопка «Получить финансирование» (Hero)">
            <Button size="lg" className="gradient-orange-pink text-white px-10">
              <Icon name="Zap" size={18} />
              Получить финансирование
            </Button>
          </MembershipForm>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-10 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Почему выбирают нас</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {advantages.map((a, i) => (
              <Card key={i} className="hover:shadow-lg transition-all hover:-translate-y-1 group">
                <CardContent className="pt-5 pb-5">
                  <div className="w-11 h-11 gradient-orange-pink rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon name={a.icon} size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold mb-1.5">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">{a.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Условия + Требования */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 gradient-orange-pink rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Условия финансирования</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Сумма</span>
                    <span className="font-semibold">от 50 000 до 10 000 000 ₽</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Срок</span>
                    <span className="font-semibold">от 1 до 60 месяцев</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Ставка</span>
                    <span className="font-semibold">Ключевая ЦБ + 10%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Залог</span>
                    <span className="font-semibold text-emerald-600">Не требуется</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Решение</span>
                    <span className="font-semibold">24 часа</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">График платежей</span>
                    <span className="font-semibold">Индивидуальный</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center">
                    <Icon name="ClipboardList" size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Требования к заёмщику</h3>
                </div>
                <ul className="space-y-3">
                  {requirements.map((r, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={13} className="text-emerald-600" />
                      </div>
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex gap-2">
                    <Icon name="Info" size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-900 dark:text-amber-100">
                      Условия финансирования обсуждаются индивидуально. Для членов кооператива предусмотрены льготные условия.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Калькулятор */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Рассчитайте стоимость займа</h2>
            <LoanCalculator />
          </div>

          {/* Как получить */}
          <div className="bg-muted/30 rounded-2xl p-6 md:p-10 mb-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Как получить финансирование</h2>
            <div className="grid sm:grid-cols-4 gap-5">
              {[
                { step: '1', icon: 'UserPlus', title: 'Вступить в КПК', text: 'Внести паевой взнос от 30 000 ₽' },
                { step: '2', icon: 'Send', title: 'Подать заявку', text: 'Заполнить форму и предоставить базовые документы' },
                { step: '3', icon: 'CheckCircle', title: 'Получить решение', text: 'В течение 1 рабочего дня' },
                { step: '4', icon: 'Banknote', title: 'Получить деньги', text: 'На расчётный счёт компании' },
              ].map((s) => (
                <div key={s.step} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 gradient-orange-pink rounded-2xl flex items-center justify-center mb-3">
                    <Icon name={s.icon} size={22} className="text-white" />
                  </div>
                  <div className="text-xs font-bold text-orange-500 mb-1">Шаг {s.step}</div>
                  <div className="font-bold text-sm mb-1">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <MembershipForm source="Страница «Займы» — кнопка «Оставить заявку» (нижний блок)">
              <Button size="lg" className="gradient-orange-pink text-white px-10">
                <Icon name="Zap" size={18} />
                Оставить заявку
              </Button>
            </MembershipForm>
          </div>
        </div>
      </section>
    </Layout>
  );
}