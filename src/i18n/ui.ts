import type { Locale } from './routes';

export const ui = {
  es: {
    'meta.tagline': 'Desarrollo de software a medida, SEO y optimización web',
    'meta.description':
      'Filipo Studio es un estudio de tecnología que desarrolla software a medida, posiciona webs en Google y en buscadores de IA y optimiza su rendimiento.',
    'a11y.skip': 'Saltar al contenido',
    'a11y.menu': 'Abrir menú',
    'a11y.closeMenu': 'Cerrar menú',
    'a11y.breadcrumbs': 'Ruta de navegación',
    'a11y.mainNav': 'Navegación principal',
    'a11y.langSwitch': 'Cambiar idioma',
    'nav.services': 'Servicios',
    'nav.process': 'Cómo trabajamos',
    'nav.about': 'Estudio',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contacto',
    'cta.primary': 'Cuéntanos tu proyecto',
    'cta.secondary': 'Ver servicios',
    'cta.learnMore': 'Saber más',
    'breadcrumb.home': 'Inicio',
    'footer.services': 'Servicios',
    'footer.company': 'Estudio',
    'footer.legal': 'Legal',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.blurb':
      'Estudio de tecnología especializado en software a medida, posicionamiento SEO y optimización del rendimiento web.',
    'legal.privacy': 'Política de privacidad',
    'legal.notice': 'Aviso legal',
    'legal.cookies': 'Política de cookies',
    'blog.readMore': 'Leer artículo',
    'blog.published': 'Publicado el',
    'blog.updated': 'Actualizado el',
    'blog.minutes': 'min de lectura',
    'lang.name': 'Español',
    'lang.short': 'ES',
  },
  en: {
    'meta.tagline': 'Custom software development, SEO and web performance',
    'meta.description':
      'Filipo Studio is a technology studio that builds custom software, ranks websites on Google and AI search engines, and optimizes web performance.',
    'a11y.skip': 'Skip to content',
    'a11y.menu': 'Open menu',
    'a11y.closeMenu': 'Close menu',
    'a11y.breadcrumbs': 'Breadcrumb',
    'a11y.mainNav': 'Main navigation',
    'a11y.langSwitch': 'Change language',
    'nav.services': 'Services',
    'nav.process': 'How we work',
    'nav.about': 'Studio',
    'nav.blog': 'Blog',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'cta.primary': 'Tell us about your project',
    'cta.secondary': 'Explore services',
    'cta.learnMore': 'Learn more',
    'breadcrumb.home': 'Home',
    'footer.services': 'Services',
    'footer.company': 'Studio',
    'footer.legal': 'Legal',
    'footer.rights': 'All rights reserved.',
    'footer.blurb':
      'Technology studio specialised in custom software, SEO positioning and web performance optimization.',
    'legal.privacy': 'Privacy policy',
    'legal.notice': 'Legal notice',
    'legal.cookies': 'Cookie policy',
    'blog.readMore': 'Read article',
    'blog.published': 'Published',
    'blog.updated': 'Updated',
    'blog.minutes': 'min read',
    'lang.name': 'English',
    'lang.short': 'EN',
  },
} as const;

export type UiKey = keyof (typeof ui)['es'];

export function useTranslations(locale: Locale) {
  return (key: UiKey): string => ui[locale][key];
}

export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    dateStyle: 'long',
  }).format(date);
}
