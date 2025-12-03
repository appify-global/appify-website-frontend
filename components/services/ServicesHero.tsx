"use client";

import { useEffect, useRef } from "react";
import DotButton from "@/components/ui/DotButton";

interface PlusIconProps {
  className?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({ className }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-3 h-3 lg:w-4 lg:h-4 ${className || ""}`}
  >
    <path
      d="M11.7581 0.149597V9.84198H21.4504V11.758H11.7581V21.4504H9.84204V11.758H0.149658V9.84198H9.84204V0.149597H11.7581Z"
      fill="#1B1B1B"
      stroke="black"
      strokeWidth="0.3"
    />
  </svg>
);

// Category letter icons
const CategoryLetters = () => (
  <div className="flex items-center gap-3 lg:gap-4">
    {['s', 'c', 'd', 'i'].map((letter) => (
      <div 
        key={letter}
        className="w-8 h-10 lg:w-10 lg:h-14 flex items-center justify-center bg-[#E4E6EF] rounded-lg"
      >
        <img 
          src={`/eight-bit-icons/${letter}.svg`} 
          alt={letter.toUpperCase()} 
          className="w-3 h-4 lg:w-4 lg:h-5"
        />
      </div>
    ))}
  </div>
);

const ServicesHero = () => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("services-hero--visible");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full px-4 lg:px-[5vw] pt-8 lg:pt-0">
      <div ref={titleRef} className="services-hero">
        {/* Main title section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-0">
          {/* Left side - Main title */}
          <div className="flex flex-col">
            <h1 className="font-Aeonik text-[clamp(3rem,12vw,11rem)] leading-[0.95] tracking-[-0.02em]">
              <span className="block services-title-line services-title-line-1">AREA OF</span>
              <span className="block services-title-line services-title-line-2 lg:pl-[15%]">EXPERTISE</span>
            </h1>
          </div>

          {/* Right side - Category letters (desktop only) */}
          <div className="hidden lg:flex flex-col items-end gap-4 pt-8">
            <CategoryLetters />
          </div>
        </div>

        {/* Subtitle and description row */}
        <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16">
          {/* Subtitle */}
          <div className="lg:max-w-[400px]">
            <p className="font-Aeonik text-[clamp(0.7rem,1.2vw,0.9rem)] leading-relaxed text-[#666] uppercase tracking-wide">
              A TEAM OF EXPERIENCED INVENTORS &amp; DREAMERS WITH A WIDE RANGE OF SKILLS AND KNOWLEDGE
            </p>
            
            {/* Category letters (mobile only) */}
            <div className="lg:hidden mt-6">
              <CategoryLetters />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-12 lg:mt-16 w-full flex items-center justify-between font-medium uppercase text-sm lg:text-base font-Aeonik">
          <PlusIcon />
          <PlusIcon className="hidden lg:inline-block" />
          <div className="mx-2 lg:mx-4">Scroll to Explore</div>
          <PlusIcon className="hidden lg:inline-block" />
          <PlusIcon />
        </div>
      </div>

      {/* Floating Cards Section - simplified version */}
      <div className="relative mt-8 lg:mt-0 h-auto lg:h-[30vh] flex items-center justify-center overflow-visible">
        <div className="relative w-full max-w-[800px] h-[250px] lg:h-[350px] mx-auto">
          {/* Card stack - simplified static version for the hero */}
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-[120px] lg:w-[180px] h-[160px] lg:h-[240px]"
              style={{
                transform: `translate(-50%, -50%) translateX(${(i - 1.5) * 30}%) rotate(${(i - 1.5) * 5}deg)`,
                zIndex: i === 1 || i === 2 ? 10 : 5,
              }}
            >
              <div className="w-full h-full rounded-xl lg:rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="/bg-card.png"
                  alt="Appify Card"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-8 lg:mt-4 flex justify-start lg:justify-start">
        <DotButton
          text="FREE DISCOVERY CALL"
          variant="white"
          className="free-discovery-call-btn"
          href="/#contact"
        />
      </div>

      {/* Description paragraphs */}
      <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="lg:col-start-2">
          <p className="font-Aeonik text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.6] text-[#444]">
            At Appify, we deliver custom software development, AI and machine learning solutions, mobile app development, and enterprise ERP systems across Australia, UAE, and Qatar. We specialise in unprecedented AI implementations, digital transformation projects, complex system integrations, and automation challenges that require cutting-edge technology and proven expertise.
          </p>
          <p className="font-Aeonik text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.6] text-[#444] mt-6">
            We don&apos;t just build applications and disappear. Our software development approach focuses on true partnership with your team - from strategic consulting and architecture design to deployment and beyond.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;

