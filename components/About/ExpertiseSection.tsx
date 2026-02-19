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
const positions = [14, 38, 62, 86];

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
      className="
        card absolute
        w-[22%] max-w-[380px]
        h-[clamp(400px,30vw,550px)]
        transform-gpu
      "
      style={{
        left: `${positions[index]}%`,
        top: '40%',
        transform: `translate(-50%, -50%) rotate(${rotations[index]}deg)`,
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
          <div className="w-5 h-5 xl:w-7 xl:h-7 flex items-center justify-center">
            <Image src={data.icon} width={28} height={28} alt={data.title} className="w-full" />
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
          <div className="w-5 h-5 xl:w-7 xl:h-7 flex items-center justify-center">
            <Image src={data.icon} width={28} height={28} alt={data.title} className="w-full" />
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
                  <Image src={item.icon} width={35} height={49} alt={item.title} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expertise cards - overlapping tilted cards like home page */}
        <div className="relative w-full min-h-[700px] h-[45vw] max-h-[900px] overflow-hidden lg:overflow-visible flex items-center justify-center">
          {/* Desktop: overlapping tilted cards */}
          <div className="hidden lg:block relative w-full h-full">
            {expertiseData.map((item, idx) => (
              <ExpertiseCard key={idx} data={item} index={idx} />
            ))}
          </div>
          {/* Mobile: grid layout */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
            {expertiseData.map((item, idx) => (
              <div
                key={idx}
                className="
                  w-full rounded-2xl overflow-hidden border
                  bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm
                  bg-opacity-20 border border-gray-300
                  rounded-3xl overflow-hidden
                "
              >
                <div className="p-6 md:p-8 flex flex-col justify-between gap-5 md:gap-6 md:min-h-[350px]">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl md:text-3xl font-Aeonik">{item.title}</h2>
                    <Image src={item.icon} width={28} height={28} alt={item.title} className="w-6 h-6 md:w-7 md:h-7" />
                  </div>

                  <div className="flex flex-col gap-1.5 md:gap-2">
                    {item.services.map((skill, skillIdx) => (
                      <div key={skillIdx}>
                        <p className="text-lg md:text-xl py-0.5">{skill}</p>
                        <div className="border-t-2 border-dotted border-black w-full" />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center rotate-180">
                    <h2 className="text-2xl md:text-3xl font-Aeonik">{item.title}</h2>
                    <Image src={item.icon} width={28} height={28} alt={item.title} className="w-6 h-6 md:w-7 md:h-7" />
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

