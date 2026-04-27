import { fetchAllArticlesServer } from "@/lib/api";
import { newsArticles, type NewsArticle } from "@/data/news";
import { buildArticleDescription } from "@/lib/seo";

export const revalidate = 3600;

const SITE_URL = "https://appify.global";
const FEED_TITLE = "Appify News";
const FEED_DESCRIPTION =
  "AI engineering, custom software development, automation, and digital transformation insights from Appify.";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(dateStr: string | undefined): string {
  if (!dateStr) return new Date().toUTCString();
  if (dateStr.includes("/")) {
    const [d, m, y] = dateStr.split("/");
    if (d && m && y) {
      const date = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
      if (!Number.isNaN(date.getTime())) return date.toUTCString();
    }
  }
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? new Date().toUTCString() : parsed.toUTCString();
}

function articleToItem(a: NewsArticle): string {
  const url = `${SITE_URL}/news/${a.slug}`;
  const description = buildArticleDescription(a);
  const pubDate = toRfc822(a.updatedAt || a.date);
  const category = a.category || a.topics || "News";
  return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(category)}</category>
      ${a.author ? `<dc:creator>${escapeXml(a.author)}</dc:creator>` : ""}
      <description>${escapeXml(description)}</description>
    </item>`;
}

export async function GET() {
  let articles: NewsArticle[] = newsArticles;
  if (process.env.NEXT_PUBLIC_USE_STATIC_DATA !== "true") {
    try {
      const result = await fetchAllArticlesServer();
      if (result.articles.length > 0) articles = result.articles;
    } catch {
      /* keep static fallback */
    }
  }

  const items = articles.slice(0, 50).map(articleToItem).join("\n");
  const lastBuildDate = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(FEED_TITLE)}</title>
    <link>${SITE_URL}/news</link>
    <description>${escapeXml(FEED_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/news/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
