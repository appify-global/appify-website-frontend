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
  const titleRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !titleRef.current) return;

    // Animate title on load
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );

    // Fade out background when Clients section comes into view
    const clientsSection = document.getElementById('clients');
    if (bgRef.current && clientsSection) {
      gsap.to(bgRef.current, {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: clientsSection,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === clientsSection) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative w-full min-h-[70vh] sm:min-h-[80vh] lg:min-h-[877px] overflow-hidden"
    >
      {/* Fixed background image */}
      <div
        ref={bgRef}
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url(/team_bg.png)',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Opacity overlay to reduce background image visibility to 30% */}
      <div className="absolute inset-0 bg-black/70 z-[1]" />

      {/* Masked "ABOUT" and "US" text effect */}
      <div className="absolute inset-0 z-[1]">
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

      {/* Main content */}
      <div className="relative z-[3] h-full flex flex-col justify-between px-[4vw] lg:px-[5vw] pb-[4vh] lg:pb-[80px]">
        {/* Plus icon row */}
        <div className="hidden lg:flex items-center justify-between w-full mt-[280px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <PlusIcon key={i} className="w-5 h-5 text-white/60" />
          ))}
        </div>

        {/* Title container */}
        <div ref={titleRef} className="flex-1 flex items-end lg:items-start lg:mt-[60px]">
          <div className="w-full">
            {/* Mobile title */}
            <div className="lg:hidden">
              <h1 className="font-Aeonik text-[22vw] leading-[1] text-white tracking-[0.04em]">
                ABOUT
              </h1>
              <h1 className="font-Aeonik text-[22vw] leading-[1] text-white tracking-[0.04em]">
                US
              </h1>
            </div>

            {/* Desktop title */}
            <div className="hidden lg:block">
              <h1 className="font-Aeonik text-[clamp(100px,12vw,220px)] leading-[1] text-white tracking-[0.04em]">
                About Us
              </h1>
            </div>

            {/* Year indicator - desktop only */}
            <div className="hidden lg:flex items-start gap-4 absolute right-[5vw] top-[440px]">
              <span className="font-Aeonik text-[5rem] lg:text-[88px] text-white leading-none">
                15
              </span>
              <div className="w-[124px] h-[124px] border border-white/30 rounded-sm flex items-center justify-center">
                <span className="text-white/60 text-xs">YEARS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex items-center justify-center lg:justify-end gap-4 mt-8 lg:mt-0">
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
