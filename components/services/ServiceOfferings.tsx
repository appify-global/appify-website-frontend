"use client";
import React, { useEffect, useRef } from "react";
import { ServiceOffering } from "@/lib/data/services";
import { TAB_BRAKEPOINT, useIsMobile } from "@/hooks/UseIsMobile";

interface ServiceOfferingsProps {
  subtitle: string;
  offerings: ServiceOffering[];
}

// Decorative dots pattern component
const DotsPattern: React.FC = () => (
  <div className="flex flex-col gap-[6px] absolute top-6 right-6 lg:top-8 lg:right-8">
    {[0, 1, 2].map((row) => (
      <div key={row} className="flex gap-[6px]">
        {Array(11)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-[3px] h-[3px] bg-[#ff009e] rounded-full"
            />
          ))}
      </div>
    ))}
  </div>
);

// Arrow icon pointing up
const UpArrowIcon: React.FC = () => (
  <svg
    width="20"
    height="24"
    viewBox="0 0 20 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 22V2M10 2L2 10M10 2L18 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Single offering card
const OfferingCard: React.FC<{
  offering: ServiceOffering;
  index: number;
  isMobile: boolean;
}> = ({ offering, index, isMobile }) => {
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  // Diagonal offset for desktop only - staggered cascade effect
  const marginTop = isMobile ? 0 : index * 80;

  return (
    <div
      ref={cardRef}
      className="offering-card opacity-0 translate-y-8 transition-all duration-700 ease-out flex-shrink-0"
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="bg-[rgba(197,196,207,0.25)] rounded-[20px] lg:rounded-[24px] p-6 lg:p-8 relative overflow-hidden w-full lg:w-[310px] h-auto lg:h-[480px] flex flex-col"
        style={{ marginTop: `${marginTop}px` }}
      >
        {/* Decorative dots */}
        <DotsPattern />

        {/* Content */}
        <div className="flex flex-col h-full pt-10 lg:pt-12">
          {/* Title */}
          <h3 className="font-Aeonik text-lg lg:text-[22px] leading-[1.25] tracking-[-0.01em] mb-4 pr-16">
            {offering.title}
          </h3>

          {/* Description */}
          <p className="font-Aeonik text-sm lg:text-[14px] leading-[1.6] tracking-[0.01em] text-black/70 flex-1">
            {offering.description}
          </p>

          {/* Category tag with progress bar */}
          <div className="mt-auto pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-Aeonik text-base lg:text-lg tracking-[-0.01em]">
                {offering.category}
              </span>
              <UpArrowIcon />
            </div>
            
            {/* Progress bar */}
            <div className="h-[3px] w-full max-w-[263px] bg-[rgba(83,83,83,0.25)] relative">
              <div className="absolute h-full w-[45%] bg-[#ff009e]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServiceOfferings({ subtitle, offerings }: ServiceOfferingsProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const isMobile = useIsMobile(TAB_BRAKEPOINT);

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
    if (subtitleRef.current) observer.observe(subtitleRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
    };
  }, []);

  return (
    <section className="w-full px-[4vw] sm:px-[6vw] lg:px-20 py-10 sm:py-12 lg:py-24 relative overflow-visible">
      {/* Decorative curved line (SVG) - desktop only */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none hidden lg:block"
        viewBox="0 0 1920 2500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M-177 164C200 500 800 800 1200 600C1600 400 1800 1000 1927 1500"
          stroke="#ff009e"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.2"
        />
      </svg>

      {/* Title section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 sm:gap-6 lg:gap-20 mb-6 sm:mb-8 lg:mb-16">
        <h2
          ref={titleRef}
          className="font-Aeonik text-[clamp(3rem,10vw,8rem)] leading-[0.95] tracking-[-0.02em] opacity-0 translate-y-8 transition-all duration-700 ease-out italic"
        >
          What We Do
        </h2>

        <p
          ref={subtitleRef}
          className="font-Aeonik text-xs lg:text-sm uppercase tracking-[0.02em] max-w-[340px] opacity-0 translate-y-8 transition-all duration-700 ease-out delay-150 lg:mt-[64px] leading-[1.5]"
        >
          {subtitle}
        </p>
      </div>

      {/* Offerings cards - diagonal layout on desktop */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 overflow-x-auto lg:overflow-visible pb-4">
        {offerings.map((offering, index) => (
          <OfferingCard key={index} offering={offering} index={index} isMobile={isMobile} />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="flex items-center justify-end gap-3 mt-8 sm:mt-10 lg:mt-16">
        <span className="font-Aeonik text-sm uppercase tracking-wide">
          Scroll to Explore
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 2V18M11 18L3 10M11 18L19 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}

