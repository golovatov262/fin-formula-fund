import Icon from '@/components/ui/icon';

const documents = [
  {
    title: 'Устав',
    description: 'Основной учредительный документ кооператива',
    filename: 'ustav.pdf',
  },
  {
    title: 'Положение о членстве',
    description: 'Условия и порядок вступления в кооператив',
    filename: 'polozhenie-o-chlenstvo.pdf',
  },
  {
    title: 'Положение о выдаче займов',
    description: 'Правила и условия предоставления займов членам',
    filename: 'polozhenie-o-zaymah.pdf',
  },
  {
    title: 'Положение о приёме сбережений',
    description: 'Порядок и условия приёма личных сбережений',
    filename: 'polozhenie-o-sberezheniyah.pdf',
  },
];

export default function DocumentsSection() {
  return (
    <section id="documents" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Документы</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Вся необходимая документация кооператива в открытом доступе
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {documents.map((doc, idx) => (
            <a
              key={idx}
              href={`/documents/${doc.filename}`}
              download
              className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                <Icon name="FileText" size={32} className="text-red-500" />
                <span className="absolute text-[9px] font-bold text-red-500 mt-8">PDF</span>
              </div>
              <h3 className="font-semibold text-base mb-2 leading-tight">{doc.title}</h3>
              <p className="text-sm text-muted-foreground leading-snug mb-4">{doc.description}</p>
              <div className="flex items-center gap-1.5 text-primary text-sm font-medium mt-auto">
                <Icon name="Download" size={14} />
                Скачать
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
