"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { newsArticles, newsCategories, ArticleContentBlock, NewsArticle } from "@/data/news";
import { getArticleBySlug } from "@/lib/api";
import { PageLayout } from "@/components/layouts";
import NewsFooter from "@/components/News/NewsFooter";
import { NewsFilterProvider } from "@/contexts/NewsFilterContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function ActiveIndicator() {
  return (
    <div className="flex gap-[3px]">
      <div className="w-[6px] h-[6px] bg-black rounded-full" />
      <div className="w-[6px] h-[6px] bg-black rounded-full" />
    </div>
  );
}

function ArticleContent({ blocks }: { blocks: ArticleContentBlock[] }) {
  return (
    <div className="mt-10 md:mt-12 lg:mt-16 space-y-8">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="font-Aeonik text-[20px] md:text-[24px] lg:text-[28px] font-bold uppercase tracking-wide text-black mt-12 md:mt-16 mb-6 md:mb-8"
            >
              {block.text?.toUpperCase()}
            </h2>
          );
        }
        if (block.type === "subheading") {
          return (
            <h3
              key={i}
              className="font-Aeonik text-[17px] md:text-[19px] lg:text-[22px] font-bold uppercase tracking-wide text-black mt-8 md:mt-10 mb-4 md:mb-6"
            >
              {block.text?.toUpperCase()}
            </h3>
          );
        }
        if (block.type === "image") {
          return (
            <div
              key={i}
              className="relative w-full max-w-[850px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-[8px] md:rounded-[12px] lg:rounded-[16px] overflow-hidden my-8 md:my-12"
            >
              <Image
                src={block.src!}
                alt={block.alt || ""}
                fill
                className="object-cover"
              />
            </div>
          );
        }
        return (
          <p
            key={i}
            className="font-Aeonik text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-black max-w-[850px] mb-6 md:mb-8"
            dangerouslySetInnerHTML={{ __html: block.text || "" }}
          />
        );
      })}
    </div>
  );
}

