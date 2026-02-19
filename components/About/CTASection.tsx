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

// Floating avatar component
const FloatingAvatar = ({
  size = 66,
  top,
  left,
  delay = 0,
  color = "#ccc",
}: {
  size?: number;
  top: string;
  left: string;
  delay?: number;
  color?: string;
}) => {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!avatarRef.current) return;

    gsap.to(avatarRef.current, {
      y: "random(-10, 10)",
      x: "random(-5, 5)",
      rotation: "random(-5, 5)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay,
    });
  }, [delay]);

  return (
    <div
      ref={avatarRef}
      className="absolute rounded-full overflow-hidden"
      style={{
        width: size,
        height: size,
        top,
        left,
        backgroundColor: color,
      }}
    >
      {/* Gradient overlay for visual effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
    </div>
  );
};

// Arrow icon for scroll button
const ArrowDownIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="24"
    height="21"
    viewBox="0 0 24 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 1V20M12 20L22 10M12 20L2 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const avatarsRef = useRef<HTMLDivElement>(null);

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
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0
      );
    }
  }, []);

  // Generate avatar positions for the decorative pattern
  const avatarPositions = [
    { top: "15%", left: "5%", size: 66, delay: 0, color: "#e8d4c4" },
    { top: "25%", left: "12%", size: 78, delay: 0.2, color: "#d4b8a8" },
    { top: "35%", left: "3%", size: 90, delay: 0.4, color: "#c8a090" },
    { top: "20%", left: "20%", size: 66, delay: 0.6, color: "#f0e0d0" },
    { top: "45%", left: "8%", size: 82, delay: 0.8, color: "#e0c8b8" },
    { top: "40%", left: "18%", size: 70, delay: 1, color: "#d8c0b0" },
    { top: "55%", left: "2%", size: 75, delay: 1.2, color: "#e8d8c8" },
    { top: "50%", left: "15%", size: 88, delay: 1.4, color: "#d0b8a8" },
    { top: "60%", left: "10%", size: 66, delay: 1.6, color: "#f0e8e0" },
    { top: "65%", left: "22%", size: 92, delay: 1.8, color: "#e0d0c0" },
    { top: "70%", left: "5%", size: 80, delay: 2, color: "#d8c8b8" },
    { top: "75%", left: "18%", size: 66, delay: 2.2, color: "#e8e0d8" },
    // Right side
    { top: "15%", left: "78%", size: 82, delay: 0.1, color: "#e0d0c0" },
    { top: "25%", left: "85%", size: 75, delay: 0.3, color: "#d8c0b0" },
    { top: "35%", left: "75%", size: 93, delay: 0.5, color: "#e8d8c8" },
    { top: "20%", left: "92%", size: 66, delay: 0.7, color: "#d0b8a0" },
    { top: "45%", left: "82%", size: 85, delay: 0.9, color: "#f0e0d0" },
    { top: "40%", left: "90%", size: 72, delay: 1.1, color: "#e0c8b8" },
    { top: "55%", left: "78%", size: 90, delay: 1.3, color: "#d8c8b8" },
    { top: "50%", left: "88%", size: 66, delay: 1.5, color: "#e8d0c0" },
    { top: "60%", left: "95%", size: 78, delay: 1.7, color: "#d0c0b0" },
    { top: "65%", left: "80%", size: 66, delay: 1.9, color: "#f0e8e0" },
    { top: "70%", left: "92%", size: 85, delay: 2.1, color: "#e0d8d0" },
    { top: "75%", left: "85%", size: 66, delay: 2.3, color: "#d8d0c8" },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[50vh] sm:min-h-[60vh] lg:min-h-[879px] bg-gradient-to-b from-[#040506] via-[#02121a] to-black overflow-hidden py-[40px] sm:py-[60px] lg:py-[133px]"
    >
      {/* Floating avatars background */}
      <div
        ref={avatarsRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {avatarPositions.map((pos, idx) => (
          <FloatingAvatar
            key={idx}
            top={pos.top}
            left={pos.left}
            size={pos.size}
            delay={pos.delay}
            color={pos.color}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-start pt-[18vh] sm:justify-center sm:pt-0 text-center px-4 py-3 md:py-8 lg:pb-17 lg:pt-0">
        <div className="relative inline-block px-8 sm:px-20 lg:px-20 py-4 sm:py-8 lg:py-12">
          {/* Plus icons positioned absolutely */}
          <span className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 select-none">
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </span>
          <span className="absolute -top-4 -right-4 sm:-top-8 sm:-right-8 select-none">
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </span>
          
          {/* Top text */}
          <p
            className="absolute -top-4 sm:-top-8 left-1/2 -translate-x-1/2 text-white font-Aeonik uppercase
                text-[clamp(0.55rem,2.5vw,1.25rem)] tracking-wide whitespace-nowrap
                flex items-center justify-center gap-4"
          >
            IS YOUR BIG IDEA READY TO GO WILD?
          </p>

          {/* Main CTA title */}
          <h2
            ref={titleRef}
            className="relative inline-block text-white font-Aeonik leading-none
                text-[clamp(2rem,8vw,10rem)] sm:text-[clamp(3rem,12vw,10rem)]"
          >
            <div>Let&apos;s work</div>
            <div>together!</div>
          </h2>
        </div>

        {/* Plus icons row */}
        <div className="hidden sm:flex items-center justify-between w-full max-w-[900px] mt-6 lg:mt-12 px-4">
          <span className="select-none">
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </span>
          <span className="select-none">
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </span>
          <span className="select-none">
            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </span>
        </div>

        {/* Continue to scroll button */}
        <div className="mt-4 sm:mt-4 lg:mt-8">
          <a
            href="#footer-scroll"
            className="inline-flex items-center gap-2 sm:gap-3 bg-white text-black rounded-full px-4 py-2 sm:px-6 sm:py-3 font-Aeonik text-xs sm:text-sm tracking-widest uppercase hover:bg-transparent hover:text-white border border-white transition-colors duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1V13M7 13L1 7M7 13L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            CONTINUE TO SCROLL
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1V13M7 13L1 7M7 13L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTASection;

