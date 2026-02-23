"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import FloatingCards from "@/components/Featured/ServiceCard";

gsap.registerPlugin(ScrollTrigger);

// Same data as home page ServiceCard (for header icons only)
const expertiseData = [
  { title: "STRATEGY", icon: "/eight-bit-icons/s.svg" },
  { title: "CREATIVE", icon: "/eight-bit-icons/c.svg" },
  { title: "DEVELOPMENT", icon: "/eight-bit-icons/d.svg" },
  { title: "INTELLIGENCE", icon: "/eight-bit-icons/i.svg" },
];

const ExpertiseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
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
      className="relative w-full bg-[#F0F1FA] overflow-x-hidden pt-[32px] sm:pt-[48px] md:pt-[60px] lg:pt-[120px] pb-16 sm:pb-20 md:pb-[60px] lg:pb-[120px]"
    >
      {/* Background decorative vector */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-5"
          viewBox="0 0 2104 2319"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-111 -50C-111 -50 500 400 1000 600C1500 800 1993 1269 1993 2269"
            stroke="#000"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 overflow-x-hidden min-w-0">
        {/* Header - same as before */}
        <div ref={titleRef} className="mb-8 sm:mb-10 md:mb-12 lg:mb-[100px] px-[5vw] sm:px-[6vw] md:px-[5vw] lg:px-[5vw]">
          <h2 className="font-Aeonik text-[clamp(1.75rem,10vw,2.75rem)] sm:text-[clamp(2rem,9vw,3rem)] md:text-[clamp(2.25rem,7vw,3.25rem)] lg:text-[75px] xl:text-[90px] leading-[0.98] text-black tracking-tight mb-6 sm:mb-8">
            <span className="block">AREA OF</span>
            <span className="block">EXPERTISE</span>
          </h2>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
            <p className="font-Aeonik text-[clamp(0.8125rem,2.2vw,0.9375rem)] lg:text-[16px] text-black/80 max-w-full md:max-w-[400px] leading-[1.45]">
              A TEAM OF EXPERIENCED INVENTORS & DREAMERS WITH A WIDE RANGE OF
              SKILLS AND KNOWLEDGE
            </p>

            <div className="flex items-center gap-[13px]">
              {expertiseData.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-center ${
                    item.title === "DEVELOPMENT" ? "w-[40px] h-[55px] lg:w-[40px] lg:h-[60px]" :
                    item.title === "INTELLIGENCE" ? "w-[20px] h-[40px] lg:w-[24px] lg:h-[45px]" :
                    "w-[35px] h-[49px] lg:w-[35px] lg:h-[55px]"
                  }`}
                >
                  <Image src={item.icon} width={35} height={49} alt={item.title} className="w-full h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Same cards as home page: same wrapper (px-[4vw]) and component */}
        <div className="w-full px-[4vw] overflow-visible" style={{ overflow: "visible" }}>
          <FloatingCards />
        </div>
      </div>
    </div>
  );
};

export default ExpertiseSection;

