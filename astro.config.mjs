// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const site = 'https://filipostudio.com';

// Thank-you pages are utility pages: keep them out of the sitemap (they are also noindex).
const excludeFromSitemap = ['/contacto/gracias/', '/en/contact/thanks/'];

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // CSS is ~8 KB gzipped: inlining it removes the only render-blocking request.
    inlineStylesheets: 'always',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['100 900'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
  integrations: [
    // Slugs are translated (e.g. /sobre-nosotros/ ↔ /en/about/), so hreflang pairs are
    // declared in each page's <head> (see components/seo/SEO.astro) rather than here.
    sitemap({
      filter: (page) => !excludeFromSitemap.some((path) => page.endsWith(path)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
