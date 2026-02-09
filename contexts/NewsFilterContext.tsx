"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type SortOption = "Latest" | "Most Popular" | "Most Read" | "Featured";

interface NewsFilterContextType {
  activeCategories: string[];
  sortBy: SortOption;
  toggleCategory: (category: string) => void;
  setSortBy: (sort: SortOption) => void;
  setAllCategories: () => void;
}

const NewsFilterContext = createContext<NewsFilterContextType | null>(null);

export function useNewsFilter() {
  return useContext(NewsFilterContext);
}

export function NewsFilterProvider({ children }: { children: ReactNode }) {
  const [activeCategories, setActiveCategories] = useState<string[]>(["AI", "Startups"]);
  const [sortBy, setSortBy] = useState<SortOption>("Latest");

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }
      return [...prev, category];
    });
  };

  const setAllCategories = () => {
    setActiveCategories([]);
  };

  return (
    <NewsFilterContext.Provider
      value={{ activeCategories, sortBy, toggleCategory, setSortBy, setAllCategories }}
    >
      {children}
    </NewsFilterContext.Provider>
  );
}
