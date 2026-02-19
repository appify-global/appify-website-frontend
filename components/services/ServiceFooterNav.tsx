"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface ServiceFooterNavProps {
  nextService?: {
    category: string;
    slug: string;
    name: string;
  };
  showAboutUs?: boolean;
}

// Plus icon component
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M11.7581 0.149597V9.84198H21.4504V11.758H11.7581V21.4504H9.84204V11.758H0.149658V9.84198H9.84204V0.149597H11.7581Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.3"
    />
  </svg>
);

// Right arrow icon
const RightArrowIcon: React.FC = () => (
  <svg
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    <path
      d="M1 8H19M19 8L12 1M19 8L12 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ServiceFooterNav({ nextService, showAboutUs = false }: ServiceFooterNavProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(true); // Start visible by default

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const currentTitle = titleRef.current;
    if (currentTitle) {
      // Check if already in viewport
      const checkVisibility = () => {
        const rect = currentTitle.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
          // If already visible, add class immediately
          currentTitle.classList.add("is-visible");
          setIsVisible(true);
          return true;
        }
        return false;
      };
      
      // Check immediately
      if (!checkVisibility()) {
        // Otherwise observe for when it comes into view
        observer.observe(currentTitle);
      }
      
      // Fallback: ensure visibility after a delay if observer doesn't trigger
      const fallbackTimeout = setTimeout(() => {
        if (currentTitle && !currentTitle.classList.contains("is-visible")) {
          currentTitle.classList.add("is-visible");
          setIsVisible(true);
        }
      }, 1000);
      
      return () => {
        if (currentTitle) observer.unobserve(currentTitle);
        clearTimeout(fallbackTimeout);
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black text-white pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-24 lg:pb-32 relative"
    >
      <div className="px-[4vw]">
        {/* Container with top row and heading aligned at bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          {/* Left side: Keep scrolling + Service name */}
          <div className="flex flex-col items-start">
            {/* Keep scrolling label */}
            <p className="text-xs sm:text-sm lg:text-xl text-gray-400 mb-4 sm:mb-6 tracking-wide">
              {showAboutUs ? "KEEP SCROLLING TO LEARN MORE" : "KEEP SCROLLING TO LEARN MORE"}
            </p>

            {/* Title - Next service or ABOUT US */}
            {showAboutUs ? (
              <Link
                href="/about"
                className="group block"
              >
                <h2
                  ref={titleRef}
                  className={`text-2xl sm:text-3xl md:text-4xl font-light transition-all duration-700 ease-out group-hover:text-[#ff009e] ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  ABOUT US
                </h2>
              </Link>
            ) : nextService ? (
              <Link
                href={`/services/${nextService.category}/${nextService.slug}`}
                className="group block"
              >
                <h2
                  ref={titleRef}
                  className={`text-2xl sm:text-3xl md:text-4xl font-light transition-all duration-700 ease-out group-hover:text-[#ff009e] ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  {nextService.name}
                </h2>
              </Link>
            ) : null}
          </div>

          {/* Right side: Next service/page indicator */}
          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base lg:text-xl">
              {showAboutUs ? "NEXT PAGE" : "NEXT SERVICE"}
            </span>
            
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              <div className="h-[4px] w-[120px] lg:w-[160px] bg-[#34393f] rounded-full relative">
                <div className="absolute h-full w-[33%] bg-[#ff009e] rounded-full" />
              </div>
              <RightArrowIcon />
            </div>
          </div>
        </div>

        {/* Bottom row: Plus icons */}
        <div className="grid grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 text-center text-sm sm:text-base lg:text-lg opacity-90">
          <span>+</span>
          <span>+</span>
          <span>+</span>
          <span>+</span>
        </div>
      </div>
    </section>
  );
}
