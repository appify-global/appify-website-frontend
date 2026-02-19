"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProcessStep } from "@/lib/data/services";

interface ServiceProcessProps {
  subtitle: string;
  steps: ProcessStep[];
}

// Plus icon component
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

// Progress bar component
const ProgressBar: React.FC = () => (
  <div className="flex items-center gap-2">
    <div className="h-[3px] w-[160px] lg:w-[236px] bg-[rgba(52,57,63,0.4)] relative">
      <div className="absolute h-full w-[15%] bg-[#ff009e]" />
    </div>
  </div>
);

// Single process step component
const ProcessStepCard: React.FC<{
  step: ProcessStep;
  index: number;
}> = ({ step, index }) => {
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (stepRef.current) observer.observe(stepRef.current);
    return () => {
      if (stepRef.current) observer.unobserve(stepRef.current);
    };
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={stepRef}
      className={`process-step opacity-0 translate-y-8 transition-all duration-700 ease-out flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-6 lg:gap-12 items-start lg:items-center`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Image */}
      {step.image && (
        <div className="w-full lg:w-[55%] aspect-[16/9] relative rounded-xl lg:rounded-2xl overflow-hidden bg-black">
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className={`flex flex-col gap-3 lg:gap-5 flex-1 ${isEven ? 'lg:pl-4' : 'lg:pr-4'}`}>
        {/* Step number */}
        <div className="flex items-baseline gap-2">
          <span className="font-Aeonik text-sm lg:text-base tracking-[0.05em] uppercase">
            Step
          </span>
          <span className="font-mono text-xl lg:text-[36px] tracking-[-0.02em]">
            {step.stepNumber}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-Aeonik text-2xl lg:text-[48px] leading-[1.1] tracking-[0.01em] uppercase">
          {step.title}
        </h3>

        {/* Description */}
        <p className="font-Aeonik text-sm lg:text-base leading-[1.6] max-w-[332px] lg:max-w-[320px] text-black/80">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default function ServiceProcess({ subtitle, steps }: ServiceProcessProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (subtitleRef.current) observer.observe(subtitleRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (subtitleRef.current) observer.unobserve(subtitleRef.current);
    };
  }, []);

  return (
    <section className="w-full min-w-0 px-[4vw] sm:px-[6vw] lg:px-20 py-10 sm:py-12 lg:py-24 relative">
      {/* Decorative curved line */}
      <svg
        className="absolute top-0 right-0 w-full h-[60%] pointer-events-none hidden lg:block"
        viewBox="0 0 2000 1500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200C400 400 800 100 1200 300C1600 500 1900 200 2200 400"
          stroke="#ff009e"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.2"
        />
      </svg>

      {/* Title section */}
      <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[100px] mb-6 sm:mb-8 lg:mb-16">
        <div
          ref={titleRef}
          className="flex flex-col gap-2 sm:gap-3 lg:gap-4 opacity-0 translate-y-8 transition-all duration-700 ease-out"
        >
          <h2 className="font-Aeonik text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] tracking-[-0.02em]">
            <span className="block">OUR</span>
          </h2>
          <h2 className="font-Aeonik text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] tracking-[-0.02em] lg:ml-[140px]">
            <span className="block">PROCESS</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-end gap-6 lg:gap-10">
          <p
            ref={subtitleRef}
            className="font-Aeonik text-xs lg:text-sm tracking-[0.01em] max-w-[270px] opacity-0 translate-y-8 transition-all duration-700 ease-out delay-150 leading-[1.5]"
          >
            {subtitle}
          </p>

          {/* Get in touch button */}
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-3 w-fit hover:bg-[#E4E6EF] transition-colors translate-y-[18px]"
          >
            <span className="w-[10px] h-[10px] rounded-full bg-[#ff009e]" />
            <span className="font-Aeonik text-sm tracking-[-0.05em] uppercase">
              Get in Touch
            </span>
          </Link>
        </div>
      </div>

      {/* Progress bar - desktop only */}
      <div className="hidden lg:flex items-center gap-2 mb-10">
        <ProgressBar />
      </div>

      {/* Process steps */}
      <div className="flex flex-col gap-8 sm:gap-10 lg:gap-24">
        {steps.map((step, index) => (
          <ProcessStepCard key={index} step={step} index={index} />
        ))}
      </div>

      {/* Decorative line with plus icons */}
      <div className="flex items-center justify-between w-full mt-[89px] sm:mt-[97px] lg:mt-20">
        <PlusIcon className="text-black w-5 h-5" />
        <PlusIcon className="hidden lg:block text-black w-5 h-5" />
        <PlusIcon className="hidden lg:block text-black w-5 h-5" />
        <PlusIcon className="hidden lg:block text-black w-5 h-5" />
        <PlusIcon className="text-black w-5 h-5" />
      </div>
    </section>
  );
}

