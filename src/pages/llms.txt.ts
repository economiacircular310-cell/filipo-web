import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { getPosts, getServices } from '../lib/content';
import { abs } from '../lib/schema';
import { path } from '../i18n/routes';
import { ui } from '../i18n/ui';

/** llms.txt — a Markdown map of the site for AI models (https://llmstxt.org). */
export const GET: APIRoute = async () => {
  const [servicesEs, servicesEn, postsEs, postsEn] = await Promise.all([
    getServices('es'),
    getServices('en'),
    getPosts('es'),
    getPosts('en'),
  ]);

  const lines = [
    `# ${site.name}`,
    '',
    `> ${ui.en['meta.description']}`,
    '',
    `${site.name} is a technology studio offering three services: custom software development (web applications, SaaS platforms, APIs, integrations), SEO and AI search optimization (technical SEO, content, structured data, GEO), and web performance optimization (Core Web Vitals). It works remotely with clients in Spain, Europe, Latin America and the United States, in Spanish and English. Contact: ${site.email}.`,
    '',
    '## Services (English)',
    '',
    ...servicesEn.map((s) => `- [${s.data.title}](${abs(s.href)}): ${s.data.tagline}`),
    '',
    '## Servicios (Español)',
    '',
    ...servicesEs.map((s) => `- [${s.data.title}](${abs(s.href)}): ${s.data.tagline}`),
    '',
    '## Company',
    '',
    `- [About](${abs(path('about', 'en'))}): Who we are and how we think about our work`,
    `- [How we work](${abs(path('process', 'en'))}): Our four-phase process, from discovery to launch`,
    `- [FAQ](${abs(path('faq', 'en'))}): Answers about services, pricing, timelines and ownership`,
    `- [Contact](${abs(path('contact', 'en'))}): Request a proposal`,
    `- [Sobre nosotros](${abs(path('about', 'es'))}): Quiénes somos`,
    `- [Preguntas frecuentes](${abs(path('faq', 'es'))}): Dudas frecuentes`,
    `- [Contacto](${abs(path('contact', 'es'))}): Pide una propuesta`,
    '',
    '## Blog',
    '',
    ...[...postsEn, ...postsEs].map((p) => `- [${p.data.title}](${abs(p.href)}): ${p.data.description}`),
    '',
    '## Optional',
    '',
    `- [Full text for LLMs](${abs('/llms-full.txt')}): Complete service descriptions and FAQs in one file`,
    `- [Sitemap](${abs('/sitemap-index.xml')})`,
    '',
  ];

  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
