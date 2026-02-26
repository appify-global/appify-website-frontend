/**
 * API client for fetching news articles.
 * Falls back to static data if API fails or USE_STATIC_DATA is enabled.
 */

import { NewsArticle } from "@/data/news";
import { featuredArticles, latestArticles } from "@/data/news";

// ===========================================================================
// Constants
// ===========================================================================

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://appify-backend-production-5a98.up.railway.app";
const USE_STATIC_DATA = process.env.NEXT_PUBLIC_USE_STATIC_DATA === "true";

/** In-memory cache lifetime for client-side prefetched articles (ms). */
const CLIENT_CACHE_TTL_MS = 60_000;

/** Default fetch timeout for API calls (ms). */
const DEFAULT_TIMEOUT_MS = 4_000;

/** Extended timeout for listing endpoints that may return many articles (ms). */
const LISTING_TIMEOUT_MS = 8_000;

/** Timeout for server-side ISR fetches — falls back to static data on timeout. */
const SERVER_TIMEOUT_MS = 5_000;

/** ISR revalidation interval for server-side fetchers (seconds). */
const ISR_REVALIDATE_S = 60;

// ===========================================================================
// Types
// ===========================================================================

interface ApiNewsArticle {
  id?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  topics?: string;
  category?: string;
  author?: string;
  imageUrl?: string;
  timestamp?: string;
  date?: string;
  isFeatured?: boolean;
  content?: NewsArticle["content"];
  metaTitle?: string;
  metaDescription?: string;
}

interface ApiNewsEnvelope {
  data?: ApiNewsArticle[];
  items?: ApiNewsArticle[];
  articles?: ApiNewsArticle[];
  page?: number;
  totalPages?: number;
  hasMore?: boolean;
}

// ===========================================================================
// Internal Helpers
// ===========================================================================

async function fetchWithTimeout(
  input: string,
  init?: RequestInit,
  timeoutMs = DEFAULT_TIMEOUT_MS
) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

const toNewsArticle = (
  article: ApiNewsArticle,
  stripContent = false
): NewsArticle => ({
  id: article.id || article.slug || crypto.randomUUID(),
  slug: article.slug || "",
  title: article.title || "",
  excerpt: article.excerpt || "",
  category: article.topics || article.category || "AI",
  topics: article.topics || article.category || "AI",
  author: article.author || "Appify",
  imageUrl: article.imageUrl || "",
  timestamp: article.timestamp || "",
  date: article.date || "",
  isFeatured: article.isFeatured || false,
  content: stripContent ? [] : (article.content || []),
  metaTitle: article.metaTitle || "",
  metaDescription: article.metaDescription || "",
});

/** Extract an array of articles from the backend's response envelope. */
const extractArticleArray = (payload: unknown): ApiNewsArticle[] => {
  if (Array.isArray(payload)) return payload as ApiNewsArticle[];
  const obj = payload as ApiNewsEnvelope | null;
  if (!obj) return [];
  if (Array.isArray(obj.data)) return obj.data;
  if (Array.isArray(obj.items)) return obj.items;
  if (Array.isArray(obj.articles)) return obj.articles;
  return [];
};

/**
 * Extract a single article from the API response envelope.
 * The backend may return the article directly, wrapped in `{ article }`,
 * or as a single-element array.
 */
function extractSingleArticle(payload: unknown): ApiNewsArticle | null {
  if (Array.isArray(payload)) {
    return (payload[0] as ApiNewsArticle | undefined) ?? null;
  }
  const obj = payload as Record<string, unknown> | null;
  if (!obj) return null;
  if (obj.article && typeof obj.article === "object") {
    return obj.article as ApiNewsArticle;
  }
  if (obj.slug || obj.title) {
    return obj as unknown as ApiNewsArticle;
  }
  return null;
}

/**
 * Remove duplicate articles by id or slug, keeping first occurrence.
 * Uses a Set for O(n) performance instead of findIndex O(n^2).
 */
