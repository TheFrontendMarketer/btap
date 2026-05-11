import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const collections = {
	work: defineCollection({
		// Load Markdown files in the src/content/work directory.
		loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			/** Optional card-only image URL (detail page still uses `img`). */
			thumb: z.string().optional(),
			img_alt: z.string().optional(),
		}),
	}),
	blog: defineCollection({
		loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			category: z.string(),
			tags: z.array(z.string()).default([]),
			/** URL segment after /blog/{category}/ */
			slug: z.string(),
			/** Master image; Cloudinary URLs get automatic crops unless overrides are set. */
			img: z.string(),
			img_alt: z.string().optional(),
			/** Overrides grid `thumb` transform (non-Cloudinary or custom crop). */
			thumb: z.string().optional(),
			/** Overrides featured-slot transform. */
			featured_img: z.string().optional(),
			/** Overrides article hero transform. */
			hero_img: z.string().optional(),
			featured: z.boolean().optional().default(false),
			draft: z.boolean().optional().default(false),
		}),
	}),
};
