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

// Dot grid component for decorative purposes
const DotGrid = ({ className = "" }: { className?: string }) => (
  <div className={`grid grid-cols-2 gap-1 ${className}`}>
    {[0, 1, 2, 3].map((i) => (
      <div key={i} className="w-1 h-1 bg-white/60 rounded-full" />
    ))}
  </div>
);

// Ruler pattern component
const RulerPattern = ({ className = "", inverted = false }: { className?: string; inverted?: boolean }) => (
  <div className={`flex gap-[7px] items-end ${className}`}>
    {Array.from({ length: 11 }).map((_, i) => (
      <div
        key={i}
        className={`w-[2px] ${
          i === 0 || i === 5 || i === 10 ? "h-4" : "h-2"
        } ${inverted ? "bg-white/40 rotate-180" : "bg-white/40"}`}
      />
    ))}
  </div>
);

// Three-row dot pattern
const ThreeRowDots = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    {[0, 1, 2].map((row) => (
      <div key={row} className="flex gap-[7px]">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="w-[2px] h-[2px] bg-white/40" />
        ))}
      </div>
    ))}
  </div>
);

const TeamMember = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0
      );
    }

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out" },
        0.2
      );
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[50vh] sm:min-h-[60vh] lg:h-screen bg-black overflow-hidden"
    >
      {/* Plus icon row */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[5vw] right-[5vw] hidden lg:flex items-center justify-between z-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <PlusIcon key={i} className="w-5 h-5 text-white/60" />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full px-[4vw] sm:px-[6vw] lg:px-[5vw] py-[6vh] sm:py-[8vh] lg:py-[53px]">
        {/* Section number indicator */}
        <div className="flex items-center gap-7 text-white/60 mb-4 lg:mb-0">
          <span className="font-mono text-[10px] lg:text-xs">[[</span>
          <span className="font-mono text-[10px] lg:text-xs">003</span>
          <span className="font-mono text-[10px] lg:text-xs">]]</span>
        </div>

        {/* Ruler pattern - top right desktop */}
        <div className="hidden lg:block absolute top-[223px] right-[340px]">
          <RulerPattern />
        </div>

        {/* Three row dots - desktop */}
        <div className="hidden lg:block absolute top-[200px] right-[670px]">
          <ThreeRowDots />
        </div>

        {/* Desktop Layout: Left (Portrait) + Right (SVG + Heading + Text) */}
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:h-full lg:pt-[100px]">
          {/* Left Side: Portrait and Info */}
          <div className="flex flex-col items-start">
            {/* Portrait placeholder - will be replaced with actual image */}
            <div
              ref={imageRef}
              className="w-[300px] h-[400px] bg-gray-800 rounded-lg mb-6 flex items-center justify-center"
            >
              <div className="w-[200px] h-[200px] bg-gray-700 rounded-full flex items-center justify-center">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 20C60.4934 20 69 28.5066 69 39C69 49.4934 60.4934 58 50 58C39.5066 58 31 49.4934 31 39C31 28.5066 39.5066 20 50 20Z" fill="white" fillOpacity="0.3"/>
                  <path d="M50 65C35.0883 65 23 77.0883 23 92V100H77V92C77 77.0883 64.9117 65 50 65Z" fill="white" fillOpacity="0.3"/>
                </svg>
              </div>
            </div>

            {/* Founder info below portrait */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DotGrid className="w-[13px]" />
                <span className="font-Aeonik text-[20px] text-white">
                  :: Mennan Yelkenci
                </span>
              </div>
              <p className="font-Aeonik text-[12px] text-white/60 uppercase tracking-wider mb-4">
                Founder and CEO
              </p>
              {/* Progress bar */}
              <div className="w-[263px] h-[3px] bg-white/20 rounded-full overflow-hidden">
                <div className="w-[80%] h-full bg-white/80 rounded-full" />
              </div>
            </div>
          </div>

          {/* Right Side: SVG + Heading + Paragraphs */}
          <div className="flex-1 max-w-[600px] ml-12">
            {/* SVG + Heading */}
            <div className="flex items-center gap-6 mb-8">
              <svg width="130" height="178" viewBox="0 0 130 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M130 0V177.272H87.9795V89.293H42.0205V177.272H0V0H130Z" fill="white"/>
              </svg>
              <h2
                ref={titleRef}
                className="font-Aeonik text-[80px] xl:text-[110px] leading-[1] tracking-[0.15em] text-white whitespace-nowrap"
              >
                OUR FOUNDER
              </h2>
            </div>

            {/* Paragraphs */}
            <div className="max-w-[458px]">
              <p className="font-Aeonik text-[14px] leading-[1.4] text-white/80 mb-4">
                Mennan takes care of day to day business operations, ensures projects run smoothly and finds the best talent to help execute projects.
              </p>
              <p className="font-Aeonik text-[14px] leading-[1.4] text-white/80">
                As a result of our diverse experience, we are able to think creatively
                and find new solutions to problems, providing clients with memorable,
                purpose-driven experiences that cut through the noise and connect
                where it matters, which leaves lasting impressions that form enduring
                connections between brands and consumers.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          {/* OUR FOUNDER title */}
          <div className="flex items-center gap-4 mt-[10vh] sm:mt-[15vh]">
            <svg width="80" height="110" viewBox="0 0 130 178" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M130 0V177.272H87.9795V89.293H42.0205V177.272H0V0H130Z" fill="white"/>
            </svg>
            <h2
              ref={titleRef}
              className="font-Aeonik text-[14vw] sm:text-[16vw] leading-[1] tracking-[0.05em] sm:tracking-[0.1em] text-white whitespace-nowrap"
            >
              OUR FOUNDER
            </h2>
          </div>

          {/* Founder description text */}
          <div className="mt-8 sm:mt-12 max-w-full">
            <p className="font-Aeonik text-[14px] leading-[1.4] text-white/80 mb-4">
              Mennan takes care of day to day business operations, ensures projects run smoothly and finds the best talent to help execute projects.
            </p>
            <p className="font-Aeonik text-[14px] leading-[1.4] text-white/80">
              As a result of our diverse experience, we are able to think creatively
              and find new solutions to problems, providing clients with memorable,
              purpose-driven experiences that cut through the noise and connect
              where it matters, which leaves lasting impressions that form enduring
              connections between brands and consumers.
            </p>
          </div>

          {/* Founder card */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-2">
              <DotGrid className="w-[13px]" />
              <span className="font-Aeonik text-[16px] text-white">
                :: Mennan Yelkenci
              </span>
            </div>
            <p className="font-Aeonik text-[10px] sm:text-[12px] text-white/60 uppercase tracking-wider mb-4">
              Founder and CEO
            </p>
            <div className="w-[180px] sm:w-[263px] h-[3px] bg-white/20 rounded-full overflow-hidden">
              <div className="w-[80%] h-full bg-white/80 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;

