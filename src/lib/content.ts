import { getCollection, type CollectionEntry } from 'astro:content';
import { blogPath, otherLocale, servicePath, splitEntryId, type Alternates, type Locale } from '../i18n/routes';

export type Service = CollectionEntry<'services'> & { locale: Locale; slug: string; href: string };
export type Post = CollectionEntry<'blog'> & { locale: Locale; slug: string; href: string };

export async function getServices(locale?: Locale): Promise<Service[]> {
  const all = (await getCollection('services')).map((entry) => {
    const { locale, slug } = splitEntryId(entry.id);
    return { ...entry, locale, slug, href: servicePath(slug, locale) };
  });
  return all.filter((s) => !locale || s.locale === locale).sort((a, b) => a.data.order - b.data.order);
}

export async function getPosts(locale?: Locale): Promise<Post[]> {
  const all = (await getCollection('blog', (entry) => import.meta.env.DEV || !entry.data.draft)).map((entry) => {
    const { locale, slug } = splitEntryId(entry.id);
    return { ...entry, locale, slug, href: blogPath(slug, locale) };
  });
  return all
    .filter((p) => !locale || p.locale === locale)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Find the translated counterpart of an entry (same `key`, other locale). */
export function alternatesForEntry<T extends { locale: Locale; href: string; data: { key: string } }>(
  entry: T,
  all: T[],
): Alternates {
  const other = all.find((e) => e.data.key === entry.data.key && e.locale === otherLocale(entry.locale));
  return { [entry.locale]: entry.href, ...(other ? { [other.locale]: other.href } : {}) };
}

export function readingTime(body = ''): number {
  return Math.max(1, Math.round(body.split(/\s+/).length / 220));
}
