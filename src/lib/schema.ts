/**
 * schema.org JSON-LD builders. All nodes reference the organization through a
 * stable @id so search engines and AI models resolve one single entity.
 * Only describe things that are visible on the page.
 */
import { site } from '../config/site';
import { htmlLang, type Locale } from '../i18n/routes';
import { ui } from '../i18n/ui';

type Node = Record<string, unknown>;

export const ORG_ID = `${site.url}/#organization`;
export const WEBSITE_ID = `${site.url}/#website`;

export const abs = (path: string) => new URL(path, site.url).toString();

export function organization(locale: Locale): Node {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    url: abs('/'),
    logo: { '@type': 'ImageObject', url: abs('/logo.png'), width: 512, height: 512 },
    image: abs('/og-default.png'),
    description: ui[locale]['meta.description'],
    slogan: ui[locale]['meta.tagline'],
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.foundingYear ? { foundingDate: site.foundingYear } : {}),
    ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
    areaServed: site.areaServed,
    knowsAbout: [
      'Custom software development',
      'Web application development',
      'Search engine optimization',
      'Generative engine optimization',
      'Technical SEO',
      'Web performance optimization',
      'Core Web Vitals',
      'Structured data',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.email,
      availableLanguage: ['Spanish', 'English'],
    },
  };
}

export function website(locale: Locale): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: abs('/'),
    name: site.name,
    inLanguage: ['es-ES', 'en-US'],
    publisher: { '@id': ORG_ID },
    description: ui[locale]['meta.description'],
  };
}

export function webPage(opts: {
  url: string;
  title: string;
  description: string;
  locale: Locale;
  type?: string;
}): Node {
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    inLanguage: htmlLang[opts.locale],
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
  };
}

export function breadcrumbList(items: { name: string; path: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function service(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  deliverables: string[];
  locale: Locale;
}): Node {
  return {
    '@type': 'Service',
    '@id': `${abs(opts.path)}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: abs(opts.path),
    inLanguage: htmlLang[opts.locale],
    provider: { '@id': ORG_ID },
    areaServed: site.areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: opts.name,
      itemListElement: opts.deliverables.map((d) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: d },
      })),
    },
  };
}

export function faqPage(items: { q: string; a: string }[], url: string): Node {
  return {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function blogPosting(opts: {
  title: string;
  description: string;
  path: string;
  pubDate: Date;
  updatedDate?: Date;
  locale: Locale;
  tags: string[];
}): Node {
  return {
    '@type': 'BlogPosting',
    '@id': `${abs(opts.path)}#article`,
    headline: opts.title,
    description: opts.description,
    url: abs(opts.path),
    mainEntityOfPage: { '@id': `${abs(opts.path)}#webpage` },
    datePublished: opts.pubDate.toISOString(),
    dateModified: (opts.updatedDate ?? opts.pubDate).toISOString(),
    inLanguage: htmlLang[opts.locale],
    keywords: opts.tags.join(', '),
    image: abs('/og-default.png'),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  };
}

export function graph(nodes: Node[]) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
