"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// Expertise data
const expertiseData = [
  {
    title: "STRATEGY",
    icon: "S",
    services: [
      "Digital Transformation",
      "Technology Consulting",
      "Business Analysis",
      "Process Optimisation",
      "Architecture Design",
    ],
  },
  {
    title: "CREATIVE",
    icon: "C",
    services: [
      "UX/UI Design",
      "Product Design",
      "User Research",
      "Design Systems",
      "Prototyping",
    ],
  },
  {
    title: "DEVELOPMENT",
    icon: "D",
    services: [
      "Software Development",
      "Web Applications",
      "App Development",
      "ERP Solutions",
      "System Integration",
    ],
  },
  {
    title: "INTELLIGENCE",
    icon: "I",
    services: [
      "AI/ML Engineering",
      "Agentic Solutions",
      "MCP Development",
      "Intelligent Automation",
      "Custom AI Models",
    ],
  },
];

// Icon component for each expertise category
const ExpertiseIcon = ({ letter }: { letter: string }) => {
  const iconStyles: Record<string, string> = {
    S: "bg-gradient-to-br from-blue-500 to-purple-600",
    C: "bg-gradient-to-br from-pink-500 to-red-500",
    D: "bg-gradient-to-br from-green-500 to-teal-500",
    I: "bg-gradient-to-br from-yellow-500 to-orange-500",
  };

  return (
    <div
      className={`w-[35px] h-[45px] lg:w-[40px] lg:h-[45px] rounded-md flex items-center justify-center ${
        iconStyles[letter] || "bg-gray-600"
      }`}
    >
      <span className="font-AeonikBold text-white text-[20px] lg:text-[24px]">
        {letter}
      </span>
    </div>
  );
};

// Expertise card component
const ExpertiseCard = ({
  data,
  index,
}: {
  data: (typeof expertiseData)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="w-full lg:w-[400px] bg-[rgba(197,196,207,0.2)] rounded-[22px] p-[20px] sm:p-[30px] lg:p-[45px]"
    >
      {/* Header with title and icon */}
      <div className="flex items-center justify-between mb-[35px]">
        <h3 className="font-Aeonik text-[28px] lg:text-[36px] text-black tracking-tight">
          {data.title}
        </h3>
        <ExpertiseIcon letter={data.icon} />
      </div>

      {/* Services list */}
      <div className="space-y-0">
        {data.services.map((service, idx) => (
          <React.Fragment key={idx}>
            <p className="font-Aeonik text-[16px] lg:text-[19px] text-black py-[8px]">
              {service}
            </p>
            {idx < data.services.length - 1 && (
              <p className="font-Aeonik text-[16px] sm:text-[20px] lg:text-[30px] text-black/30 tracking-[3.6px] leading-none py-[4px] overflow-hidden">
                ..............................
              </p>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Footer with title and icon (mirrored/rotated) */}
      <div className="flex items-center justify-between mt-[35px] rotate-180">
        <ExpertiseIcon letter={data.icon} />
        <h3 className="font-Aeonik text-[28px] lg:text-[36px] text-black tracking-tight">
          {data.title}
        </h3>
      </div>
    </div>
  );
};

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
      className="relative w-full bg-[#F0F1FA] overflow-hidden py-[40px] sm:py-[60px] lg:py-[120px]"
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
      <div className="relative z-10 px-[4vw] sm:px-[6vw] lg:px-[5vw]">
        {/* Header */}
        <div ref={titleRef} className="mb-[30px] sm:mb-[50px] lg:mb-[100px]">
          {/* Main title */}
          <h2 className="font-Aeonik text-[14vw] lg:text-[75px] xl:text-[90px] leading-[1] text-black tracking-tight mb-[30px]">
            <span className="block">AREA OF</span>
            <span className="block">EXPERTISE</span>
          </h2>

          {/* Subtitle with icons */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-[20px]">
            <p className="font-Aeonik text-[14px] lg:text-[16px] text-black/80 max-w-[400px] leading-[1.4]">
              A TEAM OF EXPERIENCED INVENTORS & DREAMERS WITH A WIDE RANGE OF
              SKILLS AND KNOWLEDGE
            </p>

            {/* Category icons */}
            <div className="flex items-center gap-[13px]">
              {expertiseData.map((item, idx) => (
                <div
                  key={idx}
                  className="w-[35px] h-[49px] lg:w-[35px] lg:h-[55px] flex items-center justify-center"
                >
                  <ExpertiseIcon letter={item.icon} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expertise cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[30px] lg:gap-[42px]">
          {expertiseData.map((item, idx) => (
            <ExpertiseCard key={idx} data={item} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertiseSection;

