import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import IndividualApplicationForm from '@/components/IndividualApplicationForm';

const eligibility = [
  { icon: 'User', title: 'Возраст от 18 лет', text: 'Полная дееспособность на момент подачи заявления' },
  { icon: 'Flag', title: 'Гражданство РФ', text: 'Принимаем граждан Российской Федерации' },
  { icon: 'MapPin', title: 'Регион присутствия', text: 'Жители регионов, где работает кооператив' },
  { icon: 'BadgeCheck', title: 'Физлица и самозанятые', text: 'В том числе плательщики НПД' },
];

const documents = [
  { icon: 'IdCard', title: 'Паспорт гражданина РФ', text: 'Разворот с фото и страница с регистрацией' },
  { icon: 'FileSignature', title: 'СНИЛС', text: 'Для идентификации в Пенсионном фонде' },
  { icon: 'Hash', title: 'ИНН', text: 'Свидетельство ИНН или уведомление о постановке на учёт' },
  { icon: 'FileText', title: 'Заявление о вступлении', text: 'Заполняется в офисе или дистанционно' },
];

const rights = [
  { icon: 'TrendingUp', title: 'Размещать сбережения', text: 'Под ставку до 18,50% годовых' },
  { icon: 'Wallet', title: 'Получать займы', text: 'По специальным программам для пайщиков' },
  { icon: 'Vote', title: 'Участвовать в управлении', text: 'Голосовать на общем собрании пайщиков' },
  { icon: 'Eye', title: 'Получать информацию', text: 'О деятельности и финансовом состоянии кооператива' },
];

const obligations = [
  { icon: 'CreditCard', title: 'Внести паевой взнос', text: '2 500 ₽ при вступлении — единоразово' },
  { icon: 'BookOpen', title: 'Соблюдать Устав', text: 'И решения общих собраний пайщиков' },
  { icon: 'Handshake', title: 'Исполнять обязательства', text: 'По договорам займа и иным договорённостям' },
];

