import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faqItem = z.object({ q: z.string(), a: z.string() });

/**
 * Service pages. Files live in `src/content/services/<locale>/<slug>.md`;
 * the same `key` links the Spanish and English versions together.
 */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    key: z.string(),
    order: z.number(),
    icon: z.enum(['code', 'search', 'gauge']),
    /** Visible H1. */
    title: z.string(),
    /** <title> tag (~60 chars). */
    seoTitle: z.string(),
    /** Meta description (~155 chars). */
    description: z.string(),
    /** One-line pitch used on cards. */
    tagline: z.string(),
    /** 60–90 word direct answer block shown under the H1 (good for AI citations). */
    answer: z.string(),
    deliverables: z.array(z.string()),
    process: z.array(z.object({ title: z.string(), text: z.string() })),
    faq: z.array(faqItem).default([]),
    keywords: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    /** Shared between the translations of the same article. */
    key: z.string(),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { services, blog };
