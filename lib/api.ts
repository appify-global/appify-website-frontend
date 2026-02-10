/**
 * API client for fetching news articles
 * Falls back to static data if API fails or USE_STATIC_DATA is enabled
 */

import { NewsArticle } from "@/data/news";
import { featuredArticles, latestArticles } from "@/data/news";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const USE_STATIC_DATA = process.env.NEXT_PUBLIC_USE_STATIC_DATA === "true";

// Debug logging (only in development)
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  console.log("API Configuration:", {
    API_BASE_URL,
    USE_STATIC_DATA,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_USE_STATIC_DATA: process.env.NEXT_PUBLIC_USE_STATIC_DATA,
  });
}

/**
 * Fetch all articles from API
 */
export async function fetchArticlesFromAPI(): Promise<NewsArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news?status=published`, {
      cache: "no-store", // Always fetch fresh data
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Map API response to frontend format
    // API returns 'topics' but frontend expects 'category'
    return data.map((article: any) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      category: article.topics || article.category || "AI", // Map topics to category
      author: article.author,
      imageUrl: article.imageUrl,
      timestamp: article.timestamp,
      date: article.date,
      isFeatured: article.isFeatured || false,
      content: article.content || [],
    }));
  } catch (error) {
    console.error("Failed to fetch articles from API:", error);
    throw error;
  }
}

/**
 * Fetch single article by slug from API
 */
export async function fetchArticleBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/news/${slug}`, {
      cache: "no-store", // Always fetch fresh data
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`API error: ${response.status}`);
    }

    const article = await response.json();
    
    // Map API response to frontend format
    return {
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      category: article.topics || article.category || "AI", // Map topics to category
      author: article.author,
      imageUrl: article.imageUrl,
      timestamp: article.timestamp,
      date: article.date,
      isFeatured: article.isFeatured || false,
      content: article.content || [],
    };
  } catch (error) {
    console.error(`Failed to fetch article ${slug} from API:`, error);
    throw error;
  }
}

/**
 * Get featured articles - uses API or static data based on config
 */
export async function getFeaturedArticles(): Promise<NewsArticle[]> {
  if (USE_STATIC_DATA) {
    return featuredArticles;
  }

  try {
    const articles = await fetchArticlesFromAPI();
    const featured = articles.filter((article) => article.isFeatured);
    // If no featured articles, show first 3 latest articles as featured
    if (featured.length === 0 && articles.length > 0) {
      return articles.slice(0, 3);
    }
    return featured;
  } catch (error) {
    console.warn("Falling back to static data for featured articles");
    return featuredArticles;
  }
}

/**
 * Get latest articles - uses API or static data based on config
 * Returns ALL articles (not filtered by featured status)
 */
export async function getLatestArticles(): Promise<NewsArticle[]> {
  if (USE_STATIC_DATA) {
    return latestArticles;
  }

  try {
    // Fetch all published articles (no featured filter)
    const articles = await fetchArticlesFromAPI();
    console.log(`[API] Fetched ${articles.length} articles for latest news`);
    return articles;
  } catch (error) {
    console.warn("Falling back to static data for latest articles");
    return latestArticles;
  }
}

/**
 * Search articles by query string
 */
export async function searchArticles(query: string): Promise<NewsArticle[]> {
  if (USE_STATIC_DATA || !query.trim()) {
    // Client-side search fallback for static data
    const allArticles = [...featuredArticles, ...latestArticles];
    const q = query.toLowerCase();
    return allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        (a.category || "").toLowerCase().includes(q) ||
        (a.topics || "").toLowerCase().includes(q)
    );
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/news/search?q=${encodeURIComponent(query)}`,
      {
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.map((article: any) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      category: article.topics || article.category || "AI",
      author: article.author,
      imageUrl: article.imageUrl,
      timestamp: article.timestamp,
      date: article.date,
      isFeatured: article.isFeatured || false,
      content: article.content || [],
    }));
  } catch (error) {
    console.error("Search API failed, searching static data:", error);
    const allArticles = [...featuredArticles, ...latestArticles];
    const q = query.toLowerCase();
    return allArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q)
    );
  }
}

/**
 * Get article by slug - uses API or static data based on config
 */
export async function getArticleBySlug(slug: string): Promise<NewsArticle | null> {
  if (USE_STATIC_DATA) {
    const allArticles = [...featuredArticles, ...latestArticles];
    return allArticles.find((article) => article.slug === slug) || null;
  }

  try {
    return await fetchArticleBySlug(slug);
  } catch (error) {
    console.warn(`Falling back to static data for article: ${slug}`);
    const allArticles = [...featuredArticles, ...latestArticles];
    return allArticles.find((article) => article.slug === slug) || null;
  }
}
