import { NextResponse } from "next/server";
import { fetchAllArticlesServer } from "@/lib/api";
import { newsArticles } from "@/data/news";
import { projectsData } from "@/data/projects";
import { getAllServices } from "@/lib/data/services";

const BASE = "https://appify.global";

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
    ];

    const articlePages = articles.map((a) => {
      let lastModified = new Date();
      if (a.date) {
        const parsed = a.date.includes("/")
          ? (() => {
              const [d, m, y] = a.date!.split("/");
              return new Date(parseInt(y!, 10), parseInt(m!, 10) - 1, parseInt(d!, 10));
            })()
          : new Date(a.date);
        if (!Number.isNaN(parsed.getTime())) lastModified = parsed;
      }
      return { url: `${BASE}/news/${a.slug}`, lastModified };
    });

    const projectPages = projectsData.map((project) => ({
      url: `${BASE}/projects/${project.slug}`,
      lastModified: new Date(),
    }));

    const servicePages = getAllServices().map((service) => ({
      url: `${BASE}/services/${service.category}/${service.slug}`,
      lastModified: new Date(),
    }));

    const all = [...staticPages, ...articlePages, ...projectPages, ...servicePages];
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
