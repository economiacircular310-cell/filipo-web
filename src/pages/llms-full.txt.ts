import type { APIRoute } from 'astro';
import { site } from '../config/site';
import { faq } from '../data/faq';
import { processSteps } from '../data/process';
import { getServices } from '../lib/content';
import { abs } from '../lib/schema';
import { locales } from '../i18n/routes';
import { ui } from '../i18n/ui';

/** Full plain-text version of the key content, for AI models that read llms-full.txt. */
export const GET: APIRoute = async () => {
  const out: string[] = [`# ${site.name}`, '', `> ${ui.en['meta.description']}`, '', `Website: ${site.url} · Email: ${site.email}`, ''];

  for (const locale of locales) {
    const services = await getServices(locale);
    out.push(locale === 'en' ? '# English' : '# Español', '');

    for (const s of services) {
      out.push(`## ${s.data.title}`, '', `URL: ${abs(s.href)}`, '', s.data.answer, '');
      out.push(locale === 'en' ? '### Deliverables' : '### Qué incluye', '', ...s.data.deliverables.map((d) => `- ${d}`), '');
      out.push(locale === 'en' ? '### Process' : '### Proceso', '', ...s.data.process.map((p, i) => `${i + 1}. **${p.title}**: ${p.text}`), '');
      if (s.body) out.push(s.body.trim(), '');
      if (s.data.faq.length) {
        out.push('### FAQ', '');
        for (const item of s.data.faq) out.push(`**${item.q}**`, item.a, '');
      }
    }

    out.push(locale === 'en' ? '## How we work' : '## Cómo trabajamos', '');
    processSteps[locale].forEach((step, i) => out.push(`${i + 1}. **${step.title}**: ${step.detail}`));
    out.push('');

    out.push(locale === 'en' ? '## Frequently asked questions' : '## Preguntas frecuentes', '');
    for (const group of faq[locale]) {
      out.push(`### ${group.title}`, '');
      for (const item of group.items) out.push(`**${item.q}**`, item.a, '');
    }
  }

  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
