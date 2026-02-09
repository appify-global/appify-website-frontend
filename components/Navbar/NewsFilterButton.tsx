"use client";

import { useState, useRef, useEffect } from "react";
import { useNewsFilter, SortOption } from "@/contexts/NewsFilterContext";

const topics = ["All", "AI", "Automation", "Web", "Startups", "Defi", "Web3", "Work", "Design", "Culture"];
const sortOptions: SortOption[] = ["Latest", "Most Popular", "Most Read", "Featured"];

export default function NewsFilterButton() {
  const filter = useNewsFilter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Don't render if not on news page (no context)
  if (!filter) return null;

  const { activeCategories, sortBy, toggleCategory, setSortBy, setAllCategories } = filter;

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleTopicClick = (topic: string) => {
    if (topic === "All") {
      setAllCategories();
    } else {
      toggleCategory(topic);
    }
  };

  const isTopicActive = (topic: string) => {
    if (topic === "All") return activeCategories.length === 0;
    return activeCategories.includes(topic);
  };

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative">
      {/* Filter Button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        aria-label="Filter"
        className="flex items-center justify-center rounded-full transition-colors duration-300 cursor-pointer"
        style={{
          width: "3.2em",
          height: "3.2em",
          fontSize: "0.875em",
          background: isOpen ? "#fff" : "var(--color-background-alt, #e4e6ef)",
          color: "#000",
          border: "none",
          marginLeft: "0.5rem",
        }}
      >
        {isOpen ? (
          /* X icon when open */
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.1, 1)",
            }}
          >
            <path
              d="M1 1L13 13M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          /* Plus icon when closed */
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transition: "transform 0.3s cubic-bezier(0.4, 0, 0.1, 1)",
            }}
          >
            <path
              d="M8 1V15M1 8H15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {/* Dropdown - Horizontal layout */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-[calc(100%+1.25rem)] z-50 flex items-start gap-3"
        >
          {/* Topics Section */}
          <div className="bg-white rounded-[20px] px-10 py-8 shadow-[0_8px_40px_rgba(0,0,0,0.08)]" style={{ width: "520px" }}>
            <span className="font-Aeonik text-[13px] uppercase tracking-[0.2em] text-[rgba(0,0,0,0.35)] mb-6 block">
              Topics
            </span>
            <div className="grid grid-cols-2 gap-x-16 gap-y-5">
              {topics.map((topic) => {
                const active = isTopicActive(topic);
                return (
                  <button
                    key={topic}
                    onClick={() => handleTopicClick(topic)}
                    className="flex items-center gap-3 text-left group"
                  >
                    {active && (
                      <span className="flex gap-[3px] flex-shrink-0">
                        <span className="w-[6px] h-[6px] bg-black rounded-full inline-block" />
                        <span className="w-[6px] h-[6px] bg-black rounded-full inline-block" />
                      </span>
                    )}
                    <span
                      className={`font-Aeonik text-[22px] transition-opacity ${
                        active ? "opacity-100" : "opacity-40 group-hover:opacity-70"
                      }`}
                    >
                      {topic}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort By Section */}
          <div className="bg-[#1B1B1B] rounded-[20px] px-10 py-8 shadow-[0_8px_40px_rgba(0,0,0,0.15)]" style={{ width: "280px" }}>
            <span className="font-Aeonik text-[13px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.35)] mb-6 block">
              Sort by
            </span>
            <div className="flex flex-col gap-5">
              {sortOptions.map((option) => {
                const active = sortBy === option;
                return (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="flex items-center gap-3 text-left group"
                  >
                    {active && (
                      <span className="w-[6px] h-[6px] bg-white rounded-full inline-block flex-shrink-0" />
                    )}
                    <span
                      className={`font-Aeonik text-[22px] text-white transition-opacity ${
                        active ? "opacity-100" : "opacity-40 group-hover:opacity-70"
                      }`}
                    >
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
