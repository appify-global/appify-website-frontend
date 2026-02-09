"use client";

import { newsCategories, NewsCategory } from "@/data/news";

interface NewsCategoryListProps {
  activeCategories: string[];
  onCategoryToggle: (category: string) => void;
}

// Dot indicator for active categories
function ActiveIndicator() {
  return (
    <div className="flex gap-[3px]">
      <div className="w-[6px] h-[6px] bg-black rounded-full" />
      <div className="w-[6px] h-[6px] bg-black rounded-full" />
    </div>
  );
}

export default function NewsCategoryList({
  activeCategories,
  onCategoryToggle,
}: NewsCategoryListProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col gap-4 min-w-[140px]">
        {newsCategories.map((category) => {
          const isActive = activeCategories.includes(category);
          return (
            <button
              key={category}
              onClick={() => onCategoryToggle(category)}
              className="flex items-center gap-3 text-left group"
            >
              {isActive && <ActiveIndicator />}
              <span
                className={`font-Aeonik text-[1.3rem] leading-normal transition-opacity ${
                  isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                {category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Horizontal Categories */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-5 items-center pb-4 w-max">
          {newsCategories.map((category) => {
            const isActive = activeCategories.includes(category);
            return (
              <button
                key={category}
                onClick={() => onCategoryToggle(category)}
                className="flex items-center gap-2 whitespace-nowrap transition-all"
              >
                {isActive && (
                  <div className="flex gap-[3px] flex-shrink-0">
                    <div className="w-[5px] h-[5px] bg-black rounded-full" />
                    <div className="w-[5px] h-[5px] bg-black rounded-full" />
                  </div>
                )}
                <span
                  className={`font-Aeonik text-[16px] transition-opacity ${
                    isActive ? "opacity-100 font-medium" : "opacity-60"
                  }`}
                >
                  {category}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

