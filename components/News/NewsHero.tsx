"use client";

import { FaArrowRight } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface NewsHeroProps {
  title?: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSearchSubmit?: () => void;
  onSearchClear?: () => void;
}

export default function NewsHero({
  title = "Newsroom",
  searchQuery = "",
  onSearchChange,
  onSearchSubmit,
  onSearchClear,
}: NewsHeroProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearchSubmit?.();
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8 lg:gap-12">
      {/* Title */}
      <h1 className="font-Aeonik text-[clamp(3rem,6vw,6.5rem)] leading-[1] tracking-[-0.01em] text-black">
        {title}
      </h1>

      {/* Search Bar - Tablet & Desktop */}
      <div className="hidden md:flex w-full max-w-[280px] lg:max-w-[350px] flex-shrink-0">
        <div className="relative w-full">
          <div className="backdrop-blur-[9px] bg-[rgba(226,227,234,0.05)] border border-white/20 rounded-full px-5 py-4 flex items-center justify-between w-full shadow-[0px_4px_56px_0px_rgba(0,0,0,0.05),0px_15px_134px_-9px_rgba(0,0,0,0.1)]">
            <input
              type="text"
              placeholder="ASK ANYTHING"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent outline-none text-black text-sm tracking-wide uppercase font-Aeonik w-full placeholder:text-[rgba(0,0,0,0.47)]"
            />
            {searchQuery ? (
              <button onClick={onSearchClear} className="text-black/50 hover:text-black transition-colors">
                <IoClose size={16} />
              </button>
            ) : (
              <button onClick={onSearchSubmit} className="text-black/50 hover:text-black transition-colors">
                <FaArrowRight size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

