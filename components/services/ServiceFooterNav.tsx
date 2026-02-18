"use client";
import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) observer.observe(titleRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black text-white py-6 lg:py-10 relative"
    >
      <div className="px-4 lg:px-20">
        {/* Top row: Keep scrolling + Next service/page indicator */}
        <div className="flex items-center justify-between mb-4 lg:mb-6">
          {/* Keep scrolling label */}
          <p className="font-Aeonik text-xs lg:text-sm tracking-[0.02em] uppercase text-white/60">
            {showAboutUs ? (
              <>
                Keep Scrolling
                <br className="lg:hidden" />
                <span className="hidden lg:inline"> </span>
                To Learn More
              </>
            ) : (
              "Keep Scrolling"
            )}
          </p>

          {/* Next service/page indicator */}
          <div className="flex items-center gap-3">
            <span className="font-Aeonik text-xs lg:text-sm tracking-[0.02em] uppercase text-white/60">
              {showAboutUs ? "Next Page" : "Next Service"}
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

        {/* Title - Next service or ABOUT US */}
        {showAboutUs ? (
          <Link
            href="/about"
            className="group block"
          >
            <h2
              ref={titleRef}
              className="font-Aeonik text-[clamp(1.75rem,6vw,4rem)] leading-[1.1] tracking-[0.02em] uppercase mb-6 lg:mb-8 opacity-0 translate-y-8 transition-all duration-700 ease-out group-hover:text-[#ff009e]"
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
              className="font-Aeonik text-[clamp(1.75rem,6vw,4rem)] leading-[1.1] tracking-[0.02em] uppercase mb-6 lg:mb-8 opacity-0 translate-y-8 transition-all duration-700 ease-out group-hover:text-[#ff009e]"
            >
              {nextService.name}
            </h2>
          </Link>
        ) : null}

        {/* Bottom row: Plus icons */}
        <div className="flex items-center justify-between">
          <PlusIcon className="text-white w-4 h-4 lg:w-5 lg:h-5" />
          <PlusIcon className="hidden lg:block text-white w-5 h-5" />
          <PlusIcon className="hidden lg:block text-white w-5 h-5" />
          <PlusIcon className="hidden lg:block text-white w-5 h-5" />
          <PlusIcon className="text-white w-4 h-4 lg:w-5 lg:h-5" />
        </div>
      </div>
    </section>
  );
}

