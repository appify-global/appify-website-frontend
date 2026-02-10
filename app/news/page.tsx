"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import NewsFooter from "@/components/News/NewsFooter";
import NewsHero from "@/components/News/NewsHero";
import NewsCategoryList from "@/components/News/NewsCategoryList";
import FeaturedNewsCarousel from "@/components/News/FeaturedNewsCarousel";
import NewsCard from "@/components/News/NewsCard";
import { featuredArticles, latestArticles, NewsArticle } from "@/data/news";
import { getFeaturedArticles, getLatestArticles, searchArticles } from "@/lib/api";
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
  const searchParams = useSearchParams();

  // State for articles (with fallback to static data)
  const [featured, setFeatured] = useState<NewsArticle[]>(featuredArticles);
  const [latest, setLatest] = useState<NewsArticle[]>(latestArticles);
  const [loading, setLoading] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null);
  const [searching, setSearching] = useState(false);

  // Client-side search through loaded articles
  const searchLocally = useCallback((q: string, articles: NewsArticle[]): NewsArticle[] => {
    const term = q.toLowerCase();
    return articles.filter(
      (a) =>
        a.title.toLowerCase().includes(term) ||
        a.excerpt.toLowerCase().includes(term) ||
        (a.category || "").toLowerCase().includes(term) ||
        (a.topics || "").toLowerCase().includes(term) ||
        a.content?.some((block) => block.text?.toLowerCase().includes(term))
    );
  }, []);

  // Handle ?q= query param from article page search
  const runSearch = useCallback(async (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults(null);
      return;
    }
    setSearching(true);
    try {
      const results = await searchArticles(q);
      // If API returned results, use them
      if (results.length > 0) {
        setSearchResults(results);
      } else {
        // Fallback: search through currently loaded articles
        const allLoaded = [...featured, ...latest];
        const unique = allLoaded.filter((a, i, arr) => arr.findIndex((b) => b.id === a.id) === i);
        setSearchResults(searchLocally(q, unique));
      }
    } catch {
      // API failed: search through currently loaded articles
      const allLoaded = [...featured, ...latest];
      const unique = allLoaded.filter((a, i, arr) => arr.findIndex((b) => b.id === a.id) === i);
      setSearchResults(searchLocally(q, unique));
    } finally {
      setSearching(false);
    }
  }, [featured, latest, searchLocally]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      runSearch(q);
    }
  }, [searchParams, runSearch]);

  // Fetch articles from API (with automatic fallback to static data)
  useEffect(() => {
    const fetchArticles = async () => {
      // Check if we should use static data
      const useStatic = process.env.NEXT_PUBLIC_USE_STATIC_DATA === "true";
      
      // Debug logging
      console.log("Fetching articles - Use Static:", useStatic);
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
      
      if (useStatic) {
        console.log("Using static data (NEXT_PUBLIC_USE_STATIC_DATA=true)");
        return; // Use static data (already set as initial state)
      }

      setLoading(true);
      try {
        console.log("Fetching from API...");
        const [fetchedFeatured, fetchedLatest] = await Promise.all([
          getFeaturedArticles(),
          getLatestArticles(),
        ]);
        console.log("API Response - Featured:", fetchedFeatured.length, "Latest:", fetchedLatest.length);
        setFeatured(fetchedFeatured);
        setLatest(fetchedLatest);
      } catch (error) {
        console.error("Failed to fetch articles, using static data:", error);
        // Already using static data as fallback (initial state)
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Helper function to check if article matches any active category
  // Handles comma-separated topics (e.g., "AI, Automation, Web")
  const articleMatchesCategory = (article: NewsArticle, categories: string[]): boolean => {
    if (categories.length === 0) return true; // No filter = show all
    
    const articleTopics = (article.topics || article.category || "")
      .split(",")
      .map((t) => t.trim().toUpperCase())
      .filter((t) => t.length > 0);
    
    return categories.some((cat) => 
      articleTopics.includes(cat.toUpperCase())
    );
  };

  // Search handler
  const handleSearch = () => runSearch(searchQuery);

  const handleSearchClear = () => {
    setSearchQuery("");
    setSearchResults(null);
  };

  // Filter featured articles based on active categories
  const filteredFeaturedArticles = activeCategories.length > 0
    ? featured.filter((article) => articleMatchesCategory(article, activeCategories))
    : featured;

  // Filter latest articles based on active categories
  // If no categories selected, show ALL articles
  const filteredLatestArticles = activeCategories.length > 0
    ? latest.filter((article) => articleMatchesCategory(article, activeCategories))
    : latest;

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
              <NewsHero
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearchSubmit={handleSearch}
                onSearchClear={handleSearchClear}
              />

              {/* Mobile Categories - Horizontal scroll */}
              <div className="lg:hidden pt-6">
                <NewsCategoryList
                  activeCategories={activeCategories}
                  onCategoryToggle={toggleCategory}
                />
              </div>

              {/* Featured Carousel */}
              <FeaturedNewsCarousel articles={filteredFeaturedArticles} />

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

              {/* Latest News / Search Results Section */}
              <div>
                <div className="mb-4 md:mb-6 lg:mb-12">
                  <h2 className="font-Aeonik text-[clamp(2.5rem,5vw,5rem)] leading-tight text-black">
                    {searchResults !== null ? "Search Results" : "Latest News"}
                  </h2>
                </div>

                {/* Active Category Label - Mobile & Tablet */}
                {searchResults === null && (
                  <div className="lg:hidden mb-4">
                    <span className="font-Aeonik text-[13px] tracking-[0.08em] uppercase text-[rgba(0,0,0,0.5)]">
                      {activeCategories.length > 0
                        ? activeCategories.join(", ")
                        : "ALL CATEGORIES"}
                    </span>
                  </div>
                )}

                {/* Search status */}
                {searching && (
                  <p className="font-Aeonik text-[15px] text-[rgba(0,0,0,0.5)] mb-6">
                    Searching...
                  </p>
                )}

                {searchResults !== null && !searching && searchResults.length === 0 && (
                  <p className="font-Aeonik text-[15px] text-[rgba(0,0,0,0.5)] mb-6">
                    No articles found for &ldquo;{searchQuery}&rdquo;
                  </p>
                )}

                {/* News List */}
                <div className="md:divide-y md:divide-[rgba(0,0,0,0.1)] lg:divide-y-0">
                  {(searchResults !== null ? searchResults : filteredLatestArticles).map((article) => (
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
