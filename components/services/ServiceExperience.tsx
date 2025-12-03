"use client";
import React, { useEffect, useRef } from "react";

interface ServiceExperienceProps {
  tagline: string;
  description: string;
}

export default function ServiceExperience({ tagline, description }: ServiceExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
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
      className="w-full px-4 lg:px-20 py-12 lg:py-20"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-20">
        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-Aeonik text-sm lg:text-base uppercase tracking-[0.01em] opacity-0 translate-y-5 transition-all duration-700 ease-out lg:w-1/2"
          style={{ transitionProperty: "opacity, transform" }}
        >
          {tagline}
        </p>

        {/* Description */}
        <p
          ref={descriptionRef}
          className="font-Aeonik text-lg lg:text-2xl leading-[1.4] lg:leading-[1.5] opacity-0 translate-y-5 transition-all duration-700 ease-out delay-150 lg:w-1/2 max-w-[887px]"
          style={{ transitionProperty: "opacity, transform" }}
        >
          {description}
        </p>
      </div>
    </section>
  );
}

