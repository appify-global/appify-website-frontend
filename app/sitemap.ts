import type { MetadataRoute } from "next";
import { fetchAllArticlesServer } from "@/lib/api";
import { newsArticles } from "@/data/news";
import { projectsData } from "@/data/projects";
import { getAllServices } from "@/lib/data/services";

export const revalidate = 3600; // regenerate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles;
  try {
    const result = await fetchAllArticlesServer();
    articles = result.articles;
  } catch {
    articles = newsArticles;
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: "https://appify.global", lastModified: new Date() },
    { url: "https://appify.global/about", lastModified: new Date() },
    { url: "https://appify.global/services", lastModified: new Date() },
    { url: "https://appify.global/projects", lastModified: new Date() },
    { url: "https://appify.global/news", lastModified: new Date() },
    { url: "https://appify.global/news/archive", lastModified: new Date() },
  ];

  const parseDate = (input?: string): Date | null => {
    if (!input) return null;
    if (input.includes("/")) {
      const [d, m, y] = input.split("/");
      if (d && m && y) {
        const parsed = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
        if (!Number.isNaN(parsed.getTime())) return parsed;
      }
    }
    const parsed = new Date(input);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => {
    const lastModified = parseDate(a.updatedAt) ?? parseDate(a.date) ?? new Date();
    return {
      url: `https://appify.global/news/${a.slug}`,
      lastModified,
    };
  });

  const projectPages: MetadataRoute.Sitemap = projectsData.map((project) => ({
    url: `https://appify.global/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  const servicePages: MetadataRoute.Sitemap = getAllServices().map((service) => ({
    url: `https://appify.global/services/${service.category}/${service.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...articlePages, ...projectPages, ...servicePages];
}
