import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
  jsonLd?: object | object[];
}

const SITE_URL = 'https://ffrf.ru';
const DEFAULT_IMAGE =
  'https://cdn.poehali.dev/projects/1051bbab-a467-4b71-b050-32335ddce05d/bucket/6ed6e0cf-bae9-43e2-a4e4-c006126270f9.png';

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  '@id': `${SITE_URL}/#organization`,
  name: 'КПК «ФИН ФОРМУЛА»',
  alternateName: 'Кредитный потребительский кооператив «ФИН ФОРМУЛА»',
  legalName: 'Кредитный потребительский кооператив «ФИН ФОРМУЛА»',
  description:
    'Кредитный потребительский кооператив. Сбережения под ставку до 18,50% годовых и займы для физических лиц, самозанятых и бизнеса в Ростовской области и Краснодарском крае. Деятельность регулируется Банком России.',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: DEFAULT_IMAGE,
  telephone: '+7-800-302-31-82',
  email: 'info@ffrf.ru',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'RU',
    addressRegion: 'Ростовская область',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Ростовская область' },
    { '@type': 'AdministrativeArea', name: 'Краснодарский край' },
  ],
  serviceType: [
    'Сбережения для физических лиц',
    'Сбережения для бизнеса',
    'Займы для физических лиц',
    'Займы для самозанятых',
    'Займы для бизнеса',
    'Ипотека',
    'Авто займы',
    'Рефинансирование',
    'Займы под залог недвижимости',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Финансовые продукты КПК «ФИН ФОРМУЛА»',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Сбережения «Динамичный доход»',
        description: 'Размещение сбережений от 50 000 ₽ до 30 000 000 ₽ на срок от 3 до 18 месяцев. Ставка до 18,50% годовых.',
        url: `${SITE_URL}/individual/savings`,
      },
      {
        '@type': 'Offer',
        name: 'Займы для физических лиц и самозанятых',
        description: 'Без обеспечения, под залог недвижимости, ипотека, авто займ, рефинансирование.',
        url: `${SITE_URL}/individual/loans`,
      },
      {
        '@type': 'Offer',
        name: 'Займы для бизнеса',
        description: 'Оборотные, инвестиционные, кассовый экспресс, рефинансирование для ЮЛ и ИП.',
        url: `${SITE_URL}/loans`,
      },
    ],
  },
  sameAs: ['https://mykpk.ru'],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'КПК «ФИН ФОРМУЛА»',
  inLanguage: 'ru-RU',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
}: SEOProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes('ФИН ФОРМУЛА') ? title : `${title} — КПК «ФИН ФОРМУЛА»`;

  const ldArray: object[] = [organizationJsonLd, websiteJsonLd];
  if (jsonLd) {
    if (Array.isArray(jsonLd)) ldArray.push(...jsonLd);
    else ldArray.push(jsonLd);
  }

  return (
    <Helmet>
      <html lang="ru" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="КПК «ФИН ФОРМУЛА»" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="КПК «ФИН ФОРМУЛА» — финансовая поддержка для физлиц и бизнеса" />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(ldArray)}</script>
    </Helmet>
  );
}
