import type { Metadata } from "next";
import { fetchNewsPageServer, fetchAllArticlesServer } from "@/lib/api";
import { featuredArticles, latestArticles } from "@/data/news";
import { JsonLd } from "@/components/JsonLd";
import NewsPageClient from "./NewsPageClient";

export const revalidate = 3600;

const PAGE_TITLE = "AI, Software & Digital Transformation News";
const PAGE_DESCRIPTION =
  "Insights on AI engineering, custom software development, automation, and digital transformation from the Appify team — covering Australia, UAE, and Qatar.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "AI news",
    "software development news",
    "digital transformation",
    "automation",
    "machine learning",
    "ERP",
    "mobile app development",
    "Appify news",
  ],
  alternates: {
    canonical: "/news",
    types: {
      "application/rss+xml": [
        { url: "/news/feed.xml", title: "Appify News RSS feed" },
      ],
    },
  },
  openGraph: {
    title: `${PAGE_TITLE} | Appify`,
    description: PAGE_DESCRIPTION,
    url: "https://appify.global/news",
    images: ["/appify.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} | Appify`,
    description: PAGE_DESCRIPTION,
    images: ["/appify.png"],
  },
};

export default async function NewsPage() {
  const useStatic = process.env.NEXT_PUBLIC_USE_STATIC_DATA === "true";

  let initialFeatured = featuredArticles;
  let initialLatest = latestArticles;
  let initialHasMore = false;
  let initialNextPage = 2;

  if (!useStatic) {
    try {
      const result = await fetchAllArticlesServer();
      const featured = result.articles.filter((a) => a.isFeatured);
      initialFeatured = featured.length > 0 ? featured : result.articles.slice(0, 3);
      initialLatest = result.articles;
      initialHasMore = result.hasMore;
      initialNextPage = result.nextPage;
    } catch (err) {
      console.error("News page API fetch failed:", err);
      // Fall back to a single-page fetch so a transient backend hiccup
      // still yields fresh content rather than the static fixtures.
      try {
        const fallback = await fetchNewsPageServer(1);
        initialLatest = fallback.articles;
        initialFeatured = fallback.articles.filter((a) => a.isFeatured);
        if (initialFeatured.length === 0) initialFeatured = fallback.articles.slice(0, 3);
        initialHasMore = fallback.hasMore;
        initialNextPage = fallback.nextPage;
      } catch {
        /* keep static fallback */
      }
    }
  }

  const baseUrl = "https://appify.global";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "News", item: `${baseUrl}/news` },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Appify News",
    itemListElement: initialLatest.slice(0, 20).map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseUrl}/news/${a.slug}`,
      name: a.title,
    })),
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${baseUrl}/news#collection`,
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${baseUrl}/news`,
    isPartOf: { "@id": `${baseUrl}/#website` },
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema, itemListSchema, collectionSchema]} />
      <NewsPageClient
        initialFeatured={initialFeatured}
        initialLatest={initialLatest}
        initialHasMore={initialHasMore}
        initialNextPage={initialNextPage}
      />
    </>
  );
}
