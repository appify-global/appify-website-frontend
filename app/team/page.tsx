import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { fetchAllArticlesServer } from "@/lib/api";
import { newsArticles, type NewsArticle } from "@/data/news";
import { authorBios, getAuthorBio, slugifyAuthor } from "@/data/authors";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 3600;

const TITLE = "Our Team — Authors at Appify";
const DESCRIPTION =
  "Engineers, strategists, and writers behind the Appify newsroom. Read every article by author and learn who is shaping our perspective on AI, software, and digital transformation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/team" },
  openGraph: {
    title: `${TITLE} | Appify`,
    description: DESCRIPTION,
    url: "https://www.appify.global/team",
    images: ["/appify.png"],
    type: "website",
  },
};

interface AuthorEntry {
  name: string;
  slug: string;
  count: number;
  imageUrl?: string;
  jobTitle?: string;
  bio?: string;
}

function buildRoster(articles: NewsArticle[]): AuthorEntry[] {
  const counts = new Map<string, AuthorEntry>();
  for (const article of articles) {
    const name = (article.author || "").trim();
    if (!name) continue;
    const bio = getAuthorBio(name);
    const slug = bio?.slug ?? slugifyAuthor(name);
    const existing = counts.get(slug);
    if (existing) {
      existing.count += 1;
    } else {
      counts.set(slug, {
        name: bio?.name ?? name,
        slug,
        count: 1,
        imageUrl: bio?.imageUrl,
        jobTitle: bio?.jobTitle,
        bio: bio?.bio,
      });
    }
  }
  // Always surface known bios even if their articles aren't in the current API window.
  for (const bio of authorBios) {
    if (!counts.has(bio.slug)) {
      counts.set(bio.slug, {
        name: bio.name,
        slug: bio.slug,
        count: 0,
        imageUrl: bio.imageUrl,
        jobTitle: bio.jobTitle,
        bio: bio.bio,
      });
    }
  }
  return Array.from(counts.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
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

export default async function TeamIndexPage() {
  const articles = await loadArticles();
  const roster = buildRoster(articles);

  const baseUrl = "https://www.appify.global";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Team", item: `${baseUrl}/team` },
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
            <span className="text-black">Team</span>
          </nav>
          <h1 className="font-Aeonik text-[clamp(2rem,4vw,3.5rem)] leading-tight text-black mb-4">
            Our team
          </h1>
          <p className="font-Aeonik text-[16px] md:text-[18px] text-[rgba(0,0,0,0.7)] max-w-[700px] mb-12">
            {DESCRIPTION}
          </p>

          {roster.length === 0 ? (
            <p className="font-Aeonik text-[16px] text-[rgba(0,0,0,0.6)]">
              No authors yet.
            </p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {roster.map((a) => (
                <li key={a.slug}>
                  <Link href={`/team/${a.slug}`} className="block group">
                    <div className="bg-white rounded-[16px] p-6 hover:shadow-lg transition-shadow h-full">
                      <div className="flex items-center gap-4 mb-4">
                        {a.imageUrl ? (
                          <div className="relative w-14 h-14 rounded-full overflow-hidden bg-black/5 flex-shrink-0">
                            <Image
                              src={a.imageUrl}
                              alt={a.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-black/10 flex items-center justify-center flex-shrink-0 font-Aeonik text-[20px] text-black">
                            {a.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <h2 className="font-Aeonik text-[18px] text-black group-hover:text-[#f23084] transition-colors line-clamp-2">
                            {a.name}
                          </h2>
                          {a.jobTitle && (
                            <p className="font-Aeonik text-[13px] text-[rgba(0,0,0,0.5)] line-clamp-1">
                              {a.jobTitle}
                            </p>
                          )}
                        </div>
                      </div>
                      {a.bio && (
                        <p className="font-Aeonik text-[14px] leading-snug text-[rgba(0,0,0,0.7)] line-clamp-3 mb-3">
                          {a.bio}
                        </p>
                      )}
                      <p className="font-Aeonik text-[12px] tracking-[0.1em] uppercase text-[rgba(0,0,0,0.4)]">
                        {a.count} {a.count === 1 ? "article" : "articles"}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