export function deduplicateArticles<T extends { id?: string; slug?: string }>(
  articles: T[]
): T[] {
  const seen = new Set<string>();
  return articles.filter((article) => {
    const key = article.id || article.slug || "";
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Client-side text search across article fields. */
export function searchArticlesLocally(
  query: string,
  articles: NewsArticle[]
): NewsArticle[] {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      (a.category || "").toLowerCase().includes(q) ||
      (a.topics || "").toLowerCase().includes(q) ||
      a.content?.some((block) => block.text?.toLowerCase().includes(q))
  );
}

// ===========================================================================
// In-Memory Cache (client-side prefetch)
// ===========================================================================

let _allArticlesCache: { data: NewsArticle[]; ts: number } | null = null;
let _inflight: Promise<NewsArticle[]> | null = null;

/**
 * Fetch articles for listing (cached + deduped in-flight).
 * Strips content[] bodies — listing only needs metadata.
 */
async function fetchArticlesFromAPI(): Promise<NewsArticle[]> {
  if (_allArticlesCache && Date.now() - _allArticlesCache.ts < CLIENT_CACHE_TTL_MS) {
    return _allArticlesCache.data;
  }

  if (_inflight) return _inflight;

  _inflight = (async () => {
    try {
      const response = await fetchWithTimeout(
        `${API_BASE_URL}/api/news?status=published&limit=200`,
        {
          cache: "no-store",
          headers: { "Content-Type": "application/json", "Accept-Encoding": "gzip" },
        },
        LISTING_TIMEOUT_MS
      );

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const payload = await response.json();
      const items = extractArticleArray(payload);
      const result = deduplicateArticles(items).map((a) => toNewsArticle(a, true));
      _allArticlesCache = { data: result, ts: Date.now() };
      return result;
    } catch (error) {
      console.error("Failed to fetch articles from API:", error);
      throw error;
    } finally {
      _inflight = null;
    }
  })();

  return _inflight;
}

// ===========================================================================
// Public API — Server (ISR)
// ===========================================================================

/**
 * Fetch all published articles via ISR (server components only).
 * @throws {Error} On non-2xx response. Callers should catch and provide fallback data.
 */
export async function fetchAllArticlesServer(): Promise<NewsArticle[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SERVER_TIMEOUT_MS);

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/news?status=published&limit=200`,
      {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: ISR_REVALIDATE_S },
        signal: controller.signal,
      }
    );

    if (!res.ok) throw new Error(`API ${res.status}`);

    const payload = await res.json();
    const items = extractArticleArray(payload);
    return deduplicateArticles(items).map((a) => toNewsArticle(a, true));
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetch a single article by slug via ISR (server components only).
 * @returns The article, or null if not found (404).
 * @throws {Error} On non-404 API errors. Callers should catch and provide fallback data.
 */
export async function fetchArticleBySlugServer(
  slug: string
): Promise<NewsArticle | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SERVER_TIMEOUT_MS);

  try {
    const res = await fetch(`${API_BASE_URL}/api/news/${slug}`, {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: ISR_REVALIDATE_S },
      signal: controller.signal,
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`API ${res.status}`);
    }

    const payload = await res.json();
    const article = extractSingleArticle(payload);
    if (!article) return null;
    return toNewsArticle(article);
  } finally {
    clearTimeout(timer);
  }
}

// ===========================================================================
// Public API — Client
// ===========================================================================

/**
 * Fire-and-forget cache warm-up — call on hover / intent signals
 * so data is ready before the user lands on /news.
 * Silently ignores errors.
 */
export function prefetchNewsArticles(): void {
  if (USE_STATIC_DATA) return;
  if (_allArticlesCache && Date.now() - _allArticlesCache.ts < CLIENT_CACHE_TTL_MS) return;
  if (_inflight) return;
  fetchArticlesFromAPI().catch(() => {});
}

/**
 * Search articles by query string. Never throws — falls back to static data on failure.
 */
export async function searchArticles(query: string): Promise<NewsArticle[]> {
  if (USE_STATIC_DATA || !query.trim()) {
    const allArticles = [...featuredArticles, ...latestArticles];
    return searchArticlesLocally(query, allArticles);
  }

  try {
    const response = await fetchWithTimeout(
      `${API_BASE_URL}/api/news/search?q=${encodeURIComponent(query)}`,
      {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const payload = await response.json();
    return extractArticleArray(payload).map((a) => toNewsArticle(a));
  } catch (error) {
    console.error("Search API failed, searching static data:", error);
    const allArticles = [...featuredArticles, ...latestArticles];
    return searchArticlesLocally(query, allArticles);
  }
}
