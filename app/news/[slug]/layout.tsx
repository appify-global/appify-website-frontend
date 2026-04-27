import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { fetchArticleBySlugServer } from "@/lib/api";
import { newsArticles, type NewsArticle } from "@/data/news";
import { JsonLd } from "@/components/JsonLd";
import {
  buildArticleDescription,
  buildArticleKeywords,
  buildArticleTitle,
  firstParagraph,
} from "@/lib/seo";

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>;

const getCachedArticle = cache(async (slug: string): Promise<NewsArticle | null> => {
  let article = null;
  try {
    article = await fetchArticleBySlugServer(slug);
  } catch {
    article = null;
  }
  const fallback = newsArticles.find((item) => item.slug === slug);
  return article ?? fallback ?? null;
});

function toISODate(dateStr: string): string {
  if (!dateStr) return new Date().toISOString();
  if (dateStr.includes("/")) {
    const [d, m, y] = dateStr.split("/");
    if (d && m && y) {
      const year = parseInt(y, 10);
      const month = parseInt(m, 10) - 1;
      const day = parseInt(d, 10);
      const date = new Date(year, month, day);
      if (!Number.isNaN(date.getTime())) return date.toISOString();
    }
  }
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function wordCount(article: NewsArticle): number {
  if (!article.content) return 0;
  return article.content.reduce((sum, b) => {
    if (b.type === "paragraph" || b.type === "heading" || b.type === "subheading") {
      return sum + (b.text?.split(/\s+/).filter(Boolean).length ?? 0);
    }
    return sum;
  }, 0);
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCachedArticle(slug);

  if (!data) {
    notFound();
  }

  const baseUrl = "https://appify.global";
  const title = buildArticleTitle(data);
  const description = buildArticleDescription(data);
  const keywords = buildArticleKeywords(data);
  const imagePath = data.imageUrl || "/appify.png";
  const imageUrl = imagePath.startsWith("http") ? imagePath : `${baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  const canonicalPath = `/news/${data.slug || slug}`;
  const publishedTime = toISODate(data.date);
  const modifiedTime = toISODate(data.updatedAt || data.date);

  return {
    title,
    description,
    keywords,
    authors: data.author ? [{ name: data.author }] : undefined,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${canonicalPath}`,
      images: [imageUrl],
      type: "article",
      publishedTime,
      modifiedTime,
      authors: data.author ? [data.author] : undefined,
      section: data.category,
      tags: keywords,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function NewsArticleLayout({ children, params }: LayoutProps) {
  const { slug } = await params;
  const data = await getCachedArticle(slug);
  if (!data) notFound();

  const baseUrl = "https://appify.global";
  const articleUrl = `${baseUrl}/news/${data.slug || slug}`;
  const imagePath = data.imageUrl || "/appify.png";
  const imageUrl = imagePath.startsWith("http") ? imagePath : `${baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  const description = buildArticleDescription(data);
  const keywords = buildArticleKeywords(data);
  const words = wordCount(data);
  const opening = firstParagraph(data);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: data.title,
    description,
    image: [imageUrl],
    datePublished: toISODate(data.date),
    dateModified: toISODate(data.updatedAt || data.date),
    articleSection: data.category,
    keywords: keywords.join(", "),
    inLanguage: "en",
    ...(words > 0 ? { wordCount: words } : {}),
    ...(opening ? { articleBody: opening } : {}),
    author: {
      "@type": "Person",
      name: data.author || "Appify",
    },
    publisher: {
      "@type": "Organization",
      name: "Appify",
      logo: { "@type": "ImageObject", url: `${baseUrl}/appify.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "News", item: `${baseUrl}/news` },
      { "@type": "ListItem", position: 3, name: data.title, item: articleUrl },
    ],
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      {children}
    </>
  );
}
