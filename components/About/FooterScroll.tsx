"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
// Right arrow icon (matching ServiceFooterNav style)
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

const FooterScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[40vh] lg:min-h-[456px] bg-black overflow-hidden py-[60px] lg:py-[95px] px-[6vw] lg:px-[5vw]"
    >
      {/* Keep scrolling text */}
      <p className="font-Aeonik text-[14px] lg:text-[16px] text-white/60 uppercase tracking-wide mb-[30px] lg:mb-[40px]">
        KEEP SCROLLING
        <br className="lg:hidden" />
        <span className="hidden lg:inline"> </span>
        TO LEARN MORE
      </p>

      {/* Main title and navigation */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        {/* About Us title */}
        <h2
          ref={titleRef}
          className="font-Aeonik text-[12vw] lg:text-[44px] xl:text-[56px] leading-[1.1] text-white mb-[30px] lg:mb-0"
        >
          ABOUT US
        </h2>

        {/* Next page indicator */}
        <div className="flex items-center gap-3">
          <span className="font-Aeonik text-[14px] lg:text-[16px] text-white/60 uppercase">
            NEXT PAGE
          </span>
          <div className="flex items-center gap-2">
            <div className="h-[4px] w-[120px] lg:w-[160px] bg-[#34393f] rounded-full relative">
              <div className="absolute h-full w-[33%] bg-[#ff009e] rounded-full" />
            </div>
            <RightArrowIcon />
          </div>
        </div>
      </div>

      {/* Plus icon row */}
      <div className="flex items-center justify-between w-full mt-[50px] lg:mt-[80px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <PlusIcon
            key={i}
            className={`w-4 h-4 lg:w-5 lg:h-5 text-white/40 ${
              i > 0 && i < 4 ? "hidden lg:block" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FooterScroll;