export default function IndividualMembership() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-emerald-50/60 to-transparent">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-5">
            <Icon name="Users" size={15} />
            Для физических лиц
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Условия членства <span className="text-gradient">в кооперативе</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Стать пайщиком — просто. Один паевой взнос даёт доступ ко всем программам займов и сбережений, участию в управлении и контролю деятельности кооператива.
          </p>
        </div>
      </section>

      {/* Главная карточка — паевой взнос */}
      <section className="py-6 md:py-10 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-xl">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-16 h-16 mx-auto bg-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                <Icon name="CreditCard" size={32} className="text-white" />
              </div>
              <div className="text-sm text-muted-foreground mb-2">Паевой взнос при вступлении</div>
              <div className="text-5xl md:text-6xl font-bold text-emerald-700 mb-3">2 500 ₽</div>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Единоразовый взнос — открывает доступ ко всем продуктам кооператива и закрепляет ваш статус пайщика
              </p>
              <IndividualApplicationForm
                source="Страница «Условия членства для физлиц» — главный блок"
                defaultMessage="Хочу вступить в кооператив"
              >
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-10">
                  <Icon name="UserPlus" size={18} />
                  Подать заявку на вступление
                </Button>
              </IndividualApplicationForm>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Кто может вступить */}
      <section className="py-10 md:py-14 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Кто может вступить</h2>
          <p className="text-center text-muted-foreground mb-8">Требования к будущим пайщикам</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {eligibility.map((e) => (
              <Card key={e.title} className="border hover:shadow-md transition-shadow">
                <CardContent className="pt-5 pb-5">
                  <div className="w-10 h-10 gradient-purple-blue rounded-lg flex items-center justify-center mb-3">
                    <Icon name={e.icon} size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold mb-1">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{e.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Документы */}
      <section className="py-10 md:py-14 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Документы для вступления</h2>
          <p className="text-center text-muted-foreground mb-8">Стандартный пакет — без лишних бумаг</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {documents.map((d) => (
              <Card key={d.title} className="border hover:shadow-md transition-shadow">
                <CardContent className="pt-5 pb-5">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                    <Icon name={d.icon} size={20} className="text-white" />
                  </div>
                  <h3 className="font-bold mb-1">{d.title}</h3>
                  <p className="text-sm text-muted-foreground">{d.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Права и обязанности */}
      <section className="py-10 md:py-14 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Права */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Icon name="ShieldCheck" size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">Права пайщика</h2>
              </div>
              <div className="space-y-3">
                {rights.map((r) => (
                  <Card key={r.title} className="border hover:shadow-md transition-shadow">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={r.icon} size={18} className="text-emerald-700" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm mb-0.5">{r.title}</h3>
                          <p className="text-sm text-muted-foreground">{r.text}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Обязанности */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                  <Icon name="ClipboardCheck" size={20} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold">Обязанности пайщика</h2>
              </div>
              <div className="space-y-3">
                {obligations.map((o) => (
                  <Card key={o.title} className="border hover:shadow-md transition-shadow">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={o.icon} size={18} className="text-orange-700" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm mb-0.5">{o.title}</h3>
                          <p className="text-sm text-muted-foreground">{o.text}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Шаги */}
      <section className="py-10 md:py-14 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Как стать пайщиком</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: '1', title: 'Оставьте заявку', text: 'Заполните короткую форму на сайте или позвоните нам' },
              { n: '2', title: 'Подготовьте документы', text: 'Паспорт, СНИЛС, ИНН — стандартный пакет' },
              { n: '3', title: 'Внесите паевой взнос', text: '2 500 ₽ — единоразово при вступлении' },
              { n: '4', title: 'Получите статус пайщика', text: 'И полный доступ ко всем продуктам кооператива' },
            ].map((s) => (
              <Card key={s.n} className="border-2 hover:shadow-md transition-shadow relative">
                <CardContent className="pt-6 pb-5">
                  <div className="absolute -top-3 left-5 w-9 h-9 gradient-purple-blue rounded-lg flex items-center justify-center text-white font-bold">
                    {s.n}
                  </div>
                  <h3 className="font-bold mb-1 mt-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Форма заявки */}
      <section id="application" className="py-10 md:py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="border-2 border-primary/20 shadow-xl">
            <CardContent className="pt-8 pb-8">
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto gradient-purple-blue rounded-2xl flex items-center justify-center mb-3">
                  <Icon name="UserPlus" size={28} className="text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Заявка на вступление</h2>
                <p className="text-muted-foreground">Оставьте контакты — мы перезвоним и расскажем подробности</p>
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <IndividualApplicationForm
                  source="Страница «Условия членства для физлиц» — форма внизу"
                  defaultMessage="Хочу вступить в кооператив"
                >
                  <Button size="lg" className="gradient-purple-blue text-white px-10">
                    <Icon name="Send" size={18} />
                    Заполнить заявку
                  </Button>
                </IndividualApplicationForm>
                <a href="tel:88003023182">
                  <Button size="lg" variant="outline">
                    <Icon name="Phone" size={18} />
                    8 (800) 302-31-82
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Ссылки на разделы */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <Link to="/individual/loans">
              <Card className="border hover:border-orange-400 hover:shadow-md transition-all cursor-pointer h-full">
                <CardContent className="pt-5 pb-5 flex items-center gap-4">
                  <div className="w-12 h-12 gradient-orange-pink rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Wallet" size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">Программы займов</h3>
                    <p className="text-sm text-muted-foreground">5 программ для физлиц</p>
                  </div>
                  <Icon name="ArrowRight" size={18} className="text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
            <Link to="/individual/savings">
              <Card className="border hover:border-purple-400 hover:shadow-md transition-all cursor-pointer h-full">
                <CardContent className="pt-5 pb-5 flex items-center gap-4">
                  <div className="w-12 h-12 gradient-purple-blue rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="TrendingUp" size={22} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">Программа сбережений</h3>
                    <p className="text-sm text-muted-foreground">До 18,50% годовых</p>
                  </div>
                  <Icon name="ArrowRight" size={18} className="text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
