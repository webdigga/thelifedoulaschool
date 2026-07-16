import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/**
 * Content schemas. SEO title and description are required on every entry and
 * the description is length-bounded, so a missing or overlong meta
 * description fails the build (brief §8).
 */
const seoDescription = z
  .string()
  .min(50, 'Meta description must be at least 50 characters')
  .max(160, 'Meta description must not exceed 160 characters');

const keys = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/keys' }),
  schema: z.object({
    title: z.string().min(1),
    order: z.number().int().min(1).max(8),
    /** One short line under the key name. */
    essence: z.string().min(10).max(120),
    description: seoDescription,
    /**
     * Eventually 7 entries per key, supplied by the client. While empty, the
     * page shows its designed placeholder state (docs/content-status.md).
     */
    sevenWays: z
      .array(z.object({ title: z.string().min(1), summary: z.string().min(1) }))
      .max(7)
      .default([]),
    /** "In the human experience" application text; placeholder state if absent. */
    humanExperience: z.string().optional(),
    /** "In the spiritual experience" application text; placeholder state if absent. */
    spiritualExperience: z.string().optional(),
  }),
});

const beliefs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/beliefs' }),
  schema: z.object({
    title: z.string().min(1),
    order: z.number().int().min(1).max(3),
    essence: z.string().min(10).max(160),
    description: seoDescription,
    /** True while the client has supplied no source material at all. */
    awaitingContent: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().min(1),
    /**
     * Optional shorter <title> text for long headlines, so the browser/SERP
     * title stays near the 60-char pattern. The visible h1 keeps `title`.
     */
    seoTitle: z.string().max(42).optional(),
    description: seoDescription,
    datePublished: z.coerce.date(),
    dateModified: z.coerce.date(),
    /** Per-post OG image override; the themed default applies otherwise. */
    ogImage: z
      .object({
        src: z.string(),
        width: z.number(),
        height: z.number(),
        alt: z.string(),
      })
      .optional(),
    /** Related bridging keys (slugs) for contextual crosslinks. */
    relatedKeys: z.array(z.string()).default([]),
  }),
});

/**
 * Long-form copy for standalone pages (About, Protocols, Contact, Privacy).
 * Templates provide structure; every word lives here so a redesign never
 * touches content and a content wave never touches a template.
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string().min(1),
    description: seoDescription,
  }),
});

const faqs = defineCollection({
  loader: file('./src/content/faqs.json'),
  schema: z.object({
    id: z.string(),
    order: z.number().int(),
    question: z.string().min(1),
    answer: z.string().min(1),
  }),
});

const testimonials = defineCollection({
  loader: file('./src/content/testimonials.json'),
  schema: z.object({
    id: z.string(),
    heading: z.string().min(1),
    quote: z.string().min(1),
    name: z.string().min(1),
  }),
});

export const collections = { keys, beliefs, posts, pages, faqs, testimonials };
