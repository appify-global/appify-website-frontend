"use client";
import { a, useSpring } from "@react-spring/web";
import React, { useEffect, useRef } from "react";

const HeaderExpert = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("home-reel-title--visible");
        } else {
          el.classList.remove("home-reel-title--visible");
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
        className="home-reel-title font-Aeonik !mt-0 !mb-[1.5em]"
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

      <div
        className="
          absolute 
          top-0 right-0 
          flex flex-col items-end text-right
          max-w-[300px]
          text-sm uppercase font-Aeonik
          md:text-base lg:text-lg xl:text-xl
          md:static md:items-start md:text-left md:max-w-none
          sm:max-w-[250px]
          md:absolute md:top-0 md:right-0
          md:flex md:flex-col md:items-end md:text-right
          md:max-w-[300px]
          md:uppercase
          md:font-Aeonik
          md:text-[0.9rem]
          sm:text-[0.85rem]
          md:text-[1rem]
          lg:text-[1.1rem]
          xl:text-[1.2rem]
          text-black
          md:block
          md:mb-0
          mt-4
          md:mt-0
          bottom-0
          md:bottom-auto
          font-medium
        "
      >
        <p
          className="
            hidden md:block 
            text-md uppercase max-w-[400px] mb-4 font-Aeonik
          "
        >
          A TEAM OF EXPERIENCED INVENTORS & DREAMERS WITH A WIDE RANGE OF SKILLS
          AND KNOWLEDGE
        </p>

        {/* Desktop icon boxes */}
        <div className="hidden md:flex space-x-2 justify-end">
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
              <img src={icon} className="w-5 h-5" />
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden py-8 text-sm uppercase font-Aeonik content-start">
        <p className="leading-snug text-left">
          A TEAM OF EXPERIENCED INVENTORS & DREAMERS WITH A WIDE RANGE OF SKILLS
          AND KNOWLEDGE
        </p>
        <div className="flex justify-left space-x-2 mt-5">
          {[
            "/eight-bit-icons/s.svg",
            "/eight-bit-icons/c.svg",
            "/eight-bit-icons/d.svg",
            "/eight-bit-icons/i.svg",
          ].map((icon) => (
            <div
              key={icon}
              className="w-8 h-10 border border-black flex items-center justify-center text-[0.65rem] rounded-lg"
            >
              <img src={icon} className="w-5 h-5" />
            </div>
          ))}
        </div>
      </div>
    </a.div>
  );
};

export default HeaderExpert;
