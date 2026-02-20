"use client";
import { a, useSpring } from "@react-spring/web";
import React, { useEffect, useRef } from "react";

const HeaderExpert = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const hasAnimatedRef = useRef(false);
  
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          el.classList.add("home-reel-title--visible");
          hasAnimatedRef.current = true;
          // Disconnect observer once animation has been triggered
          observer.disconnect();
        }
      },
      {
        threshold: 0.3, // tweak: how much needs to be visible to trigger
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const props = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });

  return (
    <a.div
      style={props}
      className="relative w-full font-Aeonik overflow-hidden"
    >
      <h4
        id="home-reel-title"
        ref={titleRef}
        className="home-reel-title font-Aeonik !mt-0 !mb-[0.5em] lg:!mb-[1.5em]"
      >
        <div id="home-reel-title-inner" className="home-reel-title-inner">
          <div className="home-reel-title-line-wrapper wrapper-2">
            <div
              id="home-reel-title-line-2"
              className="home-reel-title-line home-reel-title-line-2 uppercase"
            >
              Area of
            </div>
          </div>
          <div className="home-reel-title-line-wrapper wrapper-1">
            <div
              id="home-reel-title-line-1"
              className="home-reel-title-line home-reel-title-line-1 uppercase"
            >
              Expertise
            </div>
          </div>
        </div>
      </h4>

      {/* Desktop only - absolute positioned beside title */}
      <div
        className="
          hidden lg:flex
          absolute top-0 right-0
          flex-col items-start text-left
          max-w-[350px]
          text-[17.4px]
          uppercase font-Aeonik font-medium text-black
        "
      >
        <p className="text-md uppercase max-w-[350px] mb-4 font-Aeonik">
          A TEAM OF EXPERIENCED INVENTORS & DREAMERS WITH A WIDE RANGE OF SKILLS
          AND KNOWLEDGE
        </p>

        <div className="flex space-x-2 justify-start">
          {[
            "/eight-bit-icons/s.svg",
            "/eight-bit-icons/c.svg",
            "/eight-bit-icons/d.svg",
            "/eight-bit-icons/i.svg",
          ].map((icon) => (
            <div
              key={icon}
              className="w-10 h-16 border border-black flex items-center justify-center text-xs rounded-lg mt-5"
            >
              <img src={icon} className="w-5 h-5" alt="" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet - flows below title */}
      <div className="lg:hidden pt-2 pb-6 text-sm md:text-[15px] uppercase font-Aeonik content-start">
        <p className="leading-snug text-left">
          A TEAM OF EXPERIENCED INVENTORS & DREAMERS WITH A WIDE RANGE OF SKILLS
          AND KNOWLEDGE
        </p>
        <div className="flex justify-left space-x-2 mt-4 mb-6 md:mb-4">
          {[
            "/eight-bit-icons/s.svg",
            "/eight-bit-icons/c.svg",
            "/eight-bit-icons/d.svg",
            "/eight-bit-icons/i.svg",
          ].map((icon) => (
            <div
              key={icon}
              className="w-8 h-10 md:w-10 md:h-14 border border-black flex items-center justify-center text-[0.65rem] rounded-lg"
            >
              <img src={icon} className="w-5 h-5" alt="" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </a.div>
  );
};

export default HeaderExpert;
