import type { Metadata } from "next";
import { fetchAllArticlesServer } from "@/lib/api";
import { featuredArticles, latestArticles } from "@/data/news";
import NewsPageClient from "./NewsPageClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "News Room | Appify",
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

  if (!useStatic) {
    try {
      const all = await fetchAllArticlesServer();
      const featured = all.filter((a) => a.isFeatured);
      initialFeatured = featured.length > 0 ? featured : all.slice(0, 3);
      initialLatest = all;
    } catch {
      // Fallback to static on API failure
    }
  }

  return (
    <NewsPageClient
      initialFeatured={initialFeatured}
      initialLatest={initialLatest}
    />
  );
}
