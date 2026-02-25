"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
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
      <div key={i} className="w-1 h-1 bg-black/60 rounded-full" />
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
        } ${inverted ? "bg-black/40 rotate-180" : "bg-black/40"}`}
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
          <div key={i} className="w-[2px] h-[2px] bg-black/40" />
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

    let hasAnimated = false;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        if (!hasAnimated) {
          hasAnimated = true;
          const tl = gsap.timeline();

          if (titleRef.current) {
            tl.fromTo(
              titleRef.current,
              { y: 60, opacity: 0 },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                ease: "power3.out",
                onComplete: () => {
                  // Clear transforms after animation to keep text fixed
                  if (titleRef.current) {
                    gsap.set(titleRef.current, { clearProps: "transform" });
                  }
                }
              },
              0
            );
          }

          if (imageRef.current) {
            tl.fromTo(
              imageRef.current,
              { scale: 1.1, opacity: 0 },
              { 
                scale: 1, 
                opacity: 1, 
                duration: 1, 
                ease: "power3.out",
                onComplete: () => {
                  // Clear transforms after animation to keep image fixed
                  if (imageRef.current) {
                    gsap.set(imageRef.current, { clearProps: "transform" });
                  }
                }
              },
              0.2
            );
          }
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] lg:h-[120vh] overflow-hidden"
    >
      {/* Light background overlay */}
      <div className="absolute inset-0 bg-[var(--color-background,#F0F1FA)] z-0" />
      
      {/* Plus icon row */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[5vw] right-[5vw] hidden lg:flex items-center justify-between z-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <PlusIcon key={i} className="w-5 h-5 text-black/60" />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full px-[4vw] sm:px-[5vw] md:px-[6vw] lg:px-[5vw] py-[5vh] sm:py-[6vh] md:py-[8vh] lg:py-[53px]">
        {/* Section number indicator */}
        <div className="flex items-center gap-7 text-black/60 mb-4 lg:mb-0">
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

        {/* Desktop Layout: Vertical flex with heading and content */}
        <div className="hidden lg:block absolute inset-0 flex flex-col px-[5vw] pt-[100px] pb-[53px]">
          {/* Heading - top */}
          <div className="flex justify-end z-20 mb-4">
            <h2
              ref={titleRef}
              className="font-Aeonik text-[60px] lg:text-[70px] xl:text-[85px] leading-[1] tracking-[0.15em] text-black whitespace-nowrap inline-block"
            >
              OUR FOUNDER
            </h2>
          </div>

          {/* Content - bottom, horizontal flex with name, image, SVG, paragraph */}
          <div className="mt-auto flex items-end justify-between w-full relative z-10">
            {/* Founder info - name */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-Aeonik text-[16px] text-black">
                  :: Mennan Yelkenci
                </span>
              </div>
              <p className="font-Aeonik text-[10px] text-black/60 uppercase tracking-wider mb-3">
                Founder and CEO
              </p>
              {/* Progress bar */}
              <div className="w-[220px] h-[2px] bg-black/20 rounded-full overflow-hidden">
                <div className="w-[80%] h-full bg-[#ff009e] rounded-full" />
              </div>
            </div>

            {/* Founder image */}
            <div
              ref={imageRef}
              className="w-[400px] h-[520px] relative flex-shrink-0"
            >
              <Image
                src="/team/team-leader-inverted.svg"
                alt="Mennan Yelkenci"
                fill
                className="object-contain"
                style={{ top: '2rem', maxWidth: '150%', left: '-50%' }}
              />
            </div>

            {/* SVG and Paragraphs - Horizontal Flex */}
            <div className="flex items-end gap-8">
              {/* SVG */}
              <div className="flex-shrink-0 flex items-end">
                <svg width="65" height="89" viewBox="0 0 130 178" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[65px] h-[89px]">
                  <path d="M130 0V177.272H87.9795V89.293H42.0205V177.272H0V0H130Z" fill="black"/>
                </svg>
              </div>

              {/* Paragraphs */}
              <div className="flex-1 max-w-[458px]">
                <p className="font-Aeonik text-[16px] leading-[1.4] text-black/80 mb-4">
                  Mennan takes care of day to day business operations, ensures projects run smoothly and finds the best talent to help execute projects.
                </p>
                <p className="font-Aeonik text-[16px] leading-[1.4] text-black/80">
                  As a result of our diverse experience, we are able to think creatively
                  and find new solutions to problems, providing clients with memorable,
                  purpose-driven experiences that cut through the noise and connect
                  where it matters, which leaves lasting impressions that form enduring
                  connections between brands and consumers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          {/* OUR FOUNDER title */}
          <div className="text-right mb-6 sm:mb-8">
            <h2
              ref={titleRef}
              className="font-Aeonik text-[clamp(1.75rem,9vw,2.5rem)] sm:text-[clamp(2rem,10vw,3rem)] md:text-[clamp(2.5rem,8vw,3.25rem)] leading-[0.98] tracking-[0.06em] sm:tracking-[0.1em] text-black inline-block"
            >
              OUR FOUNDER
            </h2>
          </div>

          {/* Founder image */}
          <div
            ref={imageRef}
            className="w-full max-w-[90vw] sm:max-w-[320px] md:max-w-[360px] h-[360px] sm:h-[420px] md:h-[480px] mx-auto mt-4 sm:mt-8 md:mt-10 mb-6 sm:mb-8 md:mb-10 relative"
          >
            <Image
              src="/team/team-leader-inverted.svg"
              alt="Mennan Yelkenci"
              fill
              className="object-contain"
            />
          </div>

          {/* SVG + Name section - Horizontal flex */}
          <div className="flex items-start gap-4 sm:gap-5 md:gap-6 mt-2 mb-8 sm:mb-10">
            {/* SVG */}
            <svg width="80" height="110" viewBox="0 0 130 178" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-12 h-[5.5rem] sm:w-16 sm:h-[6.5rem] md:w-20 md:h-28">
              <path d="M130 0V177.272H87.9795V89.293H42.0205V177.272H0V0H130Z" fill="black"/>
            </svg>
            {/* Founder card - Name section */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-Aeonik text-[clamp(0.875rem,2.5vw,1rem)] text-black">
                  :: Mennan Yelkenci
                </span>
              </div>
              <p className="font-Aeonik text-[10px] sm:text-[11px] md:text-xs text-black/60 uppercase tracking-wider mb-3 sm:mb-4">
                Founder and CEO
              </p>
              <div className="w-[160px] sm:w-[220px] md:w-[263px] h-[3px] bg-black/20 rounded-full overflow-hidden">
                <div className="w-[80%] h-full bg-[#ff009e] rounded-full" />
              </div>
            </div>
          </div>

          {/* Paragraphs */}
          <div className="flex-1 min-w-0">
            <p className="font-Aeonik text-[13px] sm:text-sm leading-[1.45] text-black/80 mb-4">
              Mennan takes care of day to day business operations, ensures projects run smoothly and finds the best talent to help execute projects.
            </p>
            <p className="font-Aeonik text-[13px] sm:text-sm leading-[1.45] text-black/80">
              As a result of our diverse experience, we are able to think creatively
              and find new solutions to problems, providing clients with memorable,
              purpose-driven experiences that cut through the noise and connect
              where it matters, which leaves lasting impressions that form enduring
              connections between brands and consumers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;

