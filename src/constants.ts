/**
 * Slug used in URLs (e.g. /blog/marvel-legends).
 */
export function categoryToSlug(category: string): string {
	return category
		.toLowerCase()
		.trim()
		.replace(/&/g, "and")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/** Index page for one category (lists posts in that category). */
export function getBlogCategoryPath(category: string): string {
	return `/blog/${categoryToSlug(category)}`;
}

/** Canonical URL path for a blog post. */
export function getBlogPostPath(category: string, slug: string): string {
	return `/blog/${categoryToSlug(category)}/${slug}`;
}
