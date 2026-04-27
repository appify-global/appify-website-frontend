import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchAllArticlesServer } from "@/lib/api";
import { newsArticles, type NewsArticle } from "@/data/news";
import {
  getTopicBySlug,
  matchArticleToTopic,
  topics,
  type Topic,
} from "@/data/topics";
import { JsonLd } from "@/components/JsonLd";
import NewsCard from "@/components/News/NewsCard";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((t) => ({ slug: t.slug }));
}

async function loadArticles(): Promise<NewsArticle[]> {
  if (process.env.NEXT_PUBLIC_USE_STATIC_DATA === "true") return newsArticles;
  try {
    const result = await fetchAllArticlesServer();
    return result.articles.length > 0 ? result.articles : newsArticles;
  } catch {
    return newsArticles;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Topic" };
  return {
    title: topic.metaTitle,
    description: topic.metaDescription,
    keywords: topic.primaryKeywords,
    alternates: { canonical: `/topics/${topic.slug}` },
    openGraph: {
      title: topic.metaTitle,
      description: topic.metaDescription,
      url: `https://appify.global/topics/${topic.slug}`,
      images: ["/appify.png"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: topic.metaTitle,
      description: topic.metaDescription,
      images: ["/appify.png"],
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();

  const articles = await loadArticles();
  const matching = articles.filter((a) => matchArticleToTopic(topic, a));

  const baseUrl = "https://appify.global";
  const topicUrl = `${baseUrl}/topics/${topic.slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Topics", item: `${baseUrl}/topics` },
      { "@type": "ListItem", position: 3, name: topic.name, item: topicUrl },
    ],
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${topicUrl}#collection`,
    name: topic.name,
    description: topic.metaDescription,
    url: topicUrl,
    keywords: topic.primaryKeywords.join(", "),
    isPartOf: { "@id": `${baseUrl}/#website` },
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: topic.name,
    itemListElement: matching.slice(0, 20).map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${baseUrl}/news/${a.slug}`,
      name: a.title,
    })),
  };

  const otherTopics = topics.filter((t: Topic) => t.slug !== topic.slug);

  return (
    <>
      <JsonLd data={[breadcrumbSchema, collectionSchema, itemListSchema]} />
      <main className="min-h-screen bg-[#ECEDF3] px-4 md:px-[4vw] pt-[20vw] md:pt-[12vw] lg:pt-[8vw] pb-20">
        <div className="max-w-[1100px] mx-auto">
          <nav aria-label="Breadcrumb" className="font-Aeonik text-[13px] tracking-[0.1em] uppercase text-[rgba(0,0,0,0.5)] mb-6">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/topics" className="hover:text-black">Topics</Link>
            <span className="mx-2">/</span>
            <span className="text-black">{topic.name}</span>
          </nav>

          <header className="mb-12 md:mb-16 max-w-[850px]">
            <p className="font-Aeonik text-[13px] tracking-[0.15em] uppercase text-[rgba(0,0,0,0.4)] mb-3">
              Topic
            </p>
            <h1 className="font-Aeonik text-[clamp(2.25rem,5vw,4rem)] leading-tight text-black mb-6">
              {topic.tagline}
            </h1>
            <p className="font-Aeonik text-[17px] md:text-[19px] leading-relaxed text-[rgba(0,0,0,0.8)]">
              {topic.intro}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {topic.primaryKeywords.map((kw) => (
                <li
                  key={kw}
                  className="font-Aeonik text-[13px] tracking-[0.05em] px-3 py-1 rounded-full bg-black/5 text-black"
                >
                  {kw}
                </li>
              ))}
            </ul>
          </header>

          <section aria-labelledby="articles-heading">
            <h2
              id="articles-heading"
              className="font-Aeonik text-[24px] md:text-[32px] text-black mb-6 border-b border-black/10 pb-3"
            >
              Articles on {topic.name}
            </h2>
            {matching.length === 0 ? (
              <p className="font-Aeonik text-[16px] text-[rgba(0,0,0,0.6)]">
                No articles published on this topic yet — check back soon.
              </p>
            ) : (
              <div className="md:divide-y md:divide-[rgba(0,0,0,0.1)]">
                {matching.map((article) => (
                  <NewsCard key={article.id || article.slug} article={article} />
                ))}
              </div>
            )}
          </section>

          {otherTopics.length > 0 && (
            <section className="mt-16 pt-10 border-t border-black/10">
              <h2 className="font-Aeonik text-[22px] md:text-[26px] text-black mb-6">
                Explore other topics
              </h2>
              <ul className="flex flex-wrap gap-3">
                {otherTopics.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/topics/${t.slug}`}
                      className="inline-block font-Aeonik text-[14px] px-4 py-2 rounded-full border border-black/15 text-black hover:bg-black hover:text-white transition-colors"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
