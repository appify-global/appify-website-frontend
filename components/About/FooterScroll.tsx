"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { FaArrowRight } from "react-icons/fa";

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
        <div className="flex items-center gap-4">
          <span className="font-Aeonik text-[14px] lg:text-[16px] text-white/80 uppercase">
            NEXT PAGE
          </span>
          <div className="w-[140px] lg:w-[179px] h-[6px] bg-white/20 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[60px] bg-[#FF009E] rounded-full" />
          </div>
          <FaArrowRight className="text-white w-4 h-4 lg:w-5 lg:h-5" />
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

