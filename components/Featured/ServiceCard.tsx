"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TAB_BRAKEPOINT, useIsMobile } from "@/hooks/UseIsMobile";
import { compute_card_state } from "@/rust/pkg/skiggle_wasm";
import { useLenis } from "@/hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

const expertsIn = [
  {
    name: "STRATEGY",
    skills: [
      "Digital Transformation",
      "Technology Consulting",
      "Business Analysis",
      "Process Optimisation",
      "Architecture Design",
    ],
    icon: "/eight-bit-icons/s.svg",
  },
  {
    name: "CREATIVE",
    skills: [
      "UX/UI Design",
      "Product Design",
      "User Research",
      "Design Systems",
      "Prototyping",
    ],
    icon: "/eight-bit-icons/c.svg",
  },
  {
    name: "DEVELOPMENT",
    skills: [
      "Software Development",
      "Web Applications",
      "App Development",
      "ERP Solutions",
      "System Integration",
    ],
    icon: "/eight-bit-icons/d.svg",
  },
  {
    name: "INTELLIGENCE",
    skills: [
      "AI/ML Engineering",
      "Agentic Solutions",
      "MCP Development",
      "Intelligent Automation",
      "Custom AI Models",
    ],
    icon: "/eight-bit-icons/i.svg",
  },
];

const rotations = [-15, -7.5, 7.5, 15];
// Wider spacing between cards (was 14, 38, 62, 86 — 24% gap; now 26% gap)
const positions = [10, 36, 62, 88];

const FloatingCards: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const isMobile = useIsMobile(TAB_BRAKEPOINT);
  const [scrollLocked, setScrollLocked] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (isMobile) return;
    if (!sectionRef.current || !lenis) return;

    ScrollTrigger.defaults({
      scroller: document.body,
    });

    const totalScrollHeight = 200 * 3;

    const pinTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${totalScrollHeight}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: false,
    });

    const triggers: ScrollTrigger[] = [];

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const front = card.querySelector(".flip-card-front") as HTMLElement | null;
      const back = card.querySelector(".flip-card-back") as HTMLElement | null;

      if (!front || !back) return;

      // Add will-change for GPU acceleration
      front.style.willChange = "transform";
      back.style.willChange = "transform";
      card.style.willChange = "transform";

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current!,
        start: "top top",
        end: `+=${totalScrollHeight}`,
        scrub: 1, // Smoother scrubbing
        invalidateOnRefresh: false,
        onUpdate: (self) => {
          const p = self.progress;

          const fullscreenReached = self.progress >= 0.999;
          const scrollingDown = self.direction === 1;

          if (fullscreenReached && scrollingDown && !scrollLocked) {
            setScrollLocked(true);
          }

          const state = compute_card_state(
            p,
            index,
            rotations,
            positions
          );

          // Use smooth animations instead of immediate set
          gsap.to(front, { 
            rotateY: state.front_rot, 
            duration: 1.5,
            ease: "power2.inOut",
            force3D: true
          });
          gsap.to(back, { 
            rotateY: state.back_rot, 
            duration: 1.5,
            ease: "power2.inOut",
            force3D: true
          });

          gsap.to(card, {
            left: `${state.left}%`,
            rotate: state.rot,
            xPercent: -50,
            yPercent: -50,
            duration: 0.5,
            ease: "power2.inOut",
            force3D: true,
            transformOrigin: "center center"
          });
        },
      });

      triggers.push(trigger);

      gsap.to(card, {
        y: 10,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.4,
        force3D: true,
      });
    });

    return () => {
      pinTrigger.kill();
      triggers.forEach((t) => t.kill());
      ScrollTrigger.clearMatchMedia();
    };
  }, [lenis, isMobile, scrollLocked]);

  if (isMobile) {
    return (
      <section className="cards relative w-auto overflow-hidden mt-0 md:mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
          {expertsIn.map((expert) => (
            <div
              key={expert.name}
              className="
                w-full rounded-2xl overflow-hidden border
                bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm
                bg-opacity-20 border border-gray-300
                rounded-3xl overflow-hidden mt-6 md:mt-0
              "
            >
              <div className="p-6 md:p-8 flex flex-col justify-between gap-5 md:gap-6 md:min-h-[350px]">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl md:text-3xl font-Aeonik">{expert.name}</h2>
                  <img src={expert.icon} className="w-6 h-6 md:w-7 md:h-7" alt={expert.name} />
                </div>

                <div className="flex flex-col gap-1.5 md:gap-2">
                  {expert.skills.map((skill, index) => (
                    <div key={index}>
                      <p className="text-lg md:text-xl py-0.5">{skill}</p>
                      <div className="border-t-2 border-dotted border-black w-full" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center rotate-180">
                  <h2 className="text-2xl md:text-3xl font-Aeonik">{expert.name}</h2>
                  <img src={expert.icon} className="w-6 h-6 md:w-7 md:h-7" alt={expert.name} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="
        cards relative w-full
        min-h-[700px]
        h-[45vw]
        max-h-[900px]
        overflow-visible
        -mt-[5vw]
        flex items-center justify-center
        z-50
      "
      id="service-cards"
      style={{ zIndex: 50 }}
    >
      {expertsIn.map((expert, i) => (
        <div
          key={expert.name}
          ref={(el) => {
            if (el) cardRefs.current[i] = el;
          }}
          className="
            card absolute
            top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[22%]
            max-w-[380px]
            h-[clamp(400px,30vw,550px)]
            [perspective:1000px]
            transform-gpu
            z-50
          "
          style={{ zIndex: 50 }}
        >
          <div className="flip-card-inner relative w-full h-full [transform-style:preserve-3d] border-1 border-black">
            <div className="flip-card-front absolute w-full h-full [backface-visibility:hidden] rounded-xl overflow-hidden">
              <img
                src={`/bg-card.png`}
                alt={`Card ${expert.name}`}
                className="w-full h-full object-contain"
              />
            </div>
            <div
              className="
                flip-card-back absolute w-full
                bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-300
                h-full rounded-3xl overflow-hidden
                flex flex-col items-center justify-between text-black text-base font-normal [transform:rotateY(180deg)]
                px-6 xl:px-8 py-6 xl:py-8
              "
            >
              {/* Top Section */}
              <div className="w-full flex justify-between items-center">
                <h2 className="text-xl xl:text-3xl font-Aeonik whitespace-nowrap">{expert.name}</h2>
                <div className="w-5 h-5 xl:w-7 xl:h-7 flex items-center justify-center">
                  <img src={expert.icon} className="w-full" alt={expert.name} />
                </div>
              </div>

              <div className="w-full flex flex-col gap-1.5 xl:gap-2.5 text-sm xl:text-lg font-Aeonik">
                {expert.skills.map((item, index) => (
                  <div key={index}>
                    <p className="whitespace-nowrap py-0.5">{item}</p>
                    <div className="border-t-2 border-dotted border-black w-full" />
                  </div>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="w-full flex justify-between items-center rotate-180">
                <div className="w-5 h-5 xl:w-7 xl:h-7 flex items-center justify-center">
                  <img src={expert.icon} className="w-full" alt={expert.name} />
                </div>
                <h2 className="text-xl xl:text-3xl font-Aeonik whitespace-nowrap">{expert.name}</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FloatingCards;
