"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import DotButton from "@/components/ui/DotButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

interface PlusIconProps {
  className?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({ className }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-3 h-3 lg:w-4 lg:h-4 ${className || ""}`}
  >
    <path
      d="M11.7581 0.149597V9.84198H21.4504V11.758H11.7581V21.4504H9.84204V11.758H0.149658V9.84198H9.84204V0.149597H11.7581Z"
      fill="#1B1B1B"
      stroke="black"
      strokeWidth="0.3"
    />
  </svg>
);

// Category letter icons
const CategoryLetters = () => (
  <div className="flex items-center gap-3 lg:gap-4">
    {['s', 'c', 'd', 'i'].map((letter) => (
      <div 
        key={letter}
        className="w-8 h-10 lg:w-10 lg:h-14 flex items-center justify-center bg-[#E4E6EF] rounded-lg"
      >
        <img 
          src={`/eight-bit-icons/${letter}.svg`} 
          alt={letter.toUpperCase()} 
          className="w-3 h-4 lg:w-4 lg:h-5"
        />
      </div>
    ))}
  </div>
);

const ServicesHero = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const expertiseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("services-hero--visible");
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // EXPERTISE: initial fade-in + horizontal scroll animation on desktop
  useEffect(() => {
    const el = expertiseRef.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    // Skip all animations on mobile/tablet
    if (window.innerWidth < 1024) return;

    // Initial fade-in from below (desktop only)
    gsap.fromTo(el,
      { y: 40 },
      { y: 0, duration: 0.8, ease: "power2.out", delay: 0.3 }
    );

    // Scroll-linked horizontal move: starts immediately on any scroll
    const targetX = window.innerWidth * 0.35;

    // Small delay to ensure Lenis + ScrollTrigger proxy is ready
    const timer = setTimeout(() => {
      const tween = gsap.to(el, {
        x: targetX,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=800",
          scrub: 0.5,
          scroller: document.body,
        },
      });

      ScrollTrigger.refresh();

      // Store for cleanup
      (el as any)._scrollTween = tween;
    }, 500);

    return () => {
      clearTimeout(timer);
      const tween = (el as any)?._scrollTween;
      if (tween) {
        tween.scrollTrigger?.kill();
        tween.kill();
      }
    };
  }, []);

  return (
    <section className="relative w-full px-[4vw] sm:px-[6vw] lg:px-[5vw] pt-20 sm:pt-24 lg:pt-[180px]">
      <div ref={titleRef} className="services-hero">
        {/* Subtitle - above the main title (desktop only) */}
        <div className="hidden lg:block mb-6 lg:mb-10 max-w-[320px] lg:max-w-[300px]">
          <p className="font-Aeonik text-[clamp(0.75rem,1.2vw,0.9rem)] leading-relaxed text-[#666] uppercase tracking-wide">
            A TEAM OF EXPERIENCED INVENTORS &amp; DREAMERS WITH A WIDE RANGE OF SKILLS AND KNOWLEDGE
          </p>
        </div>

        {/* Main title section with category letters */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-0">
          {/* Left side - Main title */}
          <div className="flex flex-col w-full pb-3 lg:pb-6">
            <h1 className="font-Aeonik text-[clamp(2.5rem,10vw,5rem)] sm:text-[clamp(3rem,9vw,6rem)] lg:text-[clamp(3rem,12vw,11rem)] leading-[0.95] tracking-[-0.02em]">
              <span className="block services-title-line services-title-line-1">AREA OF</span>
              <span ref={expertiseRef} className="block services-title-line services-title-line-2 will-change-transform">EXPERTISE</span>
            </h1>
          </div>

          {/* Subtitle - below title, above icons (mobile/tablet only) */}
          <div className="lg:hidden max-w-[320px]">
            <p className="font-Aeonik text-[clamp(0.75rem,1.2vw,0.9rem)] leading-relaxed text-[#666] uppercase tracking-wide">
              A TEAM OF EXPERIENCED INVENTORS &amp; DREAMERS WITH A WIDE RANGE OF SKILLS AND KNOWLEDGE
            </p>
          </div>

          {/* Right side - Category letters */}
          <div className="flex lg:flex-col items-center lg:items-end gap-4 lg:mt-[4.5vw]">
            <CategoryLetters />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 sm:mt-10 lg:mt-16 w-full flex items-center justify-between font-medium uppercase text-sm lg:text-base font-Aeonik">
          <PlusIcon />
          <PlusIcon className="hidden lg:inline-block" />
          <div className="mx-2 lg:mx-4">Scroll to Explore</div>
          <PlusIcon className="hidden lg:inline-block" />
          <PlusIcon />
        </div>
      </div>

      {/* Cards + Description row */}
      <div className="mt-10 sm:mt-12 lg:mt-28 flex flex-col-reverse lg:flex-row lg:items-start gap-8 lg:gap-12">
        {/* Left - Card stack */}
        <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[350px] lg:h-[400px] flex-shrink-0 overflow-visible">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 lg:left-[40%] w-[140px] sm:w-[160px] lg:w-[180px] h-[188px] sm:h-[215px] lg:h-[240px]"
              style={{
                transform: `translate(-50%, -50%) translateX(${(i - 1.5) * 35}%) rotate(${(i - 1.5) * 6}deg)`,
                zIndex: i === 1 || i === 2 ? 10 : 5,
              }}
            >
              <div className="w-full h-full rounded-xl lg:rounded-2xl overflow-hidden shadow-lg relative">
                <Image
                  src="/bg-card.png"
                  alt="Appify Card"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right - Description + CTA */}
        <div className="flex flex-col justify-center lg:w-[42%] lg:max-w-[500px] lg:pt-8">
          <p className="font-Aeonik text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.6] text-[#444]">
            At Appify, we deliver custom software development, AI and machine learning solutions, mobile app development, and enterprise ERP systems across Australia, UAE, and Qatar. We specialise in unprecedented AI implementations, digital transformation projects, complex system integrations, and automation challenges that require cutting-edge technology and proven expertise.
          </p>
          <p className="font-Aeonik text-[clamp(0.95rem,1.4vw,1.1rem)] leading-[1.6] text-[#444] mt-6">
            We don&apos;t just build applications and disappear. Our software development approach focuses on true partnership with your team - from strategic consulting and architecture design to deployment and beyond.
          </p>
          <div className="mt-8">
            <DotButton
              text="FREE DISCOVERY CALL"
              variant="white"
              className="free-discovery-call-btn"
              href="/#contact"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;

