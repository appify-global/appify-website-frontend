/**
 * Video asset URLs for deployment.
 * Set NEXT_PUBLIC_FOUNDER_VIDEO_URL to your Railbucket URL in Railway Variables.
 * - Direct Railbucket URL → use /api/video/founder proxy (Range + CDN headers)
 * - public-buckets or CDN URL → use directly (already fast)
 */

const FOUNDER_URL = process.env.NEXT_PUBLIC_FOUNDER_VIDEO_URL || "";
const USE_DIRECT =
  process.env.NEXT_PUBLIC_VIDEO_USE_DIRECT === "true" ||
  /public-buckets|cdn\.|cloudfront\.net|r2\.dev|s3-public-presigner|storageapi\.dev/i.test(
    FOUNDER_URL
  );

/** Founder/reel video on home page (SubVideoText section) */
export const FOUNDER_VIDEO_SRC = FOUNDER_URL
  ? USE_DIRECT
    ? FOUNDER_URL
    : "/api/video/founder"
  : process.env.RAILWAY_ENVIRONMENT
    ? ""
    : "/Videos/Mennan Voice Cut.mp4";

/** Category videos for services page */
export function getCategoryVideoSrc(filename: string): string {
  const base = process.env.NEXT_PUBLIC_VIDEO_CDN_BASE;
  if (base) {
    return `${base.replace(/\/$/, "")}/${encodeURIComponent(filename)}`;
  }
  return `/Videos/${filename}`;
}
