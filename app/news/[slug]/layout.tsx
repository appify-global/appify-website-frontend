import type { Metadata } from "next";
import { fetchArticleBySlugServer } from "@/lib/api";
import { newsArticles } from "@/data/news";

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;

  let article = null;
  try {
    article = await fetchArticleBySlugServer(slug);
  } catch {
    article = null;
  }

  const fallback = newsArticles.find((item) => item.slug === slug);
  const data = article ?? fallback;

  if (!data) {
    return {
      title: "Article Not Found | Appify",
      description: "The requested article could not be found.",
      alternates: { canonical: `/news/${slug}` },
    };
  }

  const title = data.metaTitle || `${data.title} | Appify News`;
  const description = data.metaDescription || data.excerpt;
  const image = data.imageUrl || "/appify.png";
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
      url: `https://appify.global${canonicalPath}`,
      images: [image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function NewsArticleLayout({ children }: LayoutProps) {
  return children;
}
