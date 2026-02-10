"use client";

import NewsFooter from "@/components/News/NewsFooter";
import NewsHero from "@/components/News/NewsHero";
import NewsCategoryList from "@/components/News/NewsCategoryList";
import FeaturedNewsCarousel from "@/components/News/FeaturedNewsCarousel";
import NewsCard from "@/components/News/NewsCard";
import { featuredArticles, latestArticles } from "@/data/news";
import { PageLayout } from "@/components/layouts";
import { NewsFilterProvider, useNewsFilter } from "@/contexts/NewsFilterContext";

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

function NewsPageContent() {
  const filter = useNewsFilter();
  const activeCategories = filter?.activeCategories ?? [];
  const toggleCategory = filter?.toggleCategory ?? (() => {});

  // Filter articles based on active categories
  const filteredLatestArticles = activeCategories.length > 0
    ? latestArticles.filter((article) =>
        activeCategories.some(
          (cat) => cat.toUpperCase() === article.category.toUpperCase()
        )
      )
    : latestArticles;

  return (
    <PageLayout showFooter={false} navbarPadding="pb-[4vw]">
      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Sidebar */}
        <section className="px-4 md:px-[4vw] lg:px-[4vw] pt-[25vw] md:pt-[15vw] lg:pt-[8vw]">
          {/* Desktop Sidebar - Fixed */}
          <aside className="hidden lg:block fixed left-[4vw] top-[14vw] w-[140px] z-30 max-h-[calc(100vh-14vw-2rem)] overflow-y-auto scrollbar-hide">
            <NewsCategoryList
              activeCategories={activeCategories}
              onCategoryToggle={toggleCategory}
            />
          </aside>


          <div className="lg:ml-[185px]">
            <div className="flex-1 min-w-0">
              {/* Newsroom Title + Ask Anything - Same Row */}
              <NewsHero />

              {/* Mobile Categories - Horizontal scroll */}
              <div className="lg:hidden pt-6">
                <NewsCategoryList
                  activeCategories={activeCategories}
                  onCategoryToggle={toggleCategory}
                />
              </div>

              {/* Featured Carousel */}
              <FeaturedNewsCarousel articles={featuredArticles} />

              {/* Scroll Divider */}
              <div className="flex items-center justify-center gap-4 md:gap-0 md:justify-between py-6 md:py-10 lg:py-12">
                <PlusIcon />
                <div className="hidden md:flex items-center gap-12 lg:gap-44">
                  <PlusIcon />
                  <span className="font-Aeonik text-[16px] md:text-[18px] lg:text-[20px] tracking-[0.15em] uppercase text-black">
                    SCROLL TO EXPLORE
                  </span>
                  <PlusIcon />
                </div>
                <span className="md:hidden font-Aeonik text-[12px] tracking-[0.15em] uppercase text-black">
                  SCROLL TO EXPLORE
                </span>
                <PlusIcon />
              </div>

              {/* Latest News Section */}
              <div>
                <div className="mb-4 md:mb-6 lg:mb-12">
                  <h2 className="font-Aeonik text-[clamp(2.5rem,5vw,5rem)] leading-tight text-black">
                    Latest News
                  </h2>
                </div>

                {/* Active Category Label - Mobile & Tablet */}
                <div className="lg:hidden mb-4">
                  <span className="font-Aeonik text-[13px] tracking-[0.08em] uppercase text-[rgba(0,0,0,0.5)]">
                    {activeCategories.length > 0
                      ? activeCategories.join(", ")
                      : "ALL CATEGORIES"}
                  </span>
                </div>

                {/* News List */}
                <div className="md:divide-y md:divide-[rgba(0,0,0,0.1)] lg:divide-y-0">
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
      <section className="relative z-40 mt-12">
        <NewsFooter />
      </section>
    </PageLayout>
  );
}

export default function NewsPage() {
  return (
    <NewsFilterProvider>
      <NewsPageContent />
    </NewsFilterProvider>
  );
}
