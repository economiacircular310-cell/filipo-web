export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

export const htmlLang: Record<Locale, string> = { es: 'es-ES', en: 'en-US' };
export const ogLocale: Record<Locale, string> = { es: 'es_ES', en: 'en_US' };

/**
 * Every static page has a key and one path per locale. Slugs are translated
 * so each language ranks for its own keywords.
 */
export const routes = {
  home: { es: '/', en: '/en/' },
  services: { es: '/servicios/', en: '/en/services/' },
  about: { es: '/sobre-nosotros/', en: '/en/about/' },
  process: { es: '/como-trabajamos/', en: '/en/how-we-work/' },
  faq: { es: '/preguntas-frecuentes/', en: '/en/faq/' },
  contact: { es: '/contacto/', en: '/en/contact/' },
  contactThanks: { es: '/contacto/gracias/', en: '/en/contact/thanks/' },
  blog: { es: '/blog/', en: '/en/blog/' },
  privacy: { es: '/privacidad/', en: '/en/privacy/' },
  legal: { es: '/aviso-legal/', en: '/en/legal-notice/' },
  cookies: { es: '/cookies/', en: '/en/cookies/' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;
export type Alternates = Partial<Record<Locale, string>>;

export function path(key: RouteKey, locale: Locale): string {
  return routes[key][locale];
}

export function alternatesFor(key: RouteKey): Alternates {
  return { ...routes[key] };
}

export function servicePath(slug: string, locale: Locale): string {
  return `${routes.services[locale]}${slug}/`;
}

export function blogPath(slug: string, locale: Locale): string {
  return `${routes.blog[locale]}${slug}/`;
}

/** Content entries live in `<locale>/<slug>.md`; split the id into its parts. */
export function splitEntryId(id: string): { locale: Locale; slug: string } {
  const [locale, ...rest] = id.split('/');
  return { locale: locale as Locale, slug: rest.join('/') };
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}
