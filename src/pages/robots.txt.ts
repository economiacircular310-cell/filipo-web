import type { APIRoute } from 'astro';

/**
 * AI search and assistant crawlers are explicitly welcomed: being cited by
 * ChatGPT, Claude, Perplexity and Gemini is one of the site's goals.
 */
const aiCrawlers = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'Claude-SearchBot',
  'Claude-User',
  'ClaudeBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
];

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).toString();
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /contacto/gracias/',
    'Disallow: /en/contact/thanks/',
    '',
    ...aiCrawlers.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${sitemap}`,
    '',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
