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
      {/* Background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
      >
        <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black">
          {/* Placeholder for team image - you can add actual image here */}
          <div className="absolute inset-0 bg-[url('/about/team-bg.jpg')] bg-cover bg-center opacity-60" />
        </div>
      </div>

      {/* Plus icon row */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[5vw] right-[5vw] hidden lg:flex items-center justify-between">
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

        {/* OUR FOUNDER title */}
        <h2
          ref={titleRef}
          className="font-Aeonik text-[16vw] sm:text-[18vw] lg:text-[94px] xl:text-[135px] leading-[1] tracking-[0.2em] sm:tracking-[0.4em] text-white mt-[10vh] sm:mt-[15vh] lg:mt-[118px] lg:ml-auto lg:text-right lg:mr-[5vw]"
        >
          OUR FOUNDER
        </h2>

        {/* Founder description text - mobile/tablet */}
        <div className="lg:hidden mt-8 sm:mt-12 max-w-full">
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

        {/* Founder description text - desktop */}
        <div className="hidden lg:block absolute top-[620px] right-[5vw] max-w-[458px]">
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

        {/* Founder card - bottom left */}
        <div className="absolute bottom-[40px] sm:bottom-[60px] lg:bottom-[75px] left-[4vw] sm:left-[6vw] lg:left-[5vw]">
          {/* Founder info */}
          <div className="flex items-center gap-2 mb-2">
            <DotGrid className="w-[13px]" />
            <span className="font-Aeonik text-[16px] lg:text-[20px] text-white">
              :: Mennan Yelkenci
            </span>
          </div>
          <p className="font-Aeonik text-[10px] lg:text-[12px] text-white/60 uppercase tracking-wider mb-4">
            Founder and CEO
          </p>

          {/* Progress bar */}
          <div className="w-[180px] lg:w-[263px] h-[3px] bg-white/20 rounded-full overflow-hidden">
            <div className="w-[80%] h-full bg-white/80 rounded-full" />
          </div>
        </div>

        {/* Ruler pattern - bottom desktop */}
        <div className="hidden lg:block absolute bottom-[223px] left-[540px]">
          <RulerPattern inverted />
        </div>

        {/* Decorative silhouette icon - bottom right */}
        <div className="hidden lg:block absolute bottom-[100px] right-[5vw]">
          <svg
            width="130"
            height="177"
            viewBox="0 0 130 177"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white/20"
          >
            <path
              d="M65 0C100.899 0 130 29.1015 130 65C130 100.899 100.899 130 65 130C29.1015 130 0 100.899 0 65C0 29.1015 29.1015 0 65 0ZM65 140C100.899 140 130 147.163 130 156V177H0V156C0 147.163 29.1015 140 65 140Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;

