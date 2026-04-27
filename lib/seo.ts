/**
 * SEO helpers: meta description length for SERP snippets (Google typically shows ~155–160 chars).
 */
import type { NewsArticle } from "@/data/news";

const META_DESC_MAX_LENGTH = 155;
const META_TITLE_MAX_LENGTH = 60;

const BRAND_KEYWORDS = [
  "Appify",
  "custom software development",
  "AI engineering",
  "digital transformation",
];

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

/** Truncate a title at a word boundary, keeping it under SERP cutoff. */
export function truncateMetaTitle(text: string, maxLen = META_TITLE_MAX_LENGTH): string {
  if (!text || typeof text !== "string") return "";
  const stripped = text.replace(/\s+/g, " ").trim();
  if (stripped.length <= maxLen) return stripped;
  const cut = stripped.slice(0, maxLen + 1);
  const lastSpace = cut.lastIndexOf(" ");
  const end = lastSpace > maxLen * 0.6 ? lastSpace : maxLen;
  return cut.slice(0, end).trim() + "…";
}

/** Pull the first non-empty paragraph from an article's content blocks. */
export function firstParagraph(article: Pick<NewsArticle, "content">): string {
  if (!article.content) return "";
  const para = article.content.find(
    (b) => b.type === "paragraph" && typeof b.text === "string" && b.text.trim().length > 0,
  );
  return para?.text?.trim() ?? "";
}

/**
 * Build a SERP-optimised title for an article. Adds the category as a contextual
 * suffix when it doesn't already appear in the title.
 */
export function buildArticleTitle(article: Pick<NewsArticle, "title" | "category" | "metaTitle">): string {
  if (article.metaTitle && article.metaTitle.trim().length > 0) {
    return truncateMetaTitle(article.metaTitle);
  }
  const category = (article.category || "").trim();
  const title = (article.title || "").trim();
  const titleHasCategory = category && title.toLowerCase().includes(category.toLowerCase());
  const composed = category && !titleHasCategory ? `${title} | ${category} News` : title;
  return truncateMetaTitle(composed);
}

/**
 * Build a SERP-optimised description, preferring metaDescription, then the first
 * paragraph, then the excerpt. Avoids returning the generic excerpt when an article
 * body exists.
 */
export function buildArticleDescription(
  article: Pick<NewsArticle, "metaDescription" | "excerpt" | "content">,
): string {
  if (article.metaDescription && article.metaDescription.trim().length > 0) {
    return truncateMetaDescription(article.metaDescription);
  }
  const para = firstParagraph(article);
  if (para.length > 60) return truncateMetaDescription(para);
  return truncateMetaDescription(article.excerpt || para || "");
}

/**
 * Build a keywords list for an article: category, topics (comma-separated),
 * and a small number of branded keywords for topical clustering.
 */
export function buildArticleKeywords(
  article: Pick<NewsArticle, "category" | "topics" | "title">,
): string[] {
  const out = new Set<string>();
  const push = (v?: string) => {
    if (!v) return;
    v.split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .forEach((t) => out.add(t));
  };
  push(article.category);
  push(article.topics);
  // Pull the first 3 capitalised multi-word phrases from the title as soft keyword signals.
  const titleWords = (article.title || "").split(/\s+/);
  for (let i = 0; i < titleWords.length - 1 && out.size < 12; i++) {
    const a = titleWords[i];
    const b = titleWords[i + 1];
    if (a && b && /^[A-Z]/.test(a) && /^[A-Z]/.test(b) && a.length > 2 && b.length > 2) {
      out.add(`${a} ${b}`);
    }
  }
  BRAND_KEYWORDS.forEach((k) => out.add(k));
  return Array.from(out).slice(0, 15);
}
