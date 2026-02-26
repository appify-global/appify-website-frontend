"use client";

import { useEffect, useRef, ReactElement } from "react";
import Image from "next/image";
import { Category, ServiceCategory } from "@/lib/data/services";
import { getCategoryVideoSrc } from "@/lib/video";
import ServiceLink from "./ServiceLink";

interface CategorySectionProps {
  category: Category;
  index: number;
}

// Decorative ruler component
const Ruler = ({ position = "top" }: { position?: "top" | "bottom" }) => (
  <div className="flex items-center gap-[2vw] w-full max-w-[260px]">
    {/* Main marks */}
    <div className="w-[3px] h-4 bg-[#2B2E3A]" />
    <div className={`w-[2px] h-2 bg-[#2B2E3A]/50 ${position === 'bottom' ? 'mt-2' : ''}`} />
    <div className={`w-[2px] h-2 bg-[#2B2E3A]/50 ${position === 'bottom' ? 'mt-2' : ''}`} />
    <div className={`w-[2px] h-2 bg-[#2B2E3A]/50 ${position === 'bottom' ? 'mt-2' : ''}`} />
    <div className={`w-[2px] h-2 bg-[#2B2E3A]/50 ${position === 'bottom' ? 'mt-2' : ''}`} />
    <div className="w-[3px] h-4 bg-[#2B2E3A]" />
    <div className={`w-[2px] h-2 bg-[#2B2E3A]/50 ${position === 'bottom' ? 'mt-2' : ''}`} />
    <div className={`w-[2px] h-2 bg-[#2B2E3A]/50 ${position === 'bottom' ? 'mt-2' : ''}`} />
    <div className={`w-[2px] h-2 bg-[#2B2E3A]/50 ${position === 'bottom' ? 'mt-2' : ''}`} />
    <div className={`w-[2px] h-2 bg-[#2B2E3A]/50 ${position === 'bottom' ? 'mt-2' : ''}`} />
    <div className="w-[3px] h-4 bg-[#2B2E3A]" />
  </div>
);

// Progress bar component
const ProgressBar = ({ progress = 0.8 }: { progress?: number }) => (
  <div className="w-full max-w-[263px] h-[3px] bg-[#E4E6EF] relative">
    <div 
      className="absolute top-0 left-0 h-full bg-[#2B2E3A] transition-all duration-300"
      style={{ width: `${progress * 100}%` }}
    />
  </div>
);

// Category icon shapes from Figma
const CategoryIcon = ({ categoryId }: { categoryId: ServiceCategory }) => {
  const iconPaths: Record<ServiceCategory, ReactElement> = {
    strategy: (
      <svg viewBox="0 0 133 175" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M128.29 174.941H0V132.178H38.876V85.5264H128.29V174.941ZM132.178 38.876H38.876V85.5264H0V0H132.178V38.876Z" fill="#2B2E3A"/>
      </svg>
    ),
    creative: (
      <svg viewBox="0 0 137 175" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M132.222 175H42.7773V132.222H132.222V175ZM136.111 46.667H42.7773V132.222H0V42.7773H42.7773V0H136.111V46.667Z" fill="#2B2E3A"/>
      </svg>
    ),
    development: (
      <svg viewBox="0 0 136 175" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M99.2227 43H135.889V132.444H98.5557V174.777H0V42.7773H0.222656V0H99.2227V43ZM43 132H93.1113V47H43V132Z" fill="#2B2E3A"/>
      </svg>
    ),
    intelligence: (
      <svg viewBox="0 0 43 175" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M43 175H0V0H43V175Z" fill="#2B2E3A"/>
      </svg>
    ),
  };

  return (
    <div className="w-[50px] h-[65px] sm:w-[60px] sm:h-[80px] lg:w-[100px] lg:h-[130px]">
      {iconPaths[categoryId]}
    </div>
  );
};

// Plus icon separator row
const PlusIconRow = () => (
  <div className="flex items-center justify-between w-full py-4">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg
        key={i}
        width="21"
        height="21"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-4 h-4 lg:w-5 lg:h-5 ${i > 0 && i < 4 ? 'hidden lg:block' : ''}`}
      >
        <path
          d="M11.7581 0.149597V9.84198H21.4504V11.758H11.7581V21.4504H9.84204V11.758H0.149658V9.84198H9.84204V0.149597H11.7581Z"
          fill="#1B1B1B"
          stroke="black"
          strokeWidth="0.3"
        />
      </svg>
    ))}
  </div>
);

const CategorySection = ({ category, index }: CategorySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("category-section--visible");
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const categoryVideos: Partial<Record<ServiceCategory, string>> = {
    strategy: getCategoryVideoSrc("Strategy.mp4"),
    creative: getCategoryVideoSrc("Creative.mp4"),
    development: getCategoryVideoSrc("Development.mp4"),
    intelligence: getCategoryVideoSrc("Intelligence.mp4"),
  };

  // Fallback images for categories without video
  const categoryImages: Record<ServiceCategory, string> = {
    strategy: "/projects/prelo.png",
    creative: "/projects/booked-ai.png",
    development: "/projects/guardian.png",
    intelligence: "/projects/entoda.png",
  };

  return (
    <section 
      ref={sectionRef}
      className="category-section w-full pt-6 sm:pt-8 lg:pt-16"
    >
      {/* Plus icon separator at top */}
      <PlusIconRow />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 mt-6 sm:mt-8 lg:mt-16">
        {/* Left column - Image and title */}
        <div className="flex flex-col">
          {/* Ruler (top) */}
          <div className="mb-4">
            <Ruler position="top" />
          </div>

          {/* Category title */}
          <h2 className="font-Aeonik text-[clamp(2rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em] mb-6 lg:mb-8">
            {category.label.toUpperCase()}
          </h2>

          {/* Media - video for strategy, image for others */}
          <div className="relative w-full aspect-video rounded-xl lg:rounded-2xl overflow-hidden bg-[#E4E6EF]">
            {categoryVideos[category.id] ? (
              <video
                src={categoryVideos[category.id]}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={categoryImages[category.id]}
                alt={`${category.label} services`}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Ruler (bottom) - mobile only */}
          <div className="mt-4 lg:hidden">
            <Ruler position="bottom" />
          </div>
        </div>

        {/* Right column - Description and services */}
        <div className="flex flex-col justify-between lg:pt-24">
          {/* Top section with ruler and description */}
          <div>
            {/* Ruler */}
            <div className="mb-4 hidden lg:block">
              <Ruler position="top" />
            </div>

            {/* Description */}
            <p className="font-Aeonik text-[clamp(0.9rem,1.2vw,1rem)] leading-[1.6] text-[#444] mb-8 lg:mb-12">
              {category.description}
            </p>

            {/* Service links */}
            <div className="flex flex-col gap-0 sm:gap-1 lg:gap-3">
              {category.services.map((service) => (
                <ServiceLink key={service.id} service={service} />
              ))}
            </div>
          </div>

          {/* Bottom section with icon and progress */}
          <div className="flex items-end justify-between mt-8 lg:mt-12">
            {/* Progress bar */}
            <div>
              <ProgressBar progress={0.8} />
            </div>

            {/* Category icon */}
            <div className="ml-auto">
              <CategoryIcon categoryId={category.id} />
            </div>
          </div>

          {/* Ruler (bottom) - desktop only */}
          <div className="mt-4 hidden lg:block">
            <Ruler position="bottom" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;

