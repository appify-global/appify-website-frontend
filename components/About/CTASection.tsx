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
      className="relative w-full min-h-[70vh] lg:min-h-[879px] bg-[#F0F1FA] overflow-hidden py-[80px] lg:py-[133px]"
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
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-[6vw] lg:px-[5vw]">
        {/* Top text with plus icons */}
        <div className="flex items-center gap-4 mb-[20px]">
          <PlusIcon className="w-4 h-4 lg:w-5 lg:h-5 text-black/40" />
          <p className="font-Aeonik text-[12px] lg:text-[15px] text-black/80 text-center uppercase tracking-tight">
            IS YOUR BIG IDEA READY TO GO WILD?
          </p>
          <PlusIcon className="w-4 h-4 lg:w-5 lg:h-5 text-black/40" />
        </div>

        {/* Main CTA title */}
        <h2
          ref={titleRef}
          className="font-Aeonik text-[12vw] lg:text-[72px] xl:text-[90px] leading-[1.1] text-black text-center mb-[40px]"
        >
          Let&apos;s work
          <br />
          together!
        </h2>

        {/* Plus icon row */}
        <div className="flex items-center justify-center gap-[80px] lg:gap-[200px] mb-[30px]">
          <PlusIcon className="w-4 h-4 lg:w-5 lg:h-5 text-black/40" />
          <PlusIcon className="w-4 h-4 lg:w-5 lg:h-5 text-black/40 hidden lg:block" />
          <PlusIcon className="w-4 h-4 lg:w-5 lg:h-5 text-black/40" />
        </div>

        {/* Continue to scroll button */}
        <button className="flex items-center gap-[10px] bg-black rounded-full px-[20px] lg:px-[30px] py-[12px] lg:py-[17px] hover:bg-gray-800 transition-colors">
          <ArrowDownIcon className="w-[20px] h-[20px] text-white rotate-180" />
          <span className="font-Aeonik text-[11px] lg:text-[13px] text-white uppercase tracking-tight">
            CONTINUE TO SCROLL
          </span>
          <ArrowDownIcon className="w-[20px] h-[20px] text-white" />
        </button>
      </div>
    </div>
  );
};

export default CTASection;

