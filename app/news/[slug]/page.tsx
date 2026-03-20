import type { Metadata } from "next";
import { getArticleBySlug } from "@/lib/api";
import NewsArticleClient from "./NewsArticleClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Article | Appify" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/news/${slug}`,
    },
    openGraph: {
      title: `${article.title} | Appify`,
      description: article.excerpt || "",
      url: `https://appify.global/news/${slug}`,
      images: [article.imageUrl || "/appify.png"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt || "",
      images: [article.imageUrl || "/appify.png"],
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  return <NewsArticleClient initialArticle={article} />;
}
