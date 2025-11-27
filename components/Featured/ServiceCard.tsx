"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { TAB_BRAKEPOINT, useIsMobile } from "@/hooks/UseIsMobile";
import { compute_card_state } from "@/rust/pkg/skiggle_wasm";

gsap.registerPlugin(ScrollTrigger);

interface FloatingCardsProps {
  lenis?: Lenis;
}

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
const positions = [14, 38, 62, 86];

const FloatingCards: React.FC<FloatingCardsProps> = ({ lenis }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const isMobile = useIsMobile(TAB_BRAKEPOINT);
  const [scrollLocked, setScrollLocked] = useState(false);

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
            rotations as any,
            positions as any
          );

          // Use smooth animations instead of immediate set
          gsap.to(front, { 
            rotateY: state.front_rot, 
            duration: 0.1,
            ease: "none",
            force3D: true
          });
          gsap.to(back, { 
            rotateY: state.back_rot, 
            duration: 0.1,
            ease: "none",
            force3D: true
          });

          gsap.to(card, {
            left: `${state.left}%`,
            rotate: state.rot,
            xPercent: -50,
            yPercent: -50,
            duration: 0.1,
            ease: "none",
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
      <section className="cards relative w-auto overflow-hidden mt-[-5rem]">
        {expertsIn.map((expert) => (
          <div
            key={expert.name}
            className="
              w-full rounded-2xl overflow-hidden border
              bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm
              bg-opacity-20 border border-gray-300
              rounded-3xl overflow-hidden mt-10
            "
          >
            <div className="p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-Aeonik">{expert.name}</h2>
                <img src={expert.icon} className="w-6 h-6" alt={expert.name} />
              </div>

              <div className="flex flex-col gap-2">
                {expert.skills.map((skill, index) => (
                  <div key={index}>
                    <p className="text-lg">{skill}</p>
                    <div className="border-t-2 border-dotted border-black mt-1 w-full" />
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-end rotate-180 mt-5">
                <h2 className="text-2xl font-Aeonik">{expert.name}</h2>
                <img src={expert.icon} className="w-6 h-6" alt={expert.name} />
              </div>
            </div>
          </div>
        ))}
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
        overflow-hidden
        -mt-[20vw]
        flex items-center justify-center
      "
      id="service-cards"
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
            w-1/4
            max-w-[400px]
            sm:w-[calc(25%-3vw)]
            h-[550px]
            [perspective:1000px]
            transform-gpu
          "
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
                px-8 py-8
              "
            >
              {/* Top Section */}
              <div className="w-full flex justify-between items-start">
                <h2 className="text-4xl font-Aeonik">{expert.name}</h2>
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src={expert.icon} className="w-full" alt={expert.name} />
                </div>
              </div>

              <div className="w-full flex flex-col gap-4 text-2xl font-Aeonik">
                {expert.skills.map((item, index) => (
                  <div key={index}>
                    <p>{item}</p>
                    <div className="border-t-2 border-dotted border-black mt-2 w-full" />
                  </div>
                ))}
              </div>

              {/* Bottom Section */}
              <div className="w-full flex justify-between items-end rotate-180">
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src={expert.icon} className="w-full" alt={expert.name} />
                </div>
                <h2 className="text-4xl font-Aeonik">{expert.name}</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FloatingCards;
