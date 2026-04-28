import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchAllArticlesServer } from "@/lib/api";
import { newsArticles, type NewsArticle } from "@/data/news";
import { authorBios, getAuthorBio, slugifyAuthor } from "@/data/authors";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 3600;
export const dynamicParams = true;

interface AuthorView {
  name: string;
  slug: string;
  jobTitle?: string;
  bio?: string;
  imageUrl?: string;
  sameAs?: string[];
  articles: NewsArticle[];
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

async function loadAuthor(slug: string): Promise<AuthorView | null> {
  const articles = await loadArticles();
  const matching = articles.filter(
    (a) => a.author && slugifyAuthor(a.author) === slug,
  );
  const bio = getAuthorBio(slug);

  if (matching.length === 0 && !bio) return null;

  const name = bio?.name ?? matching[0]?.author ?? slug;
  return {
    name,
    slug,
    jobTitle: bio?.jobTitle,
    bio: bio?.bio,
    imageUrl: bio?.imageUrl,
    sameAs: bio?.sameAs,
    articles: matching,
  };
}

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_USE_STATIC_DATA === "true") {
    return authorBios.map((a) => ({ slug: a.slug }));
  }
  const slugs = new Set<string>();
  authorBios.forEach((a) => slugs.add(a.slug));
  try {
    const result = await fetchAllArticlesServer();
    for (const article of result.articles) {
      if (article.author) slugs.add(slugifyAuthor(article.author));
    }
  } catch {
    /* fall through with whatever bios we have */
  }
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await loadAuthor(slug);
  if (!author) return { title: "Author" };

  const description = author.bio
    ? author.bio
    : `Articles by ${author.name} on AI, software development, and digital transformation at Appify.`;

  return {
    title: `${author.name}${author.jobTitle ? ` — ${author.jobTitle}` : ""}`,
    description,
    alternates: { canonical: `/team/${slug}` },
    openGraph: {
      title: `${author.name} | Appify`,
      description,
      url: `https://www.appify.global/team/${slug}`,
      images: [author.imageUrl || "/appify.png"],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: author.name,
      description,
      images: [author.imageUrl || "/appify.png"],
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await loadAuthor(slug);
  if (!author) notFound();

  const baseUrl = "https://www.appify.global";
  const authorUrl = `${baseUrl}/team/${slug}`;
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${authorUrl}#person`,
    name: author.name,
    url: authorUrl,
    ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
    ...(author.bio ? { description: author.bio } : {}),
    ...(author.imageUrl
      ? {
          image: author.imageUrl.startsWith("http")
            ? author.imageUrl
            : `${baseUrl}${author.imageUrl}`,
        }
      : {}),
    ...(author.sameAs && author.sameAs.length > 0 ? { sameAs: author.sameAs } : {}),
    worksFor: { "@type": "Organization", name: "Appify", url: baseUrl },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Team", item: `${baseUrl}/team` },
      { "@type": "ListItem", position: 3, name: author.name, item: authorUrl },
    ],
  };

  return (
    <>
      <JsonLd data={[personSchema, breadcrumbSchema]} />
      <main className="min-h-screen bg-[#ECEDF3] px-4 md:px-[4vw] pt-[20vw] md:pt-[12vw] lg:pt-[8vw] pb-20">
        <div className="max-w-[900px] mx-auto">
          <nav aria-label="Breadcrumb" className="font-Aeonik text-[13px] tracking-[0.1em] uppercase text-[rgba(0,0,0,0.5)] mb-6">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/team" className="hover:text-black">Team</Link>
            <span className="mx-2">/</span>
            <span className="text-black">{author.name}</span>
          </nav>

          <header className="flex items-start gap-6 mb-10 md:mb-14">
            {author.imageUrl ? (
              <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden bg-black/5 flex-shrink-0">
                <Image
                  src={author.imageUrl}
                  alt={author.name}
                  fill
                  sizes="(max-width: 768px) 80px, 112px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0 font-Aeonik text-[28px] md:text-[36px] text-black">
                {author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="font-Aeonik text-[clamp(2rem,4vw,3rem)] leading-tight text-black mb-2">
                {author.name}
              </h1>
              {author.jobTitle && (
                <p className="font-Aeonik text-[15px] md:text-[17px] text-[rgba(0,0,0,0.6)] mb-3">
                  {author.jobTitle}
                </p>
              )}
              {author.bio && (
                <p className="font-Aeonik text-[15px] md:text-[17px] leading-relaxed text-[rgba(0,0,0,0.8)] max-w-[600px]">
                  {author.bio}
                </p>
              )}
              {author.sameAs && author.sameAs.length > 0 && (
                <ul className="flex flex-wrap gap-3 mt-4">
                  {author.sameAs.map((url) => (
                    <li key={url}>
                      <a
                        href={url}
                        rel="me noopener noreferrer"
                        target="_blank"
                        className="font-Aeonik text-[13px] tracking-[0.05em] underline text-[rgba(0,0,0,0.7)] hover:text-black"
                      >
                        {new URL(url).hostname.replace(/^www\./, "")}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </header>

          <h2 className="font-Aeonik text-[24px] md:text-[28px] text-black mb-6 border-b border-black/10 pb-3">
            Articles by {author.name}
          </h2>

          {author.articles.length === 0 ? (
            <p className="font-Aeonik text-[16px] text-[rgba(0,0,0,0.6)]">
              No articles published yet.
            </p>
          ) : (
            <ul className="space-y-4">
              {author.articles.map((a) => (
                <li key={a.id || a.slug}>
                  <Link
                    href={`/news/${a.slug}`}
                    className="font-Aeonik text-[17px] md:text-[19px] text-black hover:text-[#f23084] transition-colors"
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
          )}
        </div>
      </main>
    </>
  );
}
