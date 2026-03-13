import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import MembershipForm from '@/components/MembershipForm';

const rows = [
  {
    icon: 'Zap',
    criterion: 'Скорость решения',
    kpk: 'От 1 до 3 рабочих дней. Мы понимаем ценность момента для бизнеса.',
    bank: 'От 2 недель до 1 месяца. Длительные многоуровневые проверки.',
  },
  {
    icon: 'FileText',
    criterion: 'Пакет документов',
    kpk: 'Минимальный. Только основные учредительные документы и отчётность.',
    bank: 'Максимальный. Справки об отсутствии задолженностей, экспертные оценки, выписки.',
  },
  {
    icon: 'CalendarClock',
    criterion: 'Гибкость графика',
    kpk: 'Индивидуальный. Учитываем сезонность бизнеса и кассовые разрывы.',
    bank: 'Жёсткий. Аннуитет или стандартный график без учёта специфики ниши.',
  },
  {
    icon: 'Home',
    criterion: 'Залоговое обеспечение',
    kpk: 'Часто без залога. Ориентируемся на обороты и потенциал сделки.',
    bank: 'Обязательно. Жёсткие требования к ликвидности и дисконту залога.',
  },
  {
    icon: 'Clock',
    criterion: 'Требования к стажу',
    kpk: 'Лояльно к молодым компаниям — от 6 месяцев работы.',
    bank: 'Обычно от 12–24 месяцев безубыточной деятельности.',
  },
  {
    icon: 'Target',
    criterion: 'Целевое использование',
    kpk: 'Свобода действий. Вы сами решаете, куда направить средства.',
    bank: 'Строгий контроль и подтверждение каждой целевой траты.',
  },
  {
    icon: 'Handshake',
    criterion: 'Отношение к клиенту',
    kpk: 'Партнёрство. Вы — член кооператива и участник управления.',
    bank: 'Клиент-номер. Вы один из миллионов, работа по жёстким скриптам.',
  },
];

export default function ComparisonSection() {
  return (
    <section id="comparison" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Где выгоднее{' '}
            <span className="text-gradient">развивать бизнес?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Сравните условия и убедитесь сами — иногда чуть более высокая ставка
            покупает самое дорогое: время и отсутствие бюрократии.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border shadow-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-slate-100 text-left px-6 py-5 text-sm font-semibold text-muted-foreground w-[30%]">
                  Критерий
                </th>
                <th className="bg-primary/10 px-6 py-5 text-center w-[35%]">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">Ваш выбор</span>
                    <span className="text-base font-bold text-primary">КПК «ФИН ФОРМУЛА»</span>
                  </div>
                </th>
                <th className="bg-slate-100 px-6 py-5 text-center w-[35%]">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Альтернатива</span>
                    <span className="text-base font-bold text-muted-foreground">Крупный банк</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                  <td className="px-6 py-5 border-t">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 gradient-purple-blue rounded-lg flex items-center justify-center shrink-0">
                        <Icon name={row.icon} size={16} className="text-white" />
                      </div>
                      <span className="font-semibold text-sm">{row.criterion}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 border-t bg-primary/5 text-sm">
                    <div className="flex items-start gap-2">
                      <Icon name="CircleCheck" size={18} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground">{row.kpk}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 border-t text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <Icon name="CircleX" size={18} className="text-slate-400 shrink-0 mt-0.5" />
                      <span>{row.bank}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => (
            <div key={i} className="rounded-xl border bg-white shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-b">
                <div className="w-7 h-7 gradient-purple-blue rounded-md flex items-center justify-center shrink-0">
                  <Icon name={row.icon} size={14} className="text-white" />
                </div>
                <span className="font-semibold text-sm">{row.criterion}</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-2 bg-primary/5 rounded-lg p-3">
                  <Icon name="CircleCheck" size={16} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-primary mb-1">КПК «ФИН ФОРМУЛА»</p>
                    <p className="text-sm">{row.kpk}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3">
                  <Icon name="CircleX" size={16} className="text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Крупный банк</p>
                    <p className="text-sm text-muted-foreground">{row.bank}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div className="mt-10 text-center space-y-4">
          <MembershipForm>
            <Button size="lg" className="gradient-purple-blue text-white px-10 py-6 text-base font-semibold shadow-lg hover:opacity-90 transition-opacity">
              Получить решение за 24 часа
            </Button>
          </MembershipForm>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Мы не заменяем банки — мы даём ресурсы там, где банковская система
            слишком неповоротлива для реального сектора экономики.
          </p>
        </div>
      </div>
    </section>
  );
}
