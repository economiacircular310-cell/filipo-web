# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Bilingual (Spanish default at `/`, English at `/en/`) static marketing site for Filipo Studio, built with Astro 7 + Tailwind CSS 4. The site's main goal is ranking on Google and being cited by AI answer engines, so SEO and structured-data correctness matter as much as visuals.

## Commands

```sh
npm run dev        # dev server; per AGENTS.md prefer `astro dev --background` (manage with astro dev stop|status|logs)
npm run build      # static build to dist/ — the main correctness check
npm run check      # astro check (TypeScript + .astro diagnostics)
npm run preview    # serve dist/ on :4321
npm run assets     # regenerate favicons, logo.png, og-default.png into public/ (sharp)
```

There's no test suite and no linter. Verify changes with `npm run check` and `npm run build`, and inspect the generated HTML in `dist/` when touching SEO or schema code.

`PUBLIC_WEB3FORMS_KEY` (in `.env`, see `.env.example`) is the contact form's public access key. Without it the build still succeeds, but the form can't send.

## Architecture

**Translated-slug i18n.** Astro's i18n uses `prefixDefaultLocale: false`, but the slugs differ per language (`/sobre-nosotros/` ↔ `/en/about/`). That means Astro can't pair translations by itself. The pairing lives in `src/i18n/routes.ts`: every static page has a key mapped to `{ es, en }` paths. Use `path(key, locale)` for links, and `alternatesFor(key)` for the hreflang alternates that each page passes to `BaseLayout`. The language switcher and the hreflang tags both come from those alternates. Sitemap i18n is intentionally *not* configured, because it can only pair identical paths.

**Views + thin pages.** Page bodies live in `src/views/*View.astro` and take a `locale` prop (or an `entry` for collection pages). Each file in `src/pages/` (Spanish at the root, English under `pages/en/`) is a 3-line wrapper that renders a view. Copy specific to a view or component is co-located as `const copy = { es: {...}, en: {...} }[locale]`. Shared UI strings are in `src/i18n/ui.ts`.

**To add a static page:**
1. Add a key to `routes`.
2. Create a view.
3. Add one wrapper per locale in `src/pages/`.

**Content collections** (`src/content.config.ts`, glob loader, Zod from `astro/zod`):
- Files live at `src/content/{services,blog}/<locale>/<slug>.md`. `splitEntryId()` derives the locale and slug from the entry id.
- Translations are linked by a shared frontmatter `key`. `alternatesForEntry()` in `src/lib/content.ts` uses that key to find the counterpart.
- Always read entries through `getServices(locale)` / `getPosts(locale)` from `src/lib/content.ts`. These attach `locale`, `slug` and `href`, sort the entries, and filter out drafts.
- Service frontmatter is structured data, not just metadata: `answer`, `deliverables`, `process` and `faq` render on the page, and they also feed the JSON-LD and `llms-full.txt`.
- Other data lives in `src/data/`:
  - general FAQs
  - process steps
  - tech stack
  - testimonials (the section is hidden while this list is empty)

**SEO pipeline.**
- `BaseLayout.astro` always emits one JSON-LD `@graph`, containing:
  - `Organization` (stable `@id` `…/#organization`)
  - `WebSite` and `WebPage`
  - a `BreadcrumbList` when the page passes `breadcrumbs`
  - any extra nodes the page passes via `schema`
- The node builders are in `src/lib/schema.ts`. `SEO.astro` handles the title, meta, canonical, hreflang and OG tags.
- Business facts (name, email, `sameAs`, legal details) come only from `src/config/site.ts`.
- `robots.txt`, `llms.txt` and `llms-full.txt` are endpoints in `src/pages/*.ts`, generated from the same content and data, so they stay in sync automatically.

## Conventions and gotchas

- **Trailing slashes.** `trailingSlash: 'always'` and `build.format: 'directory'`: every internal link and route path ends in `/`.
- **Title length.** `SEO.astro` appends ` | Filipo Studio` only when the result stays at or under 65 characters. Keep titles to about 65 characters or less, and descriptions to about 70–160.
- **FAQ markup.** Each FAQ is marked up once. Service FAQs get `FAQPage` on their own service page, so the `/preguntas-frecuentes/` schema includes only the general FAQs from `src/data/faq.ts`.
- **Utility pages.** The thank-you pages are `noindex`. They're also excluded from the sitemap (in `astro.config.mjs`) and disallowed in `robots.txt`. A new utility page needs all three.
- **YAML colons.** Quote any frontmatter value that contains `: `, or that starts with `¿` or `«`. Unquoted ones break YAML parsing.
- **No runtime exports from `.astro` files.** Only types can be exported from `.astro` frontmatter. Put shared values in `src/data/` or `src/lib/`.
- **Tailwind 4 `@apply`.** `@apply` can't reference custom component classes such as `.btn` or `.card`. Group the selectors instead (see `src/styles/global.css`). Design tokens (`ink-*`, `fg`, `muted`, `brand-*`, `line`…) are defined in `@theme` there.
- **Fonts.** Fonts come from Astro's built-in Fonts API (`fonts` in `astro.config.mjs`, `<Font>` in `BaseLayout`). They are self-hosted, so don't add Google Fonts links or other third-party requests. The site sets no cookies, and the cookie policy states this.
- **Contact form** (`src/components/ContactForm.astro`): a plain HTML POST to Web3Forms with a hidden `redirect` to the localized thank-you page, so it works without JavaScript. An inline script progressively enhances it with `fetch` and inline status messages. Keep both paths working.
- **CSS and JavaScript budget.** CSS is inlined on purpose (`inlineStylesheets: 'always'`, about 8 KB gzipped). Client JavaScript is limited to the mobile menu and the form script. Avoid adding UI frameworks or client islands unless they're really needed.
- **No invented content.** Don't add statistics, client logos, testimonials or case studies that aren't real. Placeholders that must be filled before launch (legal tax ID and address) are in `src/config/site.ts`.
- **Deploy config.** The host is not fixed: `public/_headers` serves Netlify and Cloudflare Pages, and `vercel.json` serves Vercel. Keep their header rules equivalent.
