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

      {/* Mobile Horizontal Pills */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-4 items-center pb-4 w-max">
          {newsCategories.map((category) => {
            const isActive = activeCategories.includes(category);
            return (
              <button
                key={category}
                onClick={() => onCategoryToggle(category)}
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
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

