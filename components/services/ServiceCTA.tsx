"use client";
import React, { useEffect, useRef } from "react";

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

// Tech icon frame - glass morphism style card with abstract tech symbol
const TechIconFrame: React.FC<{ 
  variant: 'circle' | 'square' | 'diamond' | 'triangle' | 'lines' | 'dots' | 'grid' | 'wave';
  size?: 'sm' | 'md' | 'lg';
  rotation?: number;
}> = ({ variant, size = 'md', rotation = 0 }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
  };

  const iconSize = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const renderIcon = () => {
    const s = iconSize[size];
    switch (variant) {
      case 'circle':
        return (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <circle cx="12" cy="12" r="4" fill="currentColor" opacity="0.4" />
          </svg>
        );
      case 'square':
        return (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
            <rect x="5" y="5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.4" />
          </svg>
        );
      case 'diamond':
        return (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
            <path d="M12 3L21 12L12 21L3 12L12 3Z" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <path d="M12 8L16 12L12 16L8 12L12 8Z" fill="currentColor" opacity="0.4" />
          </svg>
        );
      case 'triangle':
        return (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
            <path d="M12 4L22 20H2L12 4Z" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <path d="M12 10L17 18H7L12 10Z" fill="currentColor" opacity="0.3" />
          </svg>
        );
      case 'lines':
        return (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
            <line x1="4" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
            <line x1="4" y1="16" x2="20" y2="16" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
          </svg>
        );
      case 'dots':
        return (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
            <circle cx="6" cy="6" r="2" fill="currentColor" opacity="0.5" />
            <circle cx="12" cy="6" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="18" cy="6" r="2" fill="currentColor" opacity="0.5" />
            <circle cx="6" cy="12" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.8" />
            <circle cx="18" cy="12" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="6" cy="18" r="2" fill="currentColor" opacity="0.5" />
            <circle cx="12" cy="18" r="2" fill="currentColor" opacity="0.6" />
            <circle cx="18" cy="18" r="2" fill="currentColor" opacity="0.5" />
          </svg>
        );
      case 'grid':
        return (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <rect x="14" y="4" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <rect x="4" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            <rect x="14" y="14" width="6" height="6" rx="1" fill="currentColor" opacity="0.4" />
          </svg>
        );
      case 'wave':
        return (
          <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
            <path d="M2 12C4 8 6 16 8 12C10 8 12 16 14 12C16 8 18 16 20 12C22 8 24 16 26 12" stroke="currentColor" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`${sizeClasses[size]} bg-white/80 backdrop-blur-md border border-black/5 rounded-xl flex items-center justify-center text-black/60 shadow-sm`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {renderIcon()}
    </div>
  );
};

export default function ServiceCTA() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

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
    <section className="w-full bg-[#F0F1FA] pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32 relative overflow-hidden">
      {/* Decorative plus icons at corners */}
      <div className="absolute top-6 left-[4vw] sm:left-[6vw] lg:left-20">
        <PlusIcon className="text-black w-5 h-5" />
      </div>

      {/* Floating tech icons background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block">
          {/* Left side scattered icons */}
          <div className="absolute top-[25%] left-[6%]">
            <TechIconFrame variant="circle" size="md" rotation={-12} />
          </div>
          <div className="absolute top-[35%] left-[14%]">
            <TechIconFrame variant="square" size="sm" rotation={8} />
          </div>
          <div className="absolute top-[48%] left-[4%]">
            <TechIconFrame variant="diamond" size="lg" rotation={-5} />
          </div>
          <div className="absolute top-[55%] left-[18%]">
            <TechIconFrame variant="lines" size="md" rotation={15} />
          </div>
          <div className="absolute top-[68%] left-[8%]">
            <TechIconFrame variant="dots" size="sm" rotation={-10} />
          </div>
          <div className="absolute top-[78%] left-[20%]">
            <TechIconFrame variant="triangle" size="md" rotation={5} />
          </div>
          
          {/* Right side scattered icons */}
          <div className="absolute top-[22%] right-[8%]">
            <TechIconFrame variant="grid" size="md" rotation={10} />
          </div>
          <div className="absolute top-[32%] right-[18%]">
            <TechIconFrame variant="wave" size="sm" rotation={-8} />
          </div>
          <div className="absolute top-[45%] right-[5%]">
            <TechIconFrame variant="circle" size="lg" rotation={12} />
          </div>
          <div className="absolute top-[58%] right-[15%]">
            <TechIconFrame variant="square" size="md" rotation={-15} />
          </div>
          <div className="absolute top-[70%] right-[6%]">
            <TechIconFrame variant="diamond" size="sm" rotation={5} />
          </div>
          <div className="absolute top-[80%] right-[22%]">
            <TechIconFrame variant="lines" size="md" rotation={-12} />
          </div>
        </div>
      </div>

      <div className="px-[4vw] sm:px-[6vw] lg:px-20 relative z-10 text-center">
        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-Aeonik text-xs lg:text-sm uppercase tracking-[0.05em] mb-4 lg:mb-5 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          IS YOUR BIG IDEA READY TO GO WILD?
        </p>

        {/* Main title */}
        <h2
          ref={titleRef}
          className="font-Aeonik text-[clamp(2.5rem,10vw,7rem)] leading-[1.05] tracking-[-0.02em] mb-6 sm:mb-8 lg:mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out delay-150"
        >
          Let&apos;s work<br />together!
        </h2>

        {/* Plus icons row */}
        <div className="flex items-center justify-center gap-12 sm:gap-24 lg:gap-80 mb-6">
          <PlusIcon className="text-black w-4 h-4 lg:w-5 lg:h-5" />
          <PlusIcon className="text-black w-4 h-4 lg:w-5 lg:h-5" />
          <PlusIcon className="text-black w-4 h-4 lg:w-5 lg:h-5" />
        </div>

        {/* Continue to scroll button */}
        <a
          href="#footer"
          className="inline-flex items-center gap-3 bg-black text-white rounded-full px-5 py-3 hover:bg-[#2B2E3A] transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M12 20L18 14M12 20L6 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-Aeonik text-xs lg:text-sm tracking-[-0.02em] uppercase">
            Continue to Scroll
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4V20M12 20L18 14M12 20L6 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

