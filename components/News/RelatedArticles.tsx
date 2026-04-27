import Link from "next/link";
import Image from "next/image";
import type { NewsArticle } from "@/data/news";

interface RelatedArticlesProps {
  articles: NewsArticle[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <aside
      aria-label="Related articles"
      className="max-w-[850px] mt-16 md:mt-20 lg:mt-24 pt-10 md:pt-12 border-t border-black/10"
    >
      <h2 className="font-Aeonik text-[22px] md:text-[26px] lg:text-[30px] tracking-[-0.01em] text-black mb-6 md:mb-8">
        Related articles
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {articles.map((a) => (
          <li key={a.id || a.slug}>
            <Link href={`/news/${a.slug}`} className="block group">
              <div className="relative w-full h-[180px] md:h-[200px] rounded-[12px] overflow-hidden mb-3">
                {a.imageUrl && (
                  <Image
                    src={a.imageUrl}
                    alt={a.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <p className="font-Aeonik text-[12px] tracking-[0.1em] uppercase text-[rgba(0,0,0,0.5)] mb-2">
                {a.category}
              </p>
              <h3 className="font-Aeonik text-[17px] md:text-[18px] leading-tight text-black group-hover:text-[#f23084] transition-colors line-clamp-3">
                {a.title}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
