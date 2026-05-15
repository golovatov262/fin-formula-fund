import { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
  jsonLd?: object | object[];
  breadcrumbs?: BreadcrumbItem[];
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

const MANAGED_ATTR = 'data-seo-managed';

function setMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(MANAGED_ATTR, 'true');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"][${MANAGED_ATTR}]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute(MANAGED_ATTR, 'true');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function SEO({
  title,
  description,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  jsonLd,
  breadcrumbs,
}: SEOProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes('ФИН ФОРМУЛА') ? title : `${title} — КПК «ФИН ФОРМУЛА»`;

  useEffect(() => {
    document.documentElement.setAttribute('lang', 'ru');
    document.title = fullTitle;

    setMeta('meta[name="description"]', { name: 'description', content: description });
    setLink('canonical', url);

    setMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: 'КПК «ФИН ФОРМУЛА»' });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: image });
    setMeta('meta[property="og:image:alt"]', {
      property: 'og:image:alt',
      content: 'КПК «ФИН ФОРМУЛА» — финансовая поддержка для физлиц и бизнеса',
    });
    setMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'ru_RU' });

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: image });

    const ldArray: object[] = [organizationJsonLd, websiteJsonLd];
    if (breadcrumbs && breadcrumbs.length > 0) {
      ldArray.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: `${SITE_URL}${b.path}`,
        })),
      });
    }
    if (jsonLd) {
      if (Array.isArray(jsonLd)) ldArray.push(...jsonLd);
      else ldArray.push(jsonLd);
    }

    document.head.querySelectorAll(`script[type="application/ld+json"][${MANAGED_ATTR}]`).forEach((n) => n.remove());
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(MANAGED_ATTR, 'true');
    script.textContent = JSON.stringify(ldArray);
    document.head.appendChild(script);
  }, [fullTitle, description, url, image, type, jsonLd, breadcrumbs]);

  return null;
}
