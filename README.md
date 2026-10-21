# Filipo Studio — website

Bilingual (ES/EN) static marketing site for Filipo Studio, built with Astro 7 and Tailwind CSS 4. It's designed to rank on Google and to be easy for AI assistants (ChatGPT, Gemini, Perplexity, Claude) to understand and cite.

## Quick start

```sh
npm install
cp .env.example .env      # then paste your Web3Forms key
npm run dev               # http://localhost:4321
npm run build             # static output in dist/
npm run preview           # serve dist/ locally
npm run check             # type-check
```

## Before launch: checklist

1. **Contact form.** Create a free access key at [web3forms.com](https://web3forms.com) using the email address that should receive messages. Put it in `.env` locally as `PUBLIC_WEB3FORMS_KEY`, and set it as an environment variable on your hosting provider.
2. **Business data** in [src/config/site.ts](src/config/site.ts):
   - contact email
   - phone (optional)
   - founding year
   - social profiles (`sameAs`)
   - legal details: legal name, tax ID (NIF/CIF) and address. Spanish law (LSSI-CE) requires these, and they appear in the legal notice and privacy policy.
3. **Legal texts** in [src/views/LegalView.astro](src/views/LegalView.astro). They are a starting template and should be reviewed by a legal professional.
4. **Tech stack** in [src/data/stack.ts](src/data/stack.ts). Keep it to the technologies you actually use.
5. **Commitments in the copy.** Check that they match how you work: reply "within one business day", free first call, fixed-price phases, 6–12 week MVPs. To find them, search `src/` for "día laborable" and "business day".
6. **Testimonials.** Add real ones, with the client's permission, to [src/data/testimonials.ts](src/data/testimonials.ts). The section appears automatically once the list isn't empty.
7. **After deploying:**
   - Verify the domain in Google Search Console and Bing Webmaster Tools, and submit `https://filipostudio.com/sitemap-index.xml`.
   - Create a Google Business Profile and a LinkedIn company page, then add their URLs to `sameAs`.

## Project structure

```
src/
  config/site.ts        Business data (one source of truth for pages, schema.org and llms.txt)
  i18n/routes.ts        Route map: every page key → { es, en } path (translated slugs)
  i18n/ui.ts            Shared UI strings
  content/services/     One Markdown file per service and language (frontmatter = structured data)
  content/blog/         Blog posts: src/content/blog/<es|en>/<slug>.md
  data/                 FAQ, process steps, tech stack, testimonials
  views/                Page bodies, shared by both languages
  pages/                Thin per-language routes + robots.txt, llms.txt, llms-full.txt
  lib/schema.ts         JSON-LD builders (Organization, Service, FAQPage, BreadcrumbList…)
  components/           UI components
scripts/generate-brand-assets.mjs   Favicon, logo and OG image generator (npm run assets)
```

### Adding a blog post

Create `src/content/blog/es/mi-articulo.md`, and optionally `src/content/blog/en/my-article.md`, using the same `key` in both:

```md
---
key: my-article
title: Título del artículo
description: Resumen de 120–160 caracteres para Google.
pubDate: 2026-11-01
tags: [SEO]
---

Contenido en Markdown…
```

Posts with the same `key` are automatically linked with hreflang tags and the language switcher. To keep a post unpublished, set `draft: true`.

### Adding a page

1. Add its paths to `routes` in `src/i18n/routes.ts`.
2. Create a view in `src/views/`.
3. Add one thin page file per language in `src/pages/`.

## SEO and AI-search features

- **Unique metadata on every page:** title, meta description, canonical URL and Open Graph/Twitter tags.
- **hreflang** for es / en / x-default.
- **schema.org JSON-LD**, connected through one `Organization` `@id`:
  - `WebSite` and `WebPage` on every page
  - `BreadcrumbList` on inner pages
  - `Service` and `FAQPage` on service pages
  - `HowTo` on the process page
  - `Blog` and `BlogPosting` on the blog
- **Crawling files:**
  - `sitemap-index.xml`, generated automatically
  - `robots.txt`, which explicitly allows AI crawlers: OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, ClaudeBot, PerplexityBot, Google-Extended and others
  - `llms.txt` and `llms-full.txt`, generated from the content
- **Service pages:** each opens with a 60–90-word "answer" paragraph, and includes comparison tables and FAQs. AI answer engines can quote these easily.
- **Performance:**
  - CSS is inlined (about 8 KB gzipped)
  - fonts are self-hosted and preloaded, with metric-matched fallbacks
  - almost no JavaScript (only the mobile menu and the contact form)
  - no cookies and no third-party requests

  Lighthouse on mobile scored 99 for performance and 100 for accessibility, best practices and SEO.

## Deployment

The build is a plain static `dist/` folder that works on any static host.

| Host | Settings |
|---|---|
| **GitHub Pages** (current) | `.github/workflows/deploy.yml` builds and deploys every push to `main`. In repo Settings → Pages, set Source to "GitHub Actions". The form key comes from the Actions variable `PUBLIC_WEB3FORMS_KEY`. `public/CNAME` sets the custom domain. Custom headers (`_headers`, `vercel.json`) are ignored there. |
| **Cloudflare Pages** | Build command `npm run build`, output `dist`, environment variable `PUBLIC_WEB3FORMS_KEY`. `public/_headers` is applied automatically. |
| **Netlify** | Build command `npm run build`, publish directory `dist`, environment variable `PUBLIC_WEB3FORMS_KEY`. `public/_headers` is applied automatically. |
| **Vercel** | Framework preset "Astro", environment variable `PUBLIC_WEB3FORMS_KEY`. `vercel.json` sets the headers. |

Every URL ends with a trailing slash (`/servicios/`), and the canonical tags use that form.

If the Cloudflare or bot-protection settings on your host block AI crawlers, allow them. Otherwise the `robots.txt` rules have no effect.

## Brand assets

The logo is in [src/components/ui/Logo.astro](src/components/ui/Logo.astro). Favicons, app icons, `logo.png` and `og-default.png` are generated with `npm run assets`.