function NewsArticleContent() {
  const params = useParams();
  const slug = params.slug as string;
  
  // State with fallback to static data
  const [article, setArticle] = useState<NewsArticle | null>(
    newsArticles.find((a) => a.slug === slug) || null
  );
  const [loading, setLoading] = useState(false);

  // Fetch article from API (with automatic fallback to static data)
  useEffect(() => {
    const fetchArticle = async () => {
      // Check if we should use static data
      if (process.env.NEXT_PUBLIC_USE_STATIC_DATA === "true") {
        return; // Use static data (already set as initial state)
      }

      setLoading(true);
      try {
        const fetchedArticle = await getArticleBySlug(slug);
        if (fetchedArticle) {
          setArticle(fetchedArticle);
        }
      } catch (error) {
        console.error("Failed to fetch article, using static data:", error);
        // Already using static data as fallback (initial state)
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (!article) {
    return (
      <PageLayout showFooter={false}>
        <div className="flex items-center justify-center min-h-screen">
          <p className="font-Aeonik text-2xl text-black">
            {loading ? "Loading..." : "Article not found."}
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter={false} navbarPadding="pb-[4vw]">
      <main className="flex-1">
        <section className="px-4 md:px-[4vw] lg:px-[4vw] pt-[25vw] md:pt-[15vw] lg:pt-[12vw]">
          {/* Desktop Sidebar - Fixed */}
          <aside className="hidden lg:block fixed left-[4vw] top-[12vw] w-[140px] z-30 max-h-[calc(100vh-12vw-2rem)] overflow-y-auto scrollbar-hide">
            <div className="flex flex-col gap-4 min-w-[140px]">
              {newsCategories.map((category) => {
                const isActive =
                  category.toUpperCase() === article.category.toUpperCase();
                return (
                  <Link
                    key={category}
                    href="/news"
                    className="flex items-center gap-3 text-left group"
                  >
                    {isActive && <ActiveIndicator />}
                    <span
                      className={`font-Aeonik text-[1.3rem] leading-normal transition-opacity ${
                        isActive
                          ? "opacity-100"
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      {category}
                    </span>
                  </Link>
                );
              })}
            </div>
          </aside>


          <div className="lg:ml-[185px]">
            <div className="flex-1 min-w-0">
              {/* Back Button + Search Bar Row */}
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-3 font-Aeonik text-[13px] md:text-[14px] lg:text-[15px] tracking-[0.1em] uppercase text-black hover:opacity-70 transition-opacity"
                >
                  <FaArrowLeft size={12} />
                  <span>BACK</span>
                </Link>

                {/* Search Bar - Tablet & Desktop */}
                <div className="hidden md:flex w-full max-w-[280px] lg:max-w-[350px] flex-shrink-0">
                  <div className="relative w-full">
                    <div className="backdrop-blur-[9px] bg-[rgba(226,227,234,0.05)] border border-white/20 rounded-full px-5 py-4 flex items-center justify-between w-full shadow-[0px_4px_56px_0px_rgba(0,0,0,0.05),0px_15px_134px_-9px_rgba(0,0,0,0.1)]">
                      <input
                        type="text"
                        placeholder="ASK ANYTHING"
                        className="bg-transparent outline-none text-[rgba(0,0,0,0.47)] text-sm tracking-wide uppercase font-Aeonik w-full"
                      />
                      <FaArrowRight className="text-black/50" size={12} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tablet Topic Pills - Horizontal scroll */}
              <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 mb-6">
                <div className="flex gap-4 items-center pb-4 w-max">
                  {newsCategories.map((category) => {
                    const articleCategory = article.category || (article as any).topics || "";
                    const isActive =
                      category.toUpperCase() === articleCategory.toUpperCase();
                    return (
                      <Link
                        key={category}
                        href="/news"
                        className={`flex items-center gap-2 px-3 py-1 rounded-full font-Aeonik text-lg whitespace-nowrap transition-all ${
                          isActive
                            ? "bg-[#e4e6ef]"
                            : "bg-transparent hover:bg-[#e4e6ef]/50"
                        }`}
                      >
                        {isActive && (
                          <div className="flex gap-[2px]">
                            <div className="w-[4px] h-[4px] bg-black rounded-full" />
                            <div className="w-[4px] h-[4px] bg-black rounded-full" />
                          </div>
                        )}
                        <span>{category}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Article Header */}
              <div className="max-w-[850px]">
                <h1 className="font-Aeonik text-[28px] sm:text-[32px] md:text-[38px] lg:text-[44px] leading-tight text-black font-bold mb-4 md:mb-6">
                  {article.title}
                </h1>

                {/* Date + Author */}
                <div className="flex items-center gap-4 text-[rgba(0,0,0,0.5)] mb-6 md:mb-8">
                  <span className="font-Aeonik text-[14px] md:text-[16px]">
                    {article.date}
                  </span>
                  {article.author && (
                    <span className="font-Aeonik text-[14px] md:text-[16px]">
                      — {article.author}
                    </span>
                  )}
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative w-full max-w-[850px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-[8px] md:rounded-[12px] lg:rounded-[16px] overflow-hidden mt-4">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Article Body */}
              {article.content ? (
                <div className="max-w-[850px]">
                  <ArticleContent blocks={article.content} />
                </div>
              ) : (
                <div className="max-w-[850px] mt-8 md:mt-10 lg:mt-12">
                  <p className="font-Aeonik text-[15px] md:text-[16px] lg:text-[18px] leading-[1.6] text-black">
                    {article.excerpt}
                  </p>
                </div>
              )}

              {/* Bottom spacing */}
              <div className="h-20 lg:h-32" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <section className="relative z-40">
        <NewsFooter />
      </section>
    </PageLayout>
  );
}

export default function NewsArticlePage() {
  return (
    <NewsFilterProvider>
      <NewsArticleContent />
    </NewsFilterProvider>
  );
}
