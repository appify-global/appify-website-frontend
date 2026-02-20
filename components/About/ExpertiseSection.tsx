"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Expertise data
const expertiseData = [
  {
    title: "STRATEGY",
    icon: "/eight-bit-icons/s.svg",
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
    icon: "/eight-bit-icons/c.svg",
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
    icon: "/eight-bit-icons/d.svg",
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
    icon: "/eight-bit-icons/i.svg",
    services: [
      "AI/ML Engineering",
      "Agentic Solutions",
      "MCP Development",
      "Intelligent Automation",
      "Custom AI Models",
    ],
  },
];

const rotations = [-15, -7.5, 7.5, 15];
// Center the 4 cards, 25% gap between each
const positions = [12, 37, 62, 87];

// Expertise card component
const ExpertiseCard = ({
  data,
  index,
  sectionRef,
}: {
  data: (typeof expertiseData)[0];
  index: number;
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !sectionRef.current) return;

    // Set initial rotation
    gsap.set(cardRef.current, {
      rotation: rotations[index],
      transformOrigin: "center center",
    });

    // Slide-up when section enters view (no opacity so cards never stuck hidden on desktop)
    gsap.fromTo(
      cardRef.current,
      { y: 50 },
      {
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Scroll-triggered rotation animation - straighten cards as user scrolls
    const rotationTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      end: "center center",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentRotation = rotations[index] * (1 - progress);
        if (cardRef.current) {
          gsap.to(cardRef.current, {
            rotation: currentRotation,
            duration: 0.1,
            ease: "none",
            force3D: true,
            transformOrigin: "center center",
          });
        }
      },
    });

    return () => {
      rotationTrigger.kill();
    };
  }, [index, sectionRef]);

  return (
    <div
      ref={cardRef}
      className="
        card absolute
        w-[22%] max-w-[380px]
        h-[clamp(400px,30vw,550px)]
        transform-gpu
      "
      style={{
        left: `${positions[index]}%`,
        top: '40%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className="
        relative w-full h-full
        bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-300
        rounded-3xl overflow-hidden
        flex flex-col items-center justify-between text-black
        px-6 xl:px-8 py-6 xl:py-8
      ">
        {/* Top Section */}
        <div className="w-full flex justify-between items-center">
          <h2 className="text-xl xl:text-3xl font-Aeonik whitespace-nowrap">{data.title}</h2>
          <div className={`flex items-center justify-center ${
            data.title === "DEVELOPMENT" ? "w-6 h-6 xl:w-8 xl:h-8" : 
            data.title === "INTELLIGENCE" ? "w-3 h-4 xl:w-4 xl:h-5" : 
            "w-5 h-5 xl:w-7 xl:h-7"
          }`}>
            <Image src={data.icon} width={28} height={28} alt={data.title} className="w-full h-full" />
          </div>
        </div>

        {/* Services list */}
        <div className="w-full flex flex-col gap-1.5 xl:gap-2.5 text-sm xl:text-lg font-Aeonik">
          {data.services.map((item, idx) => (
            <div key={idx}>
              <p className="whitespace-nowrap py-0.5">{item}</p>
              <div className="border-t-2 border-dotted border-black w-full" />
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="w-full flex justify-between items-center rotate-180">
          <div className={`flex items-center justify-center ${
            data.title === "DEVELOPMENT" ? "w-6 h-6 xl:w-8 xl:h-8" : 
            data.title === "INTELLIGENCE" ? "w-3 h-4 xl:w-4 xl:h-5" : 
            "w-5 h-5 xl:w-7 xl:h-7"
          }`}>
            <Image src={data.icon} width={28} height={28} alt={data.title} className="w-full h-full" />
          </div>
          <h2 className="text-xl xl:text-3xl font-Aeonik whitespace-nowrap">{data.title}</h2>
        </div>
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
      <div className="relative z-10 px-[5vw] sm:px-[6vw] md:px-[5vw] lg:px-[5vw] overflow-x-hidden min-w-0">
        {/* Header */}
        <div ref={titleRef} className="mb-8 sm:mb-10 md:mb-12 lg:mb-[100px]">
          {/* Main title */}
          <h2 className="font-Aeonik text-[clamp(1.75rem,10vw,2.75rem)] sm:text-[clamp(2rem,9vw,3rem)] md:text-[clamp(2.25rem,7vw,3.25rem)] lg:text-[75px] xl:text-[90px] leading-[0.98] text-black tracking-tight mb-6 sm:mb-8">
            <span className="block">AREA OF</span>
            <span className="block">EXPERTISE</span>
          </h2>

          {/* Subtitle with icons */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 sm:gap-6">
            <p className="font-Aeonik text-[clamp(0.8125rem,2.2vw,0.9375rem)] lg:text-[16px] text-black/80 max-w-full md:max-w-[400px] leading-[1.45]">
              A TEAM OF EXPERIENCED INVENTORS & DREAMERS WITH A WIDE RANGE OF
              SKILLS AND KNOWLEDGE
            </p>

            {/* Category icons */}
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

        {/* Expertise cards - overlapping tilted cards like home page */}
        <div className="relative w-full min-w-0 min-h-0 lg:min-h-[700px] h-auto lg:h-[45vw] lg:max-h-[900px] overflow-visible flex items-start lg:items-center justify-center">
          {/* Desktop: overlapping tilted cards */}
          <div className="hidden lg:block relative w-full h-full">
            {expertiseData.map((item, idx) => (
              <ExpertiseCard key={idx} data={item} index={idx} sectionRef={sectionRef} />
            ))}
          </div>
          {/* Mobile & tablet: single col then 2-col */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 w-full max-w-4xl mx-auto min-w-0 overflow-visible">
            {expertiseData.map((item, idx) => (
              <div
                key={idx}
                className="
                  w-full min-w-0 rounded-xl sm:rounded-2xl border overflow-visible
                  bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm
                  bg-opacity-20 border border-gray-300
                  rounded-3xl
                "
              >
                <div className="p-5 sm:p-5 md:p-6 lg:p-8 flex flex-col gap-4 sm:gap-4 md:gap-5 min-w-0">
                  <div className="flex justify-between items-center gap-2 min-w-0 shrink-0">
                    <h2 className="text-[clamp(1.25rem,4vw,1.5rem)] md:text-[1.75rem] font-Aeonik truncate min-w-0">{item.title}</h2>
                    <Image 
                      src={item.icon} 
                      width={28} 
                      height={28} 
                      alt={item.title} 
                      className={`shrink-0 ${
                        item.title === "DEVELOPMENT" ? "w-7 h-7 md:w-8 md:h-8" : 
                        item.title === "INTELLIGENCE" ? "w-4 h-5 md:w-5 md:h-6" : 
                        "w-6 h-6 md:w-7 md:h-7"
                      }`}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 md:gap-2 min-w-0">
                    {item.services.map((skill, skillIdx) => (
                      <div key={skillIdx} className="min-w-0">
                        <p className="text-[clamp(0.875rem,2vw,1rem)] md:text-lg py-0.5 break-words">{skill}</p>
                        <div className="border-t-2 border-dotted border-black w-full" />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center min-w-0 shrink-0 mt-auto max-sm:rotate-0 sm:rotate-180">
                    <h2 className="text-[clamp(1.25rem,4vw,1.5rem)] md:text-[1.75rem] font-Aeonik truncate min-w-0">{item.title}</h2>
                    <Image 
                      src={item.icon} 
                      width={28} 
                      height={28} 
                      alt={item.title} 
                      className={
                        item.title === "DEVELOPMENT" ? "w-7 h-7 md:w-8 md:h-8" : 
                        item.title === "INTELLIGENCE" ? "w-4 h-5 md:w-5 md:h-6" : 
                        "w-6 h-6 md:w-7 md:h-7"
                      } 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseSection;

