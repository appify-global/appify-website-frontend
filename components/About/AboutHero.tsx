"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// Plus icon component
const PlusIcon = ({ className = "" }: { className?: string }) => (
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

const AboutHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current) return;

    // Animate title on load
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-[60vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[877px] overflow-hidden bg-[var(--color-background,#F0F1FA)]"
    >
      {/* Masked "ABOUT" and "US" text effect */}
      <div className="absolute inset-0 z-[1]">
        {/* Large ABOUT text with gradient mask */}
        <div className="absolute left-[-8%] md:left-[-10%] lg:left-[-15%] top-[10%] sm:top-[12%] lg:top-[103px]">
          <h1 className="font-Aeonik text-[24vw] sm:text-[26vw] md:text-[22vw] lg:text-[138px] xl:text-[180px] leading-[0.85] tracking-[0.03em] text-transparent bg-clip-text bg-gradient-to-br from-black/10 to-black/5">
            ABOUT
          </h1>
        </div>
        {/* US text positioned right */}
        <div className="absolute right-[4%] md:right-[8%] lg:right-[52%] top-[26%] sm:top-[28%] md:top-[30%] lg:top-[484px]">
          <span className="font-Aeonik text-[22vw] sm:text-[24vw] md:text-[20vw] lg:text-[183px] leading-[1] tracking-[0.03em] text-transparent bg-clip-text bg-gradient-to-br from-black/20 to-black/5">
            US
          </span>
        </div>
      </div>

      {/* Main content - extra top padding on mobile/tablet for gap below navbar */}
      <div className="relative z-[3] h-full flex flex-col justify-between px-[5vw] sm:px-[6vw] md:px-[5vw] lg:px-[5vw] pt-[22vh] sm:pt-[20vh] md:pt-[18vh] lg:pt-0 pb-[5vh] sm:pb-[6vh] md:pb-[7vh] lg:pb-[80px]">
        {/* Plus icon row - show on tablet too */}
        <div className="hidden md:flex lg:mt-[280px] items-center justify-between w-full mt-0 md:mt-10">
          {[0, 1, 2, 3, 4].map((i) => (
            <PlusIcon key={i} className="w-5 h-5 text-black/60" />
          ))}
        </div>

        {/* Title container */}
        <div ref={titleRef} className="flex-1 flex items-end lg:items-start lg:mt-[60px]">
          <div className="w-full">
            {/* Mobile & tablet title - consistent sizes and spacing */}
            <div className="lg:hidden space-y-0">
              <h1 className="font-Aeonik text-[clamp(2.5rem,18vw,4rem)] sm:text-[clamp(3rem,20vw,4.5rem)] md:text-[clamp(3.25rem,14vw,4.5rem)] leading-[0.95] text-black tracking-[0.04em]">
                ABOUT
              </h1>
              <h1 className="font-Aeonik text-[clamp(2.5rem,18vw,4rem)] sm:text-[clamp(3rem,20vw,4.5rem)] md:text-[clamp(3.25rem,14vw,4.5rem)] leading-[0.95] text-black tracking-[0.04em] -mt-1 sm:-mt-0.5">
                US
              </h1>
            </div>

            {/* Desktop title */}
            <div className="hidden lg:block">
              <h1 className="font-Aeonik text-[clamp(100px,12vw,220px)] leading-[1] text-black tracking-[0.04em]">
                About Us
              </h1>
            </div>

            {/* Year indicator - desktop only - hidden for now */}
            {/* <div className="hidden lg:flex items-start gap-4 absolute right-[5vw] top-[440px]">
              <span className="font-Aeonik text-[5rem] lg:text-[88px] text-white leading-none">
                15
              </span>
              <div className="w-[124px] h-[124px] border border-white/30 rounded-sm flex items-center justify-center">
                <span className="text-white/60 text-xs">YEARS</span>
              </div>
            </div> */}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex items-center justify-center lg:justify-end gap-2.5 sm:gap-3 md:gap-4 mt-8 sm:mt-10 md:mt-12 lg:mt-0">
          <PlusIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-black/60 hidden md:block" />
          <span className="font-Aeonik text-[clamp(0.625rem,2.5vw,0.875rem)] text-black/80 tracking-[0.04em] uppercase">
            SCROLL TO EXPLORE
          </span>
          <PlusIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-black/60 hidden md:block" />
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
