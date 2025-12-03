"use client";

import { FaArrowRight } from "react-icons/fa";

interface NewsHeroProps {
  title?: string;
}

export default function NewsHero({ title = "Newsroom" }: NewsHeroProps) {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-12">
      {/* Title */}
      <h1 className="font-Aeonik text-[clamp(3rem,6vw,6.5rem)] leading-[1] tracking-[-0.01em] text-black">
        {title}
      </h1>

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
  );
}

