import { fetchAllArticlesServer } from "@/lib/api";
import { newsArticles, type NewsArticle } from "@/data/news";
import HomeNewsSection from "@/components/home/HomeNewsSection";
import HomeClient from "./HomeClient";

export const revalidate = 3600;

async function loadHomepageArticles(): Promise<NewsArticle[]> {
  if (process.env.NEXT_PUBLIC_USE_STATIC_DATA === "true") return newsArticles;
  try {
    const result = await fetchAllArticlesServer();
    return result.articles.length > 0 ? result.articles : newsArticles;
  } catch {
    return newsArticles;
  }
}

export default async function HomePage() {
  const articles = await loadHomepageArticles();
  // Prefer featured for the homepage; fall back to most-recent.
  const featured = articles.filter((a) => a.isFeatured);
  const homepageArticles = featured.length >= 3 ? featured.slice(0, 3) : articles.slice(0, 3);

  return (
    <HomeClient
      newsSection={<HomeNewsSection articles={homepageArticles} />}
    />
  );
}
