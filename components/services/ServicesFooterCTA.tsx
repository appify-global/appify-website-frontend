"use client";

import { useEffect, useRef, useMemo } from "react";
import DotButton from "@/components/ui/DotButton";

// Plus icon separator row
const PlusIconRow = () => (
  <div className="flex items-center justify-between w-full py-4">
    {[0, 1, 2].map((i) => (
      <svg
        key={i}
        width="21"
        height="21"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 lg:w-5 lg:h-5"
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

// Deterministic pseudo-random function based on index
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

// Company logo placeholders - representing various tech/partner companies
const CompanyLogos = () => {
  // Using generic circle placeholders as logos
  const logoCount = 42; // Grid of logos as shown in Figma
  
  // Pre-compute random-like values using deterministic seeding (pure during render)
  const logoStyles = useMemo(() => 
    Array.from({ length: logoCount }).map((_, i) => ({
      opacity: 0.4 + seededRandom(i) * 0.6,
      scale: 0.8 + seededRandom(i + 100) * 0.4,
    })),
    []
  );
  
  return (
    <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[400px] overflow-hidden">
      {/* Background gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F1FA] via-transparent to-[#F0F1FA] z-10 pointer-events-none" />
      
      {/* Logo grid */}
      <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-14 gap-2 lg:gap-3 p-4">
        {logoStyles.map((style, i) => (
          <div
            key={i}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 rounded-full bg-[#E4E6EF] flex items-center justify-center overflow-hidden"
            style={{
              opacity: style.opacity,
              transform: `scale(${style.scale})`,
            }}
          >
            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-[#D1D3DC]" />
          </div>
        ))}
      </div>
    </div>
  );
};

const ServicesFooterCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("footer-cta--visible");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="footer-cta relative w-full pt-16 sm:pt-20 lg:pt-32 pb-8 sm:pb-10 lg:pb-24"
    >
      {/* Plus icon separator */}
      <PlusIconRow />

      {/* Company logos background */}
      <div className="relative mt-6 sm:mt-8">
        <CompanyLogos />
        
        {/* Centered CTA content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          {/* Subtitle */}
          <p className="font-Aeonik text-xs sm:text-sm uppercase tracking-wider text-[#666] mb-4">
            IS YOUR BIG IDEA READY TO GO WILD?
          </p>
          
          {/* Main title */}
          <h2 className="font-Aeonik text-[clamp(1.75rem,6vw,6rem)] leading-[1] text-center">
            <span className="block">Let&apos;s work</span>
            <span className="block">together!</span>
          </h2>
        </div>
      </div>

      {/* Plus icon separator */}
      <PlusIconRow />

      {/* CTA button */}
      <div className="flex justify-center mt-6 sm:mt-8">
        <DotButton
          text="CONTINUE TO SCROLL"
          variant="white"
          href="#footer"
        />
      </div>
    </section>
  );
};

export default ServicesFooterCTA;

