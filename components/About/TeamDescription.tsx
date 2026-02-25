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

const TeamDescription = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);

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

          if (leftTextRef.current) {
            tl.fromTo(
              leftTextRef.current,
              { x: -80, opacity: 0 },
              { 
                x: 0, 
                opacity: 1, 
                duration: 0.8, 
                ease: "power3.out",
                onComplete: () => {
                  // Clear transforms after animation to keep text fixed
                  if (leftTextRef.current) {
                    gsap.set(leftTextRef.current, { clearProps: "transform" });
                  }
                }
              },
              0
            );
          }

          if (rightTextRef.current) {
            tl.fromTo(
              rightTextRef.current,
              { x: 80, opacity: 0 },
              { 
                x: 0, 
                opacity: 1, 
                duration: 0.8, 
                ease: "power3.out",
                onComplete: () => {
                  // Clear transforms after animation to keep text fixed
                  if (rightTextRef.current) {
                    gsap.set(rightTextRef.current, { clearProps: "transform" });
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
      className="relative w-full min-h-[55vh] sm:min-h-[65vh] md:min-h-[70vh] lg:h-screen overflow-hidden z-10"
    >
      {/* Light background overlay */}
      <div className="absolute inset-0 bg-[var(--color-background,#F0F1FA)] z-0" />
      
      {/* Main content */}
      <div className="relative z-10 h-full px-[5vw] sm:px-[6vw] md:px-[5vw] lg:px-[5vw] py-[8vh] sm:py-[10vh] md:py-[12vh] lg:py-[194px]">
        {/* Left text - above plus icons */}
        <div ref={leftTextRef} className="max-w-full lg:max-w-[947px] mb-6 sm:mb-10 md:mb-14 lg:mb-0 lg:absolute lg:top-[25%]">
          <h2 className="font-Aeonik text-[clamp(1.5rem,6.5vw,2.25rem)] sm:text-[clamp(1.75rem,6vw,2.5rem)] md:text-[clamp(2rem,5.5vw,2.75rem)] lg:text-[42px] leading-[1.12] sm:leading-[1.15] text-black">
            <span className="italic">A world wide team</span>
            <span className="block">of experienced and skilled</span>
            <span className="block">professionals</span>
          </h2>
        </div>

        {/* Plus icon row - show on tablet */}
        <div className="hidden md:flex lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-[5vw] lg:right-[5vw] items-center justify-between w-full my-8 md:my-10 lg:my-0">
          {[0, 1, 2, 3, 4].map((i) => (
            <PlusIcon
              key={i}
              className="w-4 h-4 md:w-5 md:h-5 text-black/60"
            />
          ))}
        </div>

        {/* Right text - below plus icons */}
        <div
          ref={rightTextRef}
          className="mt-[14vh] sm:mt-[18vh] md:mt-[20vh] lg:mt-0 lg:absolute lg:top-[65%] lg:right-[5vw] text-left lg:text-right max-w-full lg:max-w-[947px]"
        >
          <p className="font-Aeonik text-[clamp(1.5rem,6.5vw,2.25rem)] sm:text-[clamp(1.75rem,6vw,2.5rem)] md:text-[clamp(2rem,5.5vw,2.75rem)] lg:text-[42px] leading-[1.12] sm:leading-[1.15] text-black">
            <span>who bring a </span>
            <span className="italic">wide range</span>
            <span className="block">of talents and perspectives</span>
            <span className="block">to a project.</span>
          </p>
        </div>
      </div>

    </div>
  );
};

export default TeamDescription;

