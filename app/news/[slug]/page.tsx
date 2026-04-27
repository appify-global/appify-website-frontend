import {
  getArticleBySlug,
  fetchAllSlugsServer,
  fetchAllArticlesServer,
} from "@/lib/api";
import { newsArticles, type NewsArticle } from "@/data/news";
import NewsArticleClient from "./NewsArticleClient";

export const revalidate = 3600;
export const dynamicParams = true;

const RELATED_LIMIT = 3;

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_USE_STATIC_DATA === "true") return [];
  const slugs = await fetchAllSlugsServer();
  return slugs.map((slug) => ({ slug }));
}

function pickRelated(
  current: NewsArticle,
  pool: NewsArticle[],
  limit: number,
): NewsArticle[] {
  const currentCat = (current.category || current.topics || "").toUpperCase();
  const sameCat = pool.filter(
    (a) =>
      a.slug !== current.slug &&
      (a.category || a.topics || "").toUpperCase() === currentCat,
  );
  const others = pool.filter(
    (a) =>
      a.slug !== current.slug &&
      (a.category || a.topics || "").toUpperCase() !== currentCat,
  );
  return [...sameCat, ...others].slice(0, limit);
}

async function loadRelated(current: NewsArticle): Promise<NewsArticle[]> {
  if (process.env.NEXT_PUBLIC_USE_STATIC_DATA === "true") {
    return pickRelated(current, newsArticles, RELATED_LIMIT);
  }
  try {
    const result = await fetchAllArticlesServer();
    const pool = result.articles.length > 0 ? result.articles : newsArticles;
    return pickRelated(current, pool, RELATED_LIMIT);
  } catch {
    return pickRelated(current, newsArticles, RELATED_LIMIT);
  }
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  const related = article ? await loadRelated(article) : [];

  return (
    <NewsArticleClient
      initialArticle={article}
      relatedArticles={related}
    />
  );
}
