import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllArticlesServer } from "@/lib/api";
import { newsArticles, newsCategories, type NewsArticle } from "@/data/news";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 3600;

const TITLE = "News Archive — Every Article from Appify";
const DESCRIPTION =
  "Complete archive of Appify articles on AI, custom software development, automation, ERP, and digital transformation. Browse every published article by topic.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/news/archive" },
  openGraph: {
    title: `${TITLE} | Appify`,
    description: DESCRIPTION,
    url: "https://appify.global/news/archive",
    images: ["/appify.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/appify.png"],
  },
};

function groupByCategory(articles: NewsArticle[]): Map<string, NewsArticle[]> {
  const out = new Map<string, NewsArticle[]>();
  for (const article of articles) {
    const cat = (article.category || article.topics || "Other").toUpperCase();
    const list = out.get(cat) ?? [];
    list.push(article);
    out.set(cat, list);
  }
  return out;
}

export default async function NewsArchivePage() {
  let articles: NewsArticle[] = newsArticles;
  if (process.env.NEXT_PUBLIC_USE_STATIC_DATA !== "true") {
    try {
      const result = await fetchAllArticlesServer();
      if (result.articles.length > 0) articles = result.articles;
    } catch {
      /* keep static fallback */
    }
  }

  const grouped = groupByCategory(articles);
  const orderedCategories = [
    ...newsCategories.map((c) => c.toUpperCase()),
    ...Array.from(grouped.keys()).filter(
      (c) => !newsCategories.map((nc) => nc.toUpperCase()).includes(c),
    ),
  ];

  const baseUrl = "https://appify.global";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "News", item: `${baseUrl}/news` },
      { "@type": "ListItem", position: 3, name: "Archive", item: `${baseUrl}/news/archive` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main className="min-h-screen bg-[#ECEDF3] px-4 md:px-[4vw] pt-[20vw] md:pt-[12vw] lg:pt-[8vw] pb-20">
        <div className="max-w-[1100px] mx-auto">
          <nav aria-label="Breadcrumb" className="font-Aeonik text-[13px] tracking-[0.1em] uppercase text-[rgba(0,0,0,0.5)] mb-6">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/news" className="hover:text-black">News</Link>
            <span className="mx-2">/</span>
            <span className="text-black">Archive</span>
          </nav>
          <h1 className="font-Aeonik text-[clamp(2rem,4vw,3.5rem)] leading-tight text-black mb-4">
            News Archive
          </h1>
          <p className="font-Aeonik text-[16px] md:text-[18px] text-[rgba(0,0,0,0.7)] max-w-[700px] mb-12">
            {DESCRIPTION}
          </p>

          {orderedCategories.map((cat) => {
            const items = grouped.get(cat);
            if (!items || items.length === 0) return null;
            return (
              <section key={cat} className="mb-12">
                <h2
                  id={`cat-${cat.toLowerCase()}`}
                  className="font-Aeonik text-[24px] md:text-[28px] tracking-[0.05em] uppercase text-black mb-6 border-b border-black/10 pb-3"
                >
                  {cat}
                </h2>
                <ul className="space-y-3">
                  {items.map((a) => (
                    <li key={a.id || a.slug}>
                      <Link
                        href={`/news/${a.slug}`}
                        className="font-Aeonik text-[16px] md:text-[18px] text-black hover:text-[#f23084] transition-colors"
                      >
                        {a.title}
                      </Link>
                      {a.date && (
                        <span className="font-Aeonik text-[13px] text-[rgba(0,0,0,0.5)] ml-3">
                          {a.date}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
