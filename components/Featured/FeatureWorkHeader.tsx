"use client";
import { a, useSpring } from "@react-spring/web";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useLenis } from "@/hooks/useLenis";

gsap.registerPlugin(SplitText);

const FeatureWorkHeader = () => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (!ref.current) return;

    requestAnimationFrame(() => {
      const split = new SplitText("#feature-work-header", {
        type: "chars,words,lines",
      });

      // Add will-change for GPU acceleration
      split.chars.forEach((char) => {
        if (char instanceof HTMLElement) {
          char.style.willChange = "transform, opacity";
        }
      });

      gsap.from(split.chars, {
        yPercent: 120,
        opacity: 0,
        stagger: 0.02,
        ease: "power4.out",
        force3D: true,
        scrollTrigger: {
          trigger: "#feature-work-header",
          start: "top 90%",
          toggleActions: "play none none reverse",
          scroller: document.body,
          invalidateOnRefresh: false,
        },
      });
    });
  }, [lenis]);

  return (
    <a.div
      style={props}
      ref={ref}
      className="relative w-full font-Aeonik overflow-hidden inline-block"
    >
      <div
        className="relative z-10 font-Aeonik text-[8vw]
      leading-[1.05] sm:leading-[1.1] md:leading-[1.15] lg:leading-[1.2] float-start w-[80%]"
      >
        <div className="flex flex-wrap justify-start">
          <div id="feature-work-header" className="whitespace-nowrap">
            Featured Work
          </div>
        </div>
      </div>

      <div id="feature-work-header-description" className="float-end w-[35%] lg:w-[20%] mt-10 lg:mt-20">
        <p
          className="
            hidden md:block
            text-xs lg:text-md uppercase max-w-[500px] mb-4 font-Aeonik leading-snug
          "
        >
          A SELECTION OF OUR MOST PASSIONATELY CRAFTED WORKS WITH
          FORWARD-THINKING CLIENTS AND FRIENDS OVER THE YEARS.
        </p>
      </div>

      <div className="md:hidden py-4 sm:py-8 text-xs sm:text-sm uppercase font-Aeonik content-start">
        <p className="leading-snug text-left">
          A SELECTION OF OUR MOST PASSIONATELY CRAFTED WORKS WITH
          FORWARD-THINKING CLIENTS AND FRIENDS OVER THE YEARS.
        </p>
      </div>
    </a.div>
  );
};

export default FeatureWorkHeader;
