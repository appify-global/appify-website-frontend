import Link from "next/link";
import Image from "next/image";
import type { NewsArticle } from "@/data/news";

interface HomeNewsSectionProps {
  articles: NewsArticle[];
}

export default function HomeNewsSection({ articles }: HomeNewsSectionProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section
      id="home-newsroom"
      aria-label="Latest from the newsroom"
      className="relative z-20 px-[5vw] py-[8vw] md:py-[6vw] bg-[#ECEDF3]"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12 gap-4">
        <div>
          <p className="font-Aeonik text-[13px] tracking-[0.15em] uppercase text-[rgba(0,0,0,0.5)] mb-3">
            From the newsroom
          </p>
          <h2 className="font-Aeonik text-[clamp(2rem,4vw,3.5rem)] leading-tight text-black max-w-[700px]">
            Latest insights on AI, custom software & digital transformation
          </h2>
        </div>
        <Link
          href="/news"
          className="self-start md:self-end font-Aeonik text-[14px] md:text-[15px] tracking-[0.15em] uppercase border border-black/20 rounded-full px-6 py-3 hover:bg-black hover:text-white transition-colors whitespace-nowrap"
        >
          View all news
        </Link>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {articles.slice(0, 3).map((a) => (
          <li key={a.id || a.slug}>
            <Link href={`/news/${a.slug}`} className="block group">
              <div className="relative w-full h-[200px] md:h-[240px] rounded-[16px] overflow-hidden mb-4">
                {a.imageUrl && (
                  <Image
                    src={a.imageUrl}
                    alt={a.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <p className="font-Aeonik text-[12px] tracking-[0.1em] uppercase text-[rgba(0,0,0,0.5)] mb-2">
                {a.category}
              </p>
              <h3 className="font-Aeonik text-[20px] md:text-[22px] leading-tight text-black group-hover:text-[#f23084] transition-colors line-clamp-3 mb-2">
                {a.title}
              </h3>
              {a.excerpt && (
                <p className="font-Aeonik text-[14px] md:text-[15px] leading-snug text-[rgba(0,0,0,0.6)] line-clamp-3">
                  {a.excerpt}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
