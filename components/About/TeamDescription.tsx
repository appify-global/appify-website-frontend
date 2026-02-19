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
      className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:h-screen bg-black overflow-hidden"
    >
      {/* Main content */}
      <div className="relative z-10 h-full px-[4vw] sm:px-[6vw] lg:px-[5vw] py-[8vh] sm:py-[10vh] lg:py-[194px]">
        {/* Left text - above plus icons */}
        <div ref={leftTextRef} className="max-w-full lg:max-w-[947px] mb-[30px] sm:mb-[60px] lg:mb-0 lg:absolute lg:top-[25%]">
          <h2 className="font-Aeonik text-[7vw] lg:text-[31px] leading-[1.15] text-white">
            <span className="italic">A world wide team</span>
            <span className="block">of experienced and skilled</span>
            <span className="block">professionals</span>
          </h2>
        </div>

        {/* Plus icon row - centered vertically, spread across (same as AboutHero) */}
        <div className="hidden lg:flex items-center justify-between w-full lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-[5vw] lg:right-[5vw]">
          {[0, 1, 2, 3, 4].map((i) => (
            <PlusIcon
              key={i}
              className="w-5 h-5 text-white/60"
            />
          ))}
        </div>

        {/* Right text - below plus icons */}
        <div
          ref={rightTextRef}
          className="mt-[15vh] sm:mt-[20vh] lg:mt-0 lg:absolute lg:top-[65%] lg:right-[5vw] text-left lg:text-right max-w-full lg:max-w-[947px]"
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
  );
};

export default TeamDescription;

