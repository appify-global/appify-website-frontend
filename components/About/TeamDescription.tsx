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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    if (leftTextRef.current) {
      tl.fromTo(
        leftTextRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0
      );
    }

    if (rightTextRef.current) {
      tl.fromTo(
        rightTextRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.2
      );
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[877px] bg-black overflow-hidden"
    >
      {/* Main content */}
      <div className="relative z-10 h-full px-[4vw] sm:px-[6vw] lg:px-[5vw] py-[8vh] sm:py-[10vh] lg:py-[194px]">
        {/* Plus icon row */}
        <div className="flex items-center justify-between w-full mb-[30px] sm:mb-[60px] lg:mb-0 lg:absolute lg:top-[418px] lg:left-[5vw] lg:right-[5vw] lg:w-auto lg:pr-[10vw]">
          {[0, 1, 2, 3, 4].map((i) => (
            <PlusIcon
              key={i}
              className={`w-3.5 h-3.5 lg:w-5 lg:h-5 text-white/60 ${
                i > 0 && i < 4 ? "hidden lg:block" : ""
              }`}
            />
          ))}
        </div>

        {/* Text content - two columns */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
          {/* Left text */}
          <div ref={leftTextRef} className="max-w-full lg:max-w-[947px]">
            <h2 className="font-Aeonik text-[7vw] lg:text-[31px] leading-[1.15] text-white">
              <span className="italic">A world wide team</span>
              <span className="block">of experienced and skilled</span>
              <span className="block">professionals</span>
            </h2>
          </div>

          {/* Right text - positioned bottom right on desktop */}
          <div
            ref={rightTextRef}
            className="mt-[15vh] sm:mt-[20vh] lg:mt-0 lg:absolute lg:right-[5vw] lg:bottom-[270px] text-left lg:text-right max-w-full lg:max-w-[947px]"
          >
            <p className="font-Aeonik text-[7vw] lg:text-[31px] leading-[1.15] text-white">
              <span>who bring a </span>
              <span className="italic">wide range</span>
              <span className="block">of talents and perspectives</span>
              <span className="block">to a project.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Vertical scroll indicator bar - desktop only */}
      <div className="hidden lg:block absolute right-[56px] top-[376px] w-[9px] h-[176px]">
        <div className="w-full h-full bg-white/10 rounded-full">
          <div className="w-full h-[50%] bg-white/60 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default TeamDescription;

