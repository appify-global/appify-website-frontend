/**
 * Video asset URLs for deployment.
 * Uses env vars for CDN/external hosting (Railway, etc.) where Git LFS files may not be available.
 * Falls back to local /public paths for dev.
 */

/** CDN used previously when LFS files weren't available in deploy (cdn.ebadfd.tech) */
const FOUNDER_VIDEO_CDN_FALLBACK = "https://cdn.ebadfd.tech/Appify_Introduction_CEO_cropped.mp4";

/** Founder/reel video on home page (SubVideoText section) */
export const FOUNDER_VIDEO_SRC =
  process.env.NEXT_PUBLIC_FOUNDER_VIDEO_URL ||
  (process.env.RAILWAY_ENVIRONMENT ? FOUNDER_VIDEO_CDN_FALLBACK : "/Videos/Mennan Voice Cut.mp4");

/** Category videos for services page */
export function getCategoryVideoSrc(filename: string): string {
  const base = process.env.NEXT_PUBLIC_VIDEO_CDN_BASE;
  if (base) {
    return `${base.replace(/\/$/, "")}/${encodeURIComponent(filename)}`;
  }
  return `/Videos/${filename}`;
}
