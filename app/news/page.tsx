import type { Metadata } from "next";
import { fetchAllArticlesServer } from "@/lib/api";
import { featuredArticles, latestArticles } from "@/data/news";
import NewsPageClient from "./NewsPageClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News Room",
  description:
    "Latest insights on AI, automation, product design, engineering, and digital transformation from Appify.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "News Room | Appify",
    description:
      "Latest insights on AI, automation, product design, engineering, and digital transformation from Appify.",
    url: "https://appify.global/news",
    images: ["/appify.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News Room | Appify",
    description:
      "Latest insights on AI, automation, product design, engineering, and digital transformation from Appify.",
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
    }
  }

  return (
    <NewsPageClient
      initialFeatured={initialFeatured}
      initialLatest={initialLatest}
      initialHasMore={initialHasMore}
      initialNextPage={initialNextPage}
    />
  );
}
