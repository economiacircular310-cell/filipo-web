import type { Locale } from '../i18n/routes';

export interface Testimonial {
  quote: Record<Locale, string>;
  name: string;
  role: Record<Locale, string>;
  company: string;
}

/**
 * Real client testimonials only — the "Testimonials" section stays hidden
 * while this list is empty. Ask clients for permission to publish their
 * name and role.
 *
 * Example:
 * {
 *   quote: { es: '…', en: '…' },
 *   name: 'Jane Doe',
 *   role: { es: 'CEO', en: 'CEO' },
 *   company: 'Acme',
 * },
 */
export const testimonials: Testimonial[] = [];
