import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { fetchArticleBySlugServer } from "@/lib/api";
import { newsArticles, type NewsArticle } from "@/data/news";
import { JsonLd } from "@/components/JsonLd";

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

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCachedArticle(slug);

  if (!data) {
    notFound();
  }

  const baseUrl = "https://appify.global";
  const title = data.metaTitle || `${data.title} | Appify News`;
  const description = data.metaDescription || data.excerpt;
  const imagePath = data.imageUrl || "/appify.png";
  const imageUrl = imagePath.startsWith("http") ? imagePath : `${baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  const canonicalPath = `/news/${data.slug || slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${canonicalPath}`,
      images: [imageUrl],
      type: "article",
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    image: imageUrl,
    datePublished: toISODate(data.date),
    dateModified: toISODate(data.date),
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

  return (
    <>
      <JsonLd data={articleSchema} />
      {children}
    </>
  );
}
