"use client";

import { useState } from "react";
import NewsFooter from "@/components/News/NewsFooter";
import NewsHero from "@/components/News/NewsHero";
import NewsCategoryList from "@/components/News/NewsCategoryList";
import FeaturedNewsCarousel from "@/components/News/FeaturedNewsCarousel";
import NewsCard from "@/components/News/NewsCard";
import { featuredArticles, latestArticles } from "@/data/news";
import { PageLayout } from "@/components/layouts";

// Plus icon component for scroll divider
function PlusIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-black"
    >
      <path
        d="M10.5 0V21M0 10.5H21"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function NewsPage() {
  const [activeCategories, setActiveCategories] = useState<string[]>(["AI", "Startups"]);

  // Filter articles based on active categories
  const filteredLatestArticles = activeCategories.length > 0
    ? latestArticles.filter((article) =>
        activeCategories.some(
          (cat) => cat.toUpperCase() === article.category.toUpperCase()
        )
      )
    : latestArticles;

  const handleCategoryToggle = (category: string) => {
    setActiveCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  };

  return (
    <PageLayout showFooter={false} navbarPadding="pb-[4vw]">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Sidebar */}
        <section className="px-4 lg:px-[4vw] pt-[25vw] lg:pt-[8vw]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Desktop Sidebar - Sticky */}
            <aside className="hidden lg:block lg:w-[140px] flex-shrink-0 self-start sticky top-[140px]">
              <NewsCategoryList
                activeCategories={activeCategories}
                onCategoryToggle={handleCategoryToggle}
              />
            </aside>

            {/* Main Column */}
            <div className="flex-1 min-w-0">
              {/* Newsroom Title + Ask Anything - Same Row */}
              <NewsHero />

              {/* Mobile Categories - Horizontal scroll */}
              <div className="lg:hidden pt-6">
                <NewsCategoryList
                  activeCategories={activeCategories}
                  onCategoryToggle={handleCategoryToggle}
                />
              </div>

              {/* Featured Carousel */}
              <FeaturedNewsCarousel articles={featuredArticles} />

              {/* Scroll Divider */}
              <div className="flex items-center justify-center gap-6 lg:gap-0 lg:justify-between py-8 lg:py-12">
                <PlusIcon />
                <div className="hidden lg:flex items-center gap-44">
                  <PlusIcon />
                  <span className="font-Aeonik text-[20px] tracking-wide text-black">
                    SCROLL TO EXPLORE
                  </span>
                  <PlusIcon />
                </div>
                <span className="lg:hidden font-Aeonik text-[13px] tracking-wide text-black">
                  SCROLL TO EXPLORE
                </span>
                <PlusIcon />
              </div>

              {/* Latest News Section */}
              <div>
                <div className="flex items-start justify-between mb-6 lg:mb-12">
                  <h2 className="font-Aeonik text-[clamp(2.5rem,5vw,5rem)] leading-tight text-black">
                    Latest News
                  </h2>

                  {/* Search Icon - Mobile */}
                  <button className="lg:hidden p-2 mt-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="11"
                        cy="11"
                        r="7"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <path
                        d="M16 16L20 20"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Category Filter Pills - Mobile */}
                <div className="lg:hidden mb-6">
                  <span className="font-Aeonik text-sm text-[rgba(0,0,0,0.6)] tracking-wide uppercase">
                    {activeCategories.length > 0 
                      ? activeCategories.join(", ") 
                      : "ALL CATEGORIES"}
                  </span>
                </div>

                {/* News List */}
                <div className="divide-y divide-[rgba(0,0,0,0.1)] lg:divide-y-0">
                  {filteredLatestArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* News Footer (custom footer for news page) */}
      <section className="relative z-20 mt-12">
        <NewsFooter />
      </section>
    </PageLayout>
  );
}
