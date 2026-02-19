"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";

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

// Get all face images from the faces folder
const getFaceImages = () => {
  const faces: string[] = [];
  // Add all face images - you can adjust this list based on which images you want to use
  for (let i = 1; i <= 35; i++) {
    faces.push(`/faces/Rectangle-${i}.svg`);
  }
  // Add the numbered images
  for (let i = 114; i <= 119; i++) {
    faces.push(`/faces/image ${i}.svg`);
  }
  // Add Rectangle.svg
  faces.push(`/faces/Rectangle.svg`);
  return faces;
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
  const [faceImages] = useState<string[]>(getFaceImages());

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

  // Generate face positions for the decorative pattern
  const facePositions = [
    { top: "15%", left: "5%", size: 66 },
    { top: "25%", left: "12%", size: 78 },
    { top: "35%", left: "3%", size: 90 },
    { top: "20%", left: "20%", size: 66 },
    { top: "45%", left: "8%", size: 82 },
    { top: "40%", left: "18%", size: 70 },
    { top: "55%", left: "2%", size: 75 },
    { top: "50%", left: "15%", size: 88 },
    { top: "60%", left: "10%", size: 66 },
    { top: "65%", left: "22%", size: 92 },
    { top: "70%", left: "5%", size: 80 },
    { top: "75%", left: "18%", size: 66 },
    // Right side
    { top: "15%", left: "78%", size: 82 },
    { top: "25%", left: "85%", size: 75 },
    { top: "35%", left: "75%", size: 93 },
    { top: "20%", left: "92%", size: 66 },
    { top: "45%", left: "82%", size: 85 },
    { top: "40%", left: "90%", size: 72 },
    { top: "55%", left: "78%", size: 90 },
    { top: "50%", left: "88%", size: 66 },
    { top: "60%", left: "95%", size: 78 },
    { top: "65%", left: "80%", size: 66 },
    { top: "70%", left: "92%", size: 85 },
    { top: "75%", left: "85%", size: 66 },
    // Center area (fewer faces)
    { top: "30%", left: "50%", size: 70 },
    { top: "60%", left: "45%", size: 75 },
    { top: "65%", left: "55%", size: 68 },
  ];

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[100vh] bg-gradient-to-b from-[#040506] via-[#02121a] to-black overflow-hidden py-[40px] sm:py-[60px] lg:py-[180px]"
    >
      {/* Face images background */}
      <div
        ref={avatarsRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {facePositions.map((pos, idx) => (
          <div
            key={idx}
            className="absolute rounded-full overflow-hidden"
            style={{
              top: pos.top,
              left: pos.left,
              width: `${pos.size}px`,
              height: `${pos.size}px`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Image
              src={faceImages[idx % faceImages.length]}
              alt={`Team member ${idx + 1}`}
              width={pos.size}
              height={pos.size}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
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

