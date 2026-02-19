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
      <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-lg p-2 sm:p-3 lg:p-4">
        <Image
          src={logo}
          alt={name}
          width={136}
          height={115}
          className="w-full h-full object-contain filter brightness-0 invert"
        />
      </div>
    );
  }
  
  return (
    <div className="w-full h-full flex items-center justify-center bg-white/5 rounded-lg">
      <span className="font-Aeonik text-[11px] sm:text-[12px] text-white/40 text-center px-2">
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
      className="relative w-full bg-black overflow-hidden pt-[8vh] sm:pt-[10vh] lg:pt-[160px] pb-[4vh] sm:pb-[5vh] lg:pb-[40px]"
    >
      {/* Main content */}
      <div className="relative z-10 px-[4vw] sm:px-[6vw] lg:px-[5vw]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-[30px] sm:mb-[50px] lg:mb-[80px]">
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

        {/* Client logos with infinite scroll */}
        <div className="space-y-[20px] sm:space-y-[40px] lg:space-y-[60px]">
          {/* Row 1 - scrolls left */}
          <div ref={row1Ref} className="overflow-hidden -mx-[4vw] sm:-mx-[6vw] lg:-mx-[5vw]">
            <div className="logo-row-content flex gap-[10px] sm:gap-[20px] lg:gap-[40px] xl:gap-[80px] w-max">
              {/* Duplicate logos multiple times for seamless loop and to fill space */}
              {[...clientLogos[0], ...clientLogos[0], ...clientLogos[0]].map((client, index) => (
                <div
                  key={`row1-${index}`}
                  className="w-[calc(33vw-20px)] sm:w-[100px] lg:w-[136px] h-[60px] sm:h-[80px] lg:h-[115px] flex-shrink-0"
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
                  className="w-[calc(33vw-20px)] sm:w-[100px] lg:w-[136px] h-[60px] sm:h-[80px] lg:h-[115px] flex-shrink-0"
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
                  className="w-[calc(33vw-20px)] sm:w-[100px] lg:w-[136px] h-[60px] sm:h-[80px] lg:h-[115px] flex-shrink-0"
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

