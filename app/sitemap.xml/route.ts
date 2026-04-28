import { NextResponse } from "next/server";
import { fetchAllArticlesServer } from "@/lib/api";
import { newsArticles } from "@/data/news";
import { projectsData } from "@/data/projects";
import { getAllServices } from "@/lib/data/services";
import { locations } from "@/data/locations";
import { authorBios, slugifyAuthor } from "@/data/authors";
import { topics } from "@/data/topics";

const BASE = "https://www.appify.global";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toLastmod(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export async function GET() {
  try {
    let articles;
    try {
      const result = await fetchAllArticlesServer();
      articles = result.articles;
    } catch {
      articles = newsArticles;
    }

    const staticPages: { url: string; lastModified: Date }[] = [
      { url: `${BASE}`, lastModified: new Date() },
      { url: `${BASE}/about`, lastModified: new Date() },
      { url: `${BASE}/services`, lastModified: new Date() },
      { url: `${BASE}/projects`, lastModified: new Date() },
      { url: `${BASE}/news`, lastModified: new Date() },
      { url: `${BASE}/news/archive`, lastModified: new Date() },
      { url: `${BASE}/team`, lastModified: new Date() },
      { url: `${BASE}/locations`, lastModified: new Date() },
      { url: `${BASE}/topics`, lastModified: new Date() },
    ];

    const topicPages = topics.map((t) => ({
      url: `${BASE}/topics/${t.slug}`,
      lastModified: new Date(),
    }));

    const locationPages = locations.map((l) => ({
      url: `${BASE}/locations/${l.slug}`,
      lastModified: new Date(),
    }));

    const authorSlugs = new Set<string>(authorBios.map((a) => a.slug));
    for (const article of articles) {
      if (article.author) authorSlugs.add(slugifyAuthor(article.author));
    }
    const authorPages = Array.from(authorSlugs).map((slug) => ({
      url: `${BASE}/team/${slug}`,
      lastModified: new Date(),
    }));

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

    const articlePages = articles.map((a) => ({
      url: `${BASE}/news/${a.slug}`,
      lastModified: parseDate(a.updatedAt) ?? parseDate(a.date) ?? new Date(),
    }));

    const projectPages = projectsData.map((project) => ({
      url: `${BASE}/projects/${project.slug}`,
      lastModified: new Date(),
    }));

    const servicePages = getAllServices().map((service) => ({
      url: `${BASE}/services/${service.category}/${service.slug}`,
      lastModified: new Date(),
    }));

    const all = [
      ...staticPages,
      ...articlePages,
      ...projectPages,
      ...servicePages,
      ...locationPages,
      ...authorPages,
      ...topicPages,
    ];
    const urlEntries = all
      .map(
        (e) =>
          `  <url><loc>${escapeXml(e.url)}</loc><lastmod>${toLastmod(e.lastModified)}</lastmod></url>`
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
      },
    });
  } catch (e) {
    console.error("Sitemap error:", e);
    return new NextResponse(
      '<?xml version="1.0"?><error>Sitemap unavailable</error>',
      {
        status: 500,
        headers: { "Content-Type": "application/xml" },
      }
    );
  }
}
