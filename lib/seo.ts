/**
 * SEO helpers: meta description length for SERP snippets (Google typically shows ~155–160 chars).
 */
const META_DESC_MAX_LENGTH = 155;

/**
 * Truncate text to maxLen at a word boundary for use as meta description.
 * Strips HTML and normalizes whitespace.
 */
export function truncateMetaDescription(text: string, maxLen = META_DESC_MAX_LENGTH): string {
  if (!text || typeof text !== "string") return "";
  const stripped = text.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
  if (stripped.length <= maxLen) return stripped;
  const cut = stripped.slice(0, maxLen + 1);
  const lastSpace = cut.lastIndexOf(" ");
  const end = lastSpace > maxLen * 0.7 ? lastSpace : maxLen;
  return cut.slice(0, end).trim() + "…";
}
