"use client";
import React, { useEffect, useRef } from "react";

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M11.7581 0.149597V9.84198H21.4504V11.758H11.7581V21.4504H9.84204V11.758H0.149658V9.84198H9.84204V0.149597H11.7581Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.3"
    />
  </svg>
);

interface ServiceExperienceProps {
  tagline: string;
  description: string;
}

export default function ServiceExperience({ tagline, description }: ServiceExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, observerOptions);

    if (taglineRef.current) observer.observe(taglineRef.current);
    if (descriptionRef.current) observer.observe(descriptionRef.current);

    return () => {
      if (taglineRef.current) observer.unobserve(taglineRef.current);
      if (descriptionRef.current) observer.unobserve(descriptionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-[4vw] sm:px-[6vw] lg:px-20 pt-2 sm:pt-4 lg:pt-20 pb-24 sm:pb-28 lg:pb-20"
    >
      <div className="flex flex-col lg:flex-row lg:justify-end">
        <div className="flex flex-col gap-6 lg:gap-8 lg:w-1/2 max-w-[887px]">
          {/* Tagline */}
          <h5
            ref={taglineRef}
            className="font-AeonikMedium text-base lg:text-lg uppercase tracking-[0.01em] opacity-0 translate-y-5 transition-all duration-700 ease-out"
            style={{ transitionProperty: "opacity, transform" }}
          >
            {tagline}
          </h5>

          {/* Description */}
          <p
            ref={descriptionRef}
            className="font-Aeonik text-base lg:text-xl leading-[1.4] lg:leading-[1.5] opacity-0 translate-y-5 transition-all duration-700 ease-out delay-150 font-light"
            style={{ transitionProperty: "opacity, transform" }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Scroll to explore indicator */}
      <div className="w-full flex items-center justify-center lg:justify-between mt-16 sm:mt-20 lg:mt-20">
        <PlusIcon className="hidden lg:block text-black w-5 h-5" />
        <div className="flex items-center gap-4">
          <PlusIcon className="text-black w-5 h-5" />
          <span className="font-Aeonik text-sm lg:text-base uppercase tracking-wide">
            Scroll to Explore
          </span>
          <PlusIcon className="text-black w-5 h-5" />
        </div>
        <PlusIcon className="hidden lg:block text-black w-5 h-5" />
      </div>
    </section>
  );
}

