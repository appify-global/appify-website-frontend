/**
 * Video asset URLs for deployment.
 * Uses env vars for CDN/external hosting (Railway, etc.) where Git LFS files may not be available.
 * Falls back to local /public paths for dev.
 */

/** CDN used previously when LFS files weren't available in deploy (cdn.ebadfd.tech) */
const FOUNDER_VIDEO_CDN_FALLBACK = "https://railbucket-0bqb1b7ady2ufu.t3.storageapi.dev/videos/Appify_Introduction_CEO_cropped.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=tid_FWDdzKnJyAqrcaYfTWLeYZQBcTvTEBcbBU_uFLpoAMxDomNXSS%2F20260227%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20260227T081035Z&X-Amz-Expires=604800&X-Amz-Signature=765ee56dc4530c60672c6e5b9f68f18013c38a6e5143c22e84388b926768bdb8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject";

/** Founder/reel video on home page (SubVideoText section) */
export const FOUNDER_VIDEO_SRC =
  process.env.NEXT_PUBLIC_FOUNDER_VIDEO_URL ||
  FOUNDER_VIDEO_CDN_FALLBACK;

/** Category videos for services page */
export function getCategoryVideoSrc(filename: string): string {
  const base = process.env.NEXT_PUBLIC_VIDEO_CDN_BASE;
  if (base) {
    return `${base.replace(/\/$/, "")}/${encodeURIComponent(filename)}`;
  }
  return `/Videos/${filename}`;
}
