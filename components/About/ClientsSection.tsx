"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Logo file mapping
const logoMap: Record<string, string> = {
  "Booked AI": "/logos/Bookedai.svg",
  "Red Bull": "/logos/red-bull.svg",
  "CSSDA": "/logos/css.svg",
  "Iberdrola": "/logos/iberdrola.svg",
  "My Muscle Chef": "/logos/my-muscle-shef.svg",
  "Global Health": "/logos/global-health.svg",
  "Endota": "/logos/endota.svg",
  "Guardian": "/logos/guardian.svg",
  "Hub Australia": "/logos/hub australia.svg",
  "Lifecard": "/logos/lifecard.svg",
  "LW": "/logos/LW.svg",
  "Coca-Cola": "/logos/Cocacola.svg",
  "MaxMara": "/logos/maxmara.svg",
  "Ecommerce Equation": "/logos/ecommerce-equation.svg",
  "Mirvac": "/logos/mirvac.svg",
  "Prelo": "/logos/prelo.svg",
  "Scalerr": "/logos/scalerr.svg",
  "VICINITY": "/logos/vicinity.svg",
};

// Client logos data - using available logos, ensuring enough logos to fill space
const clientLogos = [
  // Row 1 - scrolls left
  [
    { name: "Booked AI", logo: logoMap["Booked AI"] },
    { name: "Guardian", logo: logoMap["Guardian"] },
    { name: "Red Bull", logo: logoMap["Red Bull"] },
    { name: "CSSDA", logo: logoMap["CSSDA"] },
    { name: "VICINITY", logo: logoMap["VICINITY"] },
    { name: "Iberdrola", logo: logoMap["Iberdrola"] },
    { name: "Scalerr", logo: logoMap["Scalerr"] },
    { name: "My Muscle Chef", logo: logoMap["My Muscle Chef"] },
    { name: "Global Health", logo: logoMap["Global Health"] },
    { name: "Endota", logo: logoMap["Endota"] },
  ],
  // Row 2 - scrolls right (needs more logos on left side)
  [
    { name: "Booked AI", logo: logoMap["Booked AI"] },
    { name: "Guardian", logo: logoMap["Guardian"] },
    { name: "Red Bull", logo: logoMap["Red Bull"] },
    { name: "CSSDA", logo: logoMap["CSSDA"] },
    { name: "VICINITY", logo: logoMap["VICINITY"] },
    { name: "Iberdrola", logo: logoMap["Iberdrola"] },
    { name: "Scalerr", logo: logoMap["Scalerr"] },
    { name: "My Muscle Chef", logo: logoMap["My Muscle Chef"] },
    { name: "Global Health", logo: logoMap["Global Health"] },
    { name: "Hub Australia", logo: logoMap["Hub Australia"] },
    { name: "Lifecard", logo: logoMap["Lifecard"] },
    { name: "LW", logo: logoMap["LW"] },
    { name: "Coca-Cola", logo: logoMap["Coca-Cola"] },
    { name: "MaxMara", logo: logoMap["MaxMara"] },
    { name: "Ecommerce Equation", logo: logoMap["Ecommerce Equation"] },
    { name: "Endota", logo: logoMap["Endota"] },
    { name: "Mirvac", logo: logoMap["Mirvac"] },
    { name: "Prelo", logo: logoMap["Prelo"] },
  ],
  // Row 3 - scrolls left
  [
    { name: "Ecommerce Equation", logo: logoMap["Ecommerce Equation"] },
    { name: "Endota", logo: logoMap["Endota"] },
    { name: "Mirvac", logo: logoMap["Mirvac"] },
    { name: "Prelo", logo: logoMap["Prelo"] },
    { name: "Booked AI", logo: logoMap["Booked AI"] },
    { name: "Guardian", logo: logoMap["Guardian"] },
    { name: "Red Bull", logo: logoMap["Red Bull"] },
    { name: "CSSDA", logo: logoMap["CSSDA"] },
    { name: "VICINITY", logo: logoMap["VICINITY"] },
    { name: "Iberdrola", logo: logoMap["Iberdrola"] },
  ],
];

// Logo component
const LogoItem = ({ name, logo }: { name: string; logo?: string }) => {
  if (logo) {
    return (
      <div className="w-full h-full flex items-center justify-center p-2 sm:p-3 lg:p-4">
        <Image
          src={logo}
          alt={name}
          width={136}
          height={115}
          className="w-full h-full object-contain brightness-0 opacity-80"
        />
      </div>
    );
  }
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="font-Aeonik text-[11px] sm:text-[12px] text-black/40 text-center px-2">
        {name}
      </span>
    </div>
  );
};

const ClientsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const row3Ref = useRef<HTMLDivElement>(null);

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

    // Infinite scroll animations - all rows same speed, slowed down
    const scrollDuration = 45; // Same duration for all rows, slowed down

    if (row1Ref.current) {
      // Row 1: scroll left
      const row1Content = row1Ref.current.querySelector(".logo-row-content") as HTMLElement;
      if (row1Content) {
        const width = row1Content.scrollWidth / 3; // Third because we tripled
        gsap.to(row1Content, {
          x: -width,
          duration: scrollDuration,
          ease: "none",
          repeat: -1,
        });
      }
    }

    if (row2Ref.current) {
      // Row 2: scroll right - start from right side
      const row2Content = row2Ref.current.querySelector(".logo-row-content") as HTMLElement;
      if (row2Content) {
        const width = row2Content.scrollWidth / 3; // Third because we tripled
        // Start from right (negative position) and scroll right to 0
        gsap.set(row2Content, { x: -width });
        gsap.to(row2Content, {
          x: 0,
          duration: scrollDuration,
          ease: "none",
          repeat: -1,
        });
      }
    }

    if (row3Ref.current) {
      // Row 3: scroll left
      const row3Content = row3Ref.current.querySelector(".logo-row-content") as HTMLElement;
      if (row3Content) {
        const width = row3Content.scrollWidth / 3; // Third because we tripled
        gsap.to(row3Content, {
          x: -width,
          duration: scrollDuration,
          ease: "none",
          repeat: -1,
        });
      }
    }
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-[var(--color-background,#F0F1FA)] overflow-hidden pt-[6vh] sm:pt-[8vh] md:pt-[10vh] lg:pt-[160px] pb-[4vh] sm:pb-[5vh] lg:pb-[40px]"
    >
      {/* Main content */}
      <div className="relative z-10 px-[5vw] sm:px-[6vw] md:px-[5vw] lg:px-[5vw]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8 sm:mb-10 md:mb-12 lg:mb-[80px] gap-4 sm:gap-6">
          {/* Title */}
          <h2
            ref={titleRef}
            className="font-Aeonik text-[clamp(1.75rem,9vw,2.5rem)] sm:text-[clamp(2rem,8.5vw,2.75rem)] md:text-[clamp(2.25rem,6.5vw,3rem)] lg:text-[56px] xl:text-[72px] leading-[1.08] sm:leading-[1.1] text-black max-w-full lg:max-w-[905px]"
          >
            CLIENTS WE WORK WITH
          </h2>

          {/* Subtitle - positioned right on desktop */}
          <div className="lg:max-w-[219px] lg:text-right">
            <p className="font-Aeonik text-[clamp(0.6875rem,2vw,0.875rem)] leading-[1.35] text-black/80 uppercase">
              WE CAN&apos;T WAIT TO SHOW YOU WHAT WE CAN DO FOR YOU AND YOUR BRAND.
            </p>
          </div>
        </div>

        {/* Client logos with infinite scroll */}
        <div className="space-y-5 sm:space-y-8 md:space-y-10 lg:space-y-[60px]">
          {/* Row 1 - scrolls left */}
          <div ref={row1Ref} className="overflow-hidden -mx-[4vw] sm:-mx-[6vw] lg:-mx-[5vw]">
            <div className="logo-row-content flex gap-[10px] sm:gap-[20px] lg:gap-[40px] xl:gap-[80px] w-max">
              {/* Duplicate logos multiple times for seamless loop and to fill space */}
              {[...clientLogos[0], ...clientLogos[0], ...clientLogos[0]].map((client, index) => (
                <div
                  key={`row1-${index}`}
                  className="w-[calc(36vw-16px)] sm:w-[90px] md:w-[100px] lg:w-[136px] h-[52px] sm:h-[72px] md:h-[80px] lg:h-[115px] flex-shrink-0"
                >
                  <LogoItem name={client.name} logo={client.logo} />
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - scrolls right */}
          <div ref={row2Ref} className="overflow-hidden -mx-[4vw] sm:-mx-[6vw] lg:-mx-[5vw]">
            <div className="logo-row-content flex gap-[10px] sm:gap-[20px] lg:gap-[40px] xl:gap-[80px] w-max">
              {/* Duplicate logos multiple times for seamless loop and to fill space */}
              {[...clientLogos[1], ...clientLogos[1], ...clientLogos[1]].map((client, index) => (
                <div
                  key={`row2-${index}`}
                  className="w-[calc(36vw-16px)] sm:w-[90px] md:w-[100px] lg:w-[136px] h-[52px] sm:h-[72px] md:h-[80px] lg:h-[115px] flex-shrink-0"
                >
                  <LogoItem name={client.name} logo={client.logo} />
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 - scrolls left */}
          <div ref={row3Ref} className="overflow-hidden -mx-[4vw] sm:-mx-[6vw] lg:-mx-[5vw]">
            <div className="logo-row-content flex gap-[10px] sm:gap-[20px] lg:gap-[40px] xl:gap-[80px] w-max">
              {/* Duplicate logos multiple times for seamless loop and to fill space */}
              {[...clientLogos[2], ...clientLogos[2], ...clientLogos[2]].map((client, index) => (
                <div
                  key={`row3-${index}`}
                  className="w-[calc(36vw-16px)] sm:w-[90px] md:w-[100px] lg:w-[136px] h-[52px] sm:h-[72px] md:h-[80px] lg:h-[115px] flex-shrink-0"
                >
                  <LogoItem name={client.name} logo={client.logo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsSection;

