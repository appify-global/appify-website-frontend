"use client";

import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import NewsFooter from "@/components/News/NewsFooter";
import NewsHero from "@/components/News/NewsHero";
import NewsCategoryList from "@/components/News/NewsCategoryList";
import FeaturedNewsCarousel from "@/components/News/FeaturedNewsCarousel";
import NewsCard from "@/components/News/NewsCard";
import { featuredArticles, latestArticles, NewsArticle } from "@/data/news";
import { searchArticles } from "@/lib/api";
import { PageLayout } from "@/components/layouts";
import { NewsFilterProvider, useNewsFilter } from "@/contexts/NewsFilterContext";
import { FaArrowRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FeaturedCarouselSkeleton, NewsListSkeleton } from "@/components/News/Skeletons";

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

interface NewsPageClientProps {
  initialFeatured: NewsArticle[];
  initialLatest: NewsArticle[];
}

function NewsPageContent({ initialFeatured, initialLatest }: NewsPageClientProps) {
  const filter = useNewsFilter();
  const activeCategories = filter?.activeCategories ?? [];
  const toggleCategory = filter?.toggleCategory ?? (() => {});
  const searchParams = useSearchParams();

  const [featured, setFeatured] = useState<NewsArticle[]>(initialFeatured);
  const [latest, setLatest] = useState<NewsArticle[]>(initialLatest);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null);
  const [searching, setSearching] = useState(false);

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

  const runSearch = useCallback(async (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults(null);
      return;
    }
    setSearching(true);
    try {
      const results = await searchArticles(q);
      if (results.length > 0) {
        setSearchResults(results);
      } else {
        const allLoaded = [...featured, ...latest];
        const unique = allLoaded.filter((a, i, arr) => arr.findIndex((b) => b.id === a.id) === i);
        setSearchResults(searchLocally(q, unique));
      }
    } catch {
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

  const articleMatchesCategory = (article: NewsArticle, categories: string[]): boolean => {
    if (categories.length === 0) return true;
    const articleTopics = (article.topics || article.category || "")
      .split(",")
      .map((t) => t.trim().toUpperCase())
      .filter((t) => t.length > 0);
    return categories.some((cat) =>
      articleTopics.includes(cat.toUpperCase())
    );
  };

  const heroSearchRef = useRef<HTMLDivElement>(null);
  const [showStickySearch, setShowStickySearch] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const timeoutId = setTimeout(() => {
      const el = heroSearchRef.current;
      if (!el) return;
      observer = new IntersectionObserver(
        ([entry]) => setShowStickySearch(!entry.isIntersecting),
        { threshold: 0, rootMargin: "0px" }
      );
      observer.observe(el);
    }, 100);
    return () => {
      clearTimeout(timeoutId);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    // Defer until after hydration to avoid mismatch with server-rendered HTML
    const id = setTimeout(() => {
      const desktopNavbar = Array.from(document.querySelectorAll("div.fixed.top-0")).find(
        (el) =>
          (el as HTMLElement).querySelector('a[href="/"]') !== null &&
          (el as HTMLElement).querySelector(".font-AeonikMedium") !== null
      ) as HTMLElement;
      const mobileNavbar = Array.from(document.querySelectorAll("div.fixed.top-0")).find(
        (el) =>
          (el as HTMLElement).classList.contains("lg:hidden") ||
          ((el as HTMLElement).querySelector('img[alt="Appify"]') !== null &&
            (el as HTMLElement).classList.contains("w-full"))
      ) as HTMLElement;
      const navbars = [desktopNavbar, mobileNavbar].filter(Boolean);
      navbars.forEach((navbar) => {
        if (!navbar) return;
        navbar.style.top = showStickySearch ? "55px" : "0px";
        navbar.style.transition = "top 0.3s ease";
      });
    }, 100);
    return () => {
      clearTimeout(id);
      const desktopNavbar = Array.from(document.querySelectorAll("div.fixed.top-0")).find(
        (el) =>
          (el as HTMLElement).querySelector('a[href="/"]') !== null &&
          (el as HTMLElement).querySelector(".font-AeonikMedium") !== null
      ) as HTMLElement;
      const mobileNavbar = Array.from(document.querySelectorAll("div.fixed.top-0")).find(
        (el) =>
          (el as HTMLElement).classList.contains("lg:hidden") ||
          ((el as HTMLElement).querySelector('img[alt="Appify"]') !== null &&
            (el as HTMLElement).classList.contains("w-full"))
      ) as HTMLElement;
      [desktopNavbar, mobileNavbar].filter(Boolean).forEach((navbar) => {
        if (navbar) {
          navbar.style.top = "";
          navbar.style.transition = "";
        }
      });
    };
  }, [showStickySearch]);

  const handleSearch = () => runSearch(searchQuery);
  const handleSearchClear = () => {
    setSearchQuery("");
    setSearchResults(null);
  };

  // When category is active: top 3 in Most Popular, remainder in Latest News
  const categoryArticles =
    activeCategories.length > 0
      ? latest.filter((a) => articleMatchesCategory(a, activeCategories))
      : [];
  const carouselArticles =
    activeCategories.length > 0
      ? categoryArticles.slice(0, 3)
      : featured;
  const latestNewsArticles =
    activeCategories.length > 0
      ? categoryArticles.slice(3)
      : latest;

  return (
    <PageLayout showFooter={false} navbarPadding="pb-[4vw]">
      <main className="flex-1">
        <section className="px-4 md:px-[4vw] lg:px-[4vw] pt-[25vw] md:pt-[15vw] lg:pt-[8vw]">
          <aside className="hidden lg:block fixed left-[4vw] top-[14vw] w-[140px] z-30 max-h-[calc(100vh-14vw-2rem)] overflow-y-auto scrollbar-hide">
            <NewsCategoryList
              activeCategories={activeCategories}
              onCategoryToggle={toggleCategory}
            />
          </aside>

          <div
            className={`hidden md:block fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
              showStickySearch
                ? "translate-y-0 opacity-100"
                : "-translate-y-full opacity-0 pointer-events-none"
            }`}
          >
            <div className="bg-[#ECEDF3]/80 backdrop-blur-md border-b border-black/5 px-4 md:px-[4vw] lg:px-[4vw] py-3">
              <div className="lg:ml-[185px] flex justify-end">
                <div className="w-full max-w-[280px] lg:max-w-[350px]">
                  <div className="backdrop-blur-[9px] bg-white/60 border border-white/40 rounded-full px-5 py-3 flex items-center justify-between w-full shadow-[0px_4px_56px_0px_rgba(0,0,0,0.05),0px_15px_134px_-9px_rgba(0,0,0,0.1)]">
                    <input
                      type="text"
                      placeholder="ASK ANYTHING"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="bg-transparent outline-none text-black text-sm tracking-wide uppercase font-Aeonik w-full placeholder:text-[rgba(0,0,0,0.47)]"
                    />
                    {searchQuery ? (
                      <button onClick={handleSearchClear} className="text-black/50 hover:text-black transition-colors">
                        <IoClose size={16} />
                      </button>
                    ) : (
                      <button onClick={handleSearch} className="text-black/50 hover:text-black transition-colors">
                        <FaArrowRight size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:ml-[185px]">
            <div className="flex-1 min-w-0">
              <div ref={heroSearchRef}>
                <NewsHero
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSearchSubmit={handleSearch}
                  onSearchClear={handleSearchClear}
                />
              </div>

              <div className="lg:hidden pt-6">
                <NewsCategoryList
                  activeCategories={activeCategories}
                  onCategoryToggle={toggleCategory}
                />
              </div>

              <FeaturedNewsCarousel articles={carouselArticles} />

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

              <div>
                <div className="mb-4 md:mb-6 lg:mb-12">
                  <h2 className="font-Aeonik text-[clamp(2.5rem,5vw,5rem)] leading-tight text-black">
                    {searchResults !== null ? "Search Results" : "Latest News"}
                  </h2>
                </div>

                {searchResults === null && (
                  <div className="lg:hidden mb-4">
                    <span className="font-Aeonik text-[13px] tracking-[0.08em] uppercase text-[rgba(0,0,0,0.5)]">
                      {activeCategories.length > 0
                        ? activeCategories.join(", ")
                        : "ALL CATEGORIES"}
                    </span>
                  </div>
                )}

                {searching && <NewsListSkeleton count={3} />}

                {searchResults !== null && !searching && searchResults.length === 0 && (
                  <p className="font-Aeonik text-[15px] text-[rgba(0,0,0,0.5)] mb-6">
                    No articles found for &ldquo;{searchQuery}&rdquo;
                  </p>
                )}

                <div className="md:divide-y md:divide-[rgba(0,0,0,0.1)] lg:divide-y-0">
                  {(searchResults !== null ? searchResults : latestNewsArticles).map((article) => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="relative z-40 mt-12">
        <NewsFooter />
      </section>
    </PageLayout>
  );
}

export default function NewsPageClient(props: NewsPageClientProps) {
  return (
    <NewsFilterProvider>
      <Suspense>
        <NewsPageContent {...props} />
      </Suspense>
    </NewsFilterProvider>
  );
}
