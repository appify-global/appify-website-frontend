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

const AboutHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null); // "About Us"
  const secondStateRef = useRef<HTMLDivElement>(null); // "WE ARE APPIFY..."
  const thirdStateRef = useRef<HTMLDivElement>(null); // "A world wide team..."

  useEffect(() => {
    if (!heroRef.current) return;

    const section = heroRef.current;
    const viewportHeight = window.innerHeight;
    const sectionHeight = viewportHeight * 3; // 3 scroll states
    const stateHeight = viewportHeight; // Each state takes one viewport height

    // Set section height for scroll pinning
    gsap.set(section, { height: sectionHeight });

    // Create ScrollTrigger for the entire hero section
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${sectionHeight}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    });

    // State 1: "About Us" - visible initially, fades out during first third
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        opacity: 0,
        y: -100,
        ease: "power2.in",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${stateHeight}`,
          scrub: 1,
        },
      });
    }

    // State 2: "WE ARE APPIFY..." - fades in during second third, then out
    if (secondStateRef.current) {
      // Fade in during second third
      gsap.fromTo(
        secondStateRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: `+=${stateHeight}`,
            end: `+=${stateHeight}`,
            scrub: 1,
          },
        }
      );

      // Fade out during third third
      gsap.to(secondStateRef.current, {
        opacity: 0,
        y: -100,
        ease: "power2.in",
        scrollTrigger: {
          trigger: section,
          start: `+=${stateHeight * 2}`,
          end: `+=${stateHeight}`,
          scrub: 1,
        },
      });
    }

    // State 3: "A world wide team..." - fades in during third third
    if (thirdStateRef.current) {
      gsap.fromTo(
        thirdStateRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: `+=${stateHeight * 2}`,
            end: `+=${stateHeight}`,
            scrub: 1,
          },
        }
      );
    }

    return () => {
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-screen bg-black overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />

      {/* Masked "ABOUT" and "US" text effect */}
      <div className="absolute inset-0 z-0">
        {/* Large ABOUT text with gradient mask */}
        <div className="absolute left-[-8%] lg:left-[-15%] top-[12%] lg:top-[103px]">
          <h1 className="font-Aeonik text-[28vw] lg:text-[138px] xl:text-[180px] leading-[0.85] tracking-[0.03em] text-transparent bg-clip-text bg-gradient-to-br from-white/10 to-white/5">
            ABOUT
          </h1>
        </div>
        {/* US text positioned right */}
        <div className="absolute right-[5%] lg:right-[52%] top-[30%] lg:top-[484px]">
          <span className="font-Aeonik text-[25vw] lg:text-[183px] leading-[1] tracking-[0.03em] text-transparent bg-clip-text bg-gradient-to-br from-white/20 to-white/5">
            US
          </span>
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center px-[4vw] lg:px-[5vw]">
        
        {/* STATE 1: "About Us" - Initial state */}
        <div 
          ref={titleRef}
          className="absolute inset-0 flex flex-col justify-center items-center"
        >
          <div className="w-full">
            {/* Mobile title */}
            <div className="lg:hidden text-center">
              <h1 className="font-Aeonik text-[18vw] leading-[1] text-white tracking-[0.04em]">
                ABOUT
              </h1>
              <h1 className="font-Aeonik text-[18vw] leading-[1] text-white tracking-[0.04em]">
                US
              </h1>
            </div>

            {/* Desktop title */}
            <div className="hidden lg:block text-center">
              <h1 className="font-Aeonik text-[clamp(80px,10vw,180px)] leading-[1] text-white tracking-[0.04em]">
                About Us
              </h1>
            </div>
          </div>
        </div>

        {/* STATE 2: "WE ARE APPIFY..." - Second state */}
        <div 
          ref={secondStateRef}
          className="absolute inset-0 flex flex-col justify-center items-center opacity-0"
        >
          <div className="w-full max-w-4xl px-[4vw]">
            {/* Left side text */}
            <div className="mb-12 lg:mb-16">
              <h2 className="font-Aeonik text-[12vw] lg:text-[clamp(60px,8vw,120px)] leading-[1.1] text-white tracking-[0.02em]">
                <span className="block">WE ARE</span>
                <span className="block">APPIFY</span>
                <span className="block italic">A CREATIVE</span>
                <span className="block italic">PRODUCTION STUDIO</span>
              </h2>
            </div>

            {/* Right side text */}
            <div className="text-right lg:text-left">
              <p className="font-Aeonik text-[8vw] lg:text-[clamp(40px,5vw,80px)] leading-[1.2] text-white italic">
                NICE TO
                <br />
                MEET YOU
              </p>
            </div>
          </div>
        </div>

        {/* STATE 3: "A world wide team..." - Third state */}
        <div 
          ref={thirdStateRef}
          className="absolute inset-0 flex flex-col justify-center items-center opacity-0 px-[4vw] lg:px-[5vw]"
        >
          <div className="w-full max-w-6xl relative h-full">
            {/* Plus icon row */}
            <div className="hidden lg:flex items-center justify-between w-full absolute top-[15%] left-0 right-0">
              {[0, 1, 2, 3, 4].map((i) => (
                <PlusIcon key={i} className="w-5 h-5 text-white/60" />
              ))}
            </div>

            {/* Left text block */}
            <div className="mb-12 lg:mb-0 lg:absolute lg:top-[25%] lg:left-0 lg:max-w-[947px]">
              <h2 className="font-Aeonik text-[7vw] lg:text-[31px] leading-[1.15] text-white">
                <span className="italic">A world wide team</span>
                <span className="block">of experienced and skilled</span>
                <span className="block">professionals</span>
              </h2>
            </div>

            {/* Plus icon row - middle */}
            <div className="hidden lg:flex items-center justify-between w-full absolute top-1/2 -translate-y-1/2 left-0 right-0">
              {[0, 1, 2, 3, 4].map((i) => (
                <PlusIcon 
                  key={i} 
                  className="w-5 h-5 text-white/60"
                />
              ))}
            </div>

            {/* Right text block */}
            <div className="lg:absolute lg:top-[65%] lg:right-0 lg:text-right lg:max-w-[947px]">
              <p className="font-Aeonik text-[7vw] lg:text-[31px] leading-[1.15] text-white">
                <span>who bring a </span>
                <span className="italic">wide range</span>
                <span className="block">of talents and perspectives</span>
                <span className="block">to a project.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator - only show in first state */}
        <div className="absolute bottom-8 lg:bottom-16 flex items-center justify-center lg:justify-end gap-4 w-full px-[4vw]">
          <PlusIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white/60 hidden lg:block" />
          <span className="font-Aeonik text-[13px] lg:text-[14px] text-white/80 tracking-[0.04em] uppercase">
            SCROLL TO EXPLORE
          </span>
          <PlusIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white/60 hidden lg:block" />
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
