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

const AboutIntro = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    gsap.fromTo(
      textRef.current.children,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
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
      className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:h-screen overflow-hidden"
    >
      {/* Background masked "ABOUT" text effect - positioned behind */}
      <div className="absolute left-[-20%] lg:left-[-312px] top-[-10%] lg:top-[-78px] opacity-10 pointer-events-none">
        <span className="font-Aeonik text-[40vw] lg:text-[515px] leading-[1] tracking-[0.03em] text-white/20">
          ABOUT
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full px-[4vw] sm:px-[6vw] lg:px-[5vw] py-[10vh] sm:py-[12vh] lg:py-[131px]">
        {/* Plus icon row */}
        <div className="flex items-center justify-between w-full mb-[40px] lg:mb-0 lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-[5vw] lg:right-[5vw] lg:w-auto lg:px-0">
          {[0, 1, 2, 3, 4].map((i) => (
            <PlusIcon
              key={i}
              className={`w-3.5 h-3.5 lg:w-5 lg:h-5 text-white/60 ${
                i > 0 && i < 4 ? "hidden lg:block" : ""
              }`}
            />
          ))}
        </div>

        {/* Text content */}
        <div ref={textRef} className="flex flex-col">
          {/* Main headline */}
          <div className="max-w-[90%] lg:max-w-[755px]">
            <h2 className="font-Aeonik text-[8vw] lg:text-[32px] leading-[1.2] lg:leading-[1.3] text-white">
              <span className="block">WE ARE</span>
              <span className="block">APPIFY</span>
              <span className="block">A CREATIVE</span>
              <span className="block font-normal italic">PRODUCTION STUDIO</span>
            </h2>
          </div>

          {/* "Nice to meet you" - positioned bottom right */}
          <div className="mt-auto lg:absolute lg:right-[5vw] lg:bottom-[100px] text-right">
            <p className="font-Aeonik text-[7vw] lg:text-[31px] italic text-white leading-[1.2] mt-[30vh] lg:mt-0">
              <span className="block">NICE TO</span>
              <span className="block">MEET YOU</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutIntro;

