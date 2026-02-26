import type { MetadataRoute } from "next";
import { fetchAllArticlesServer } from "@/lib/api";
import { newsArticles } from "@/data/news";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles;
  try {
    articles = await fetchAllArticlesServer();
  } catch {
    articles = newsArticles;
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: "https://appify.global", lastModified: new Date() },
    { url: "https://appify.global/about", lastModified: new Date() },
    { url: "https://appify.global/services", lastModified: new Date() },
    { url: "https://appify.global/projects", lastModified: new Date() },
    { url: "https://appify.global/news", lastModified: new Date() },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => {
    let lastModified = new Date();
    if (a.date) {
      // API may return "DD/MM/YYYY" or ISO string
      const parsed = a.date.includes("/")
        ? (() => {
            const [d, m, y] = a.date!.split("/");
            return new Date(parseInt(y!, 10), parseInt(m!, 10) - 1, parseInt(d!, 10));
          })()
        : new Date(a.date);
      if (!Number.isNaN(parsed.getTime())) lastModified = parsed;
    }
    return {
      url: `https://appify.global/news/${a.slug}`,
      lastModified,
    };
  });

  return [...staticPages, ...articlePages];
}
