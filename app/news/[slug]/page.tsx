"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { newsArticles, newsCategories, ArticleContentBlock } from "@/data/news";
import { PageLayout } from "@/components/layouts";
import NewsFooter from "@/components/News/NewsFooter";
import { NewsFilterProvider } from "@/contexts/NewsFilterContext";
import ScrollProgress from "@/components/News/ScrollProgress";
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
    <div className="mt-10 lg:mt-16 space-y-8">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="font-Aeonik text-[13px] lg:text-[15px] tracking-[0.15em] uppercase text-black mt-12"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "image") {
          return (
            <div
              key={i}
              className="relative w-full max-w-[720px] h-[200px] sm:h-[280px] lg:h-[350px] rounded-[8px] lg:rounded-[16px] overflow-hidden"
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
            className="font-Aeonik text-[15px] lg:text-[18px] leading-[1.6] text-black max-w-[720px]"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

function NewsArticleContent() {
  const params = useParams();
  const slug = params.slug as string;
  const article = newsArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <PageLayout showFooter={false}>
        <div className="flex items-center justify-center min-h-screen">
          <p className="font-Aeonik text-2xl text-black">Article not found.</p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter={false} navbarPadding="pb-[4vw]">
      <main className="flex-1">
        <section className="px-4 lg:px-[4vw] pt-[25vw] lg:pt-[12vw]">
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

          {/* Scroll Progress Indicator - Fixed */}
          <div className="hidden lg:block fixed left-[calc(4vw+155px)] top-[12vw] z-30">
            <ScrollProgress />
          </div>

          <div className="lg:ml-[185px]">
            <div className="flex-1 min-w-0">
              {/* Back Button + Search Bar Row */}
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-3 font-Aeonik text-[13px] lg:text-[15px] tracking-[0.1em] uppercase text-black hover:opacity-70 transition-opacity"
                >
                  <FaArrowLeft size={12} />
                  <span>BACK</span>
                </Link>

                {/* Search Bar - Desktop Only */}
                <div className="hidden lg:flex w-full max-w-[350px] flex-shrink-0">
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

              {/* Article Header */}
              <div className="max-w-[850px]">
                <h1 className="font-Aeonik text-[28px] sm:text-[36px] lg:text-[48px] leading-[1.05] text-black mb-4">
                  {article.title}
                </h1>

                {/* Date + Author */}
                <p className="font-Aeonik text-[14px] lg:text-[16px] leading-[1.5] text-[rgba(0,0,0,0.6)]">
                  {article.date} — Porsche, Wallpaper* and Lucien presents short film inspired by Ferry Porsche&apos;s dream of a &apos;modern sports car.&apos;
                </p>
              </div>

              {/* Hero Image */}
              <div className="relative w-full max-w-[850px] h-[250px] sm:h-[350px] lg:h-[450px] rounded-[8px] lg:rounded-[16px] overflow-hidden mt-4">
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
                <div className="max-w-[850px] mt-8 lg:mt-12">
                  <p className="font-Aeonik text-[15px] lg:text-[18px] leading-[1.6] text-black">
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
