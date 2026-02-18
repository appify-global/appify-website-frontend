"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  heroImage: string;
}

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

const BackArrowIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ServiceHero({ title, subtitle, heroImage }: ServiceHeroProps) {
  return (
    <section className="w-full px-4 lg:px-20 pt-12 sm:pt-16 lg:pt-24 pb-8 lg:pb-16">
      {/* Back Navigation - mobile/tablet: pill arrow only */}
      <div className="mb-6 lg:hidden">
        <Link
          href="/services"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E4E6EF] hover:bg-[#d5d7e3] transition-colors"
        >
          <BackArrowIcon />
        </Link>
      </div>

      {/* Back Navigation - desktop: arrow + text */}
      <div className="hidden lg:block mb-12">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm font-AeonikMedium text-[#2B2E3A] hover:text-[#ff009e] transition-colors uppercase tracking-wide"
        >
          <BackArrowIcon />
          <span>Back</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16">
        {/* Left side - Title and CTA */}
        <div className="flex flex-col gap-6 lg:gap-8 lg:w-1/2">
          {/* Title */}
          <h1 className="font-Aeonik text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em]">
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className="font-Aeonik text-xs lg:text-sm tracking-[0.02em] max-w-[610px] uppercase leading-[1.5]">
            {subtitle}
          </p>
          
          {/* Contact Button */}
          <Link
            href="/#contact"
            className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-3 w-fit hover:bg-[#E4E6EF] transition-colors"
          >
            <span className="w-[10px] h-[10px] rounded-full bg-[#ff009e]" />
            <span className="font-Aeonik text-sm tracking-[-0.05em] uppercase">Contact Us</span>
          </Link>
        </div>
        
        {/* Right side - Hero Image */}
        <div className="lg:w-1/2 relative">
          <div className="w-full aspect-[16/9] rounded-xl lg:rounded-2xl overflow-hidden relative">
            <Image
              src={heroImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Scroll to explore indicator */}
      <div className="w-full flex items-center justify-center lg:justify-between mt-12 lg:mt-20">
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

