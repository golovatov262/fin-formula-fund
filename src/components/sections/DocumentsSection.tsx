import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const DOCS_URL = 'https://functions.poehali.dev/aaf60092-d5d3-4009-a71d-89ce64ad3157';

interface Doc {
  slug: string;
  title: string;
  description: string;
  url: string | null;
  uploaded: boolean;
}

const FALLBACK_DOCS: Doc[] = [
  { slug: 'ustav', title: 'Устав', description: 'Основной учредительный документ кооператива', url: null, uploaded: false },
  { slug: 'polozhenie-o-chlenstvo', title: 'Положение о членстве', description: 'Условия и порядок вступления в кооператив', url: null, uploaded: false },
  { slug: 'polozhenie-o-zaymah', title: 'Положение о выдаче займов', description: 'Правила и условия предоставления займов членам', url: null, uploaded: false },
  { slug: 'polozhenie-o-sberezheniyah', title: 'Положение о приёме сбережений', description: 'Порядок и условия приёма личных сбережений', url: null, uploaded: false },
];

export default function DocumentsSection() {
  const [documents, setDocuments] = useState<Doc[]>(FALLBACK_DOCS);

  useEffect(() => {
    fetch(DOCS_URL)
      .then(r => r.json())
      .then(data => { if (data.documents) setDocuments(data.documents); })
      .catch(() => {});
  }, []);

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
          {documents.map((doc) => (
            doc.uploaded && doc.url ? (
              <a
                key={doc.slug}
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-200 hover:border-primary hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="relative w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                  <Icon name="FileText" size={32} className="text-red-500" />
                  <span className="absolute bottom-1 text-[9px] font-bold text-red-500">PDF</span>
                </div>
                <h3 className="font-semibold text-base mb-2 leading-tight">{doc.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug mb-4">{doc.description}</p>
                <div className="flex items-center gap-1.5 text-primary text-sm font-medium mt-auto">
                  <Icon name="Download" size={14} />
                  Скачать
                </div>
              </a>
            ) : (
              <div
                key={doc.slug}
                className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-dashed border-gray-200 opacity-50"
              >
                <div className="relative w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <Icon name="FileText" size={32} className="text-gray-400" />
                  <span className="absolute bottom-1 text-[9px] font-bold text-gray-400">PDF</span>
                </div>
                <h3 className="font-semibold text-base mb-2 leading-tight">{doc.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug mb-4">{doc.description}</p>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-auto">
                  <Icon name="Clock" size={14} />
                  Скоро
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}
