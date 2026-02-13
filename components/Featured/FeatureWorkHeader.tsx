"use client";
import { a, useSpring } from "@react-spring/web";
import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useLenis } from "@/hooks/useLenis";
import { TAB_BRAKEPOINT, useIsMobile } from "@/hooks/UseIsMobile";

gsap.registerPlugin(SplitText);

const FeatureWorkHeader = () => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const isMobile = useIsMobile(TAB_BRAKEPOINT);

  useEffect(() => {
    if (!lenis) return;
    if (!ref.current) return;
    if (isMobile) return; // Skip SplitText animation on mobile/tablet

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
        duration: 1,
        force3D: true,
        scrollTrigger: {
          trigger: "#feature-work-header",
          start: "top 95%",
          toggleActions: "play none none none",
          scroller: document.body,
          invalidateOnRefresh: false,
        },
      });
    });
  }, [lenis, isMobile]);

  return (
    <a.div
      style={props}
      ref={ref}
      className="relative w-full font-Aeonik"
    >
      <div>
        <div
          className="relative z-10 font-Aeonik text-[13.8vw] sm:text-[10vw] md:text-[8vw]
          leading-[1.05] sm:leading-[1.1] md:leading-[1.15] lg:leading-[1.2] lg:float-start lg:w-[80%] overflow-hidden"
        >
          <div className="flex flex-wrap justify-start">
            <div id="feature-work-header" className="whitespace-nowrap">
              Featured Work
            </div>
          </div>
        </div>

        <div id="feature-work-header-description" className="mt-4 md:mt-6 lg:mt-14 lg:float-end lg:w-[20%]">
          <p
            className="
              text-xs sm:text-sm md:text-xs lg:text-md uppercase max-w-[500px] mb-0 font-Aeonik leading-snug
            "
          >
            A SELECTION OF OUR MOST PASSIONATELY CRAFTED WORKS WITH
            FORWARD-THINKING CLIENTS AND FRIENDS OVER THE YEARS.
          </p>
        </div>
      </div>
    </a.div>
  );
};

export default FeatureWorkHeader;
