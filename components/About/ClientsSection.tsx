"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// Client logos data - matching Figma design
const clientLogos = [
  // Row 1
  [
    { name: "Booked AI" },
    { name: "Carv" },
    { name: "Red Bull" },
    { name: "CSSDA" },
    { name: "Lacoste" },
    { name: "Iberdrola" },
    { name: "Awwwards" },
  ],
  // Row 2
  [
    { name: "My Muscle Chef" },
    { name: "Global Health" },
    { name: "Framer" },
    { name: "Stripe" },
    { name: "Notion" },
    { name: "Vercel" },
  ],
  // Row 3
  [
    { name: "Shopify" },
    { name: "Figma" },
    { name: "Endota" },
    { name: "Webflow" },
    { name: "Slack" },
    { name: "Purple" },
  ],
];

// Placeholder logo component when image isn't available
const PlaceholderLogo = ({ name }: { name: string }) => (
  <div className="w-[136px] h-[115px] flex items-center justify-center bg-white/5 rounded-lg">
    <span className="font-Aeonik text-[12px] text-white/40 text-center px-2">
      {name}
    </span>
  </div>
);

const ClientsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

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
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0
      );
    }

    if (logosRef.current) {
      tl.fromTo(
        logosRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.3
      );
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-[80vh] lg:min-h-[1189px] bg-black overflow-hidden py-[10vh] lg:py-[160px]"
    >
      {/* Main content */}
      <div className="relative z-10 px-[6vw] lg:px-[5vw]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-[60px] lg:mb-[80px]">
          {/* Title */}
          <h2
            ref={titleRef}
            className="font-Aeonik text-[12vw] lg:text-[56px] xl:text-[72px] leading-[1.1] text-white max-w-full lg:max-w-[905px]"
          >
            CLIENTS WE WORK WITH
          </h2>

          {/* Subtitle - positioned right on desktop */}
          <div className="mt-6 lg:mt-0 lg:max-w-[219px] lg:text-right">
            <p className="font-Aeonik text-[14px] lg:text-[14px] leading-[1.3] text-white/80 uppercase">
              WE CAN&apos;T WAIT TO SHOW YOU WHAT WE CAN DO FOR YOU AND YOUR BRAND.
            </p>
          </div>
        </div>

        {/* Client logos grid */}
        <div ref={logosRef} className="space-y-[40px] lg:space-y-[60px]">
          {clientLogos.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap justify-center lg:justify-start gap-[20px] lg:gap-[40px] xl:gap-[80px]"
            >
              {row.map((client, index) => (
                <div
                  key={index}
                  className="w-[100px] lg:w-[136px] h-[80px] lg:h-[115px] flex items-center justify-center group"
                >
                  {/* Using placeholder - replace with actual images when available */}
                  <PlaceholderLogo name={client.name} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsSection;

