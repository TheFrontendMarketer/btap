/**
 * One master `img` (ideally `.../image/upload/v…/file`) plus optional overrides.
 * Cloudinary URLs get slot-specific crops with q_auto/f_auto (hero = 800×500).
 */

const UPLOAD = '/image/upload/';

export const BLOG_CLOUDINARY_TRANSFORMS = {
	hero: 'w_800,h_500,c_fill,g_auto,q_auto,f_auto',
	thumb: 'w_800,h_500,c_fill,g_auto,q_auto,f_auto',
	featured: 'w_1200,h_900,c_fill,g_auto,q_auto,f_auto',
} as const;

export type BlogImageFields = {
	img: string;
	thumb?: string | undefined;
	featured_img?: string | undefined;
	hero_img?: string | undefined;
};

function isCloudinaryDeliverUrl(url: string): boolean {
	const u = url.toLowerCase();
	return u.includes('res.cloudinary.com') && u.includes(UPLOAD);
}

/**
 * Inserts a transformation segment after `/image/upload/`, dropping any prior
 * transform chain before the first `v123…` segment (Cloudinary version folder).
 */
export function cloudinaryWithTransform(url: string, transform: string): string {
	if (!isCloudinaryDeliverUrl(url)) return url;
	const idx = url.indexOf(UPLOAD);
	if (idx === -1) return url;
	const base = url.slice(0, idx + UPLOAD.length);
	const tail = url.slice(idx + UPLOAD.length);
	const segments = tail.split('/').filter(Boolean);
	const versionIdx = segments.findIndex((s) => /^v\d+/i.test(s));
	const fromVersion =
		versionIdx >= 0
			? segments.slice(versionIdx).join('/')
			: segments.join('/');
	return `${base}${transform}/${fromVersion}`;
}

export function getBlogHeroSrc(d: BlogImageFields): string {
	return d.hero_img ?? cloudinaryWithTransform(d.img, BLOG_CLOUDINARY_TRANSFORMS.hero);
}

export function getBlogThumbSrc(d: BlogImageFields): string {
	return d.thumb ?? cloudinaryWithTransform(d.img, BLOG_CLOUDINARY_TRANSFORMS.thumb);
}

export function getBlogFeaturedSrc(d: BlogImageFields): string {
	return d.featured_img ?? cloudinaryWithTransform(d.img, BLOG_CLOUDINARY_TRANSFORMS.featured);
}
