"use client";
import React, { useState, useEffect, useRef } from "react";
import { FAQItem } from "@/lib/data/services";

interface ServiceFAQProps {
  faqs: FAQItem[];
}

// Plus/Minus icon for accordion
const AccordionIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <div className="relative w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center flex-shrink-0">
    {/* Horizontal line (always visible) */}
    <div className="absolute w-4 lg:w-5 h-[1.5px] bg-white" />
    {/* Vertical line (hidden when open) */}
    <div
      className={`absolute w-[1.5px] h-4 lg:h-5 bg-white transition-transform duration-300 ${
        isOpen ? "scale-y-0" : "scale-y-100"
      }`}
    />
  </div>
);

// Single FAQ item - uses CSS grid for height animation (no JS measurement needed)
const FAQItemComponent: React.FC<{
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, index, isOpen, onToggle }) => {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 lg:py-6 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-start lg:items-center gap-3 sm:gap-6 lg:gap-12 flex-1 pr-4">
          <span className="font-Aeonik text-xs lg:text-sm text-white/40 tracking-wide">
            {String(index + 1).padStart(3, "0")}
          </span>
          <span className="font-Aeonik text-sm lg:text-base text-white group-hover:text-white/80 transition-colors leading-[1.4]">
            {item.question}
          </span>
        </div>
        <AccordionIcon isOpen={isOpen} />
      </button>

      {/* Answer content with CSS grid animation (avoids JS height measurement) */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="pb-5 lg:pb-6">
            <p className="font-Aeonik text-sm lg:text-sm text-white/60 leading-[1.7] ml-8 sm:ml-12 lg:ml-[75px] max-w-[700px]">
              {item.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServiceFAQ({ faqs }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number>(0); // First one open by default
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
    };
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#121416] text-white py-10 sm:py-12 lg:py-20 relative overflow-hidden"
    >
      {/* Decorative background text - staggered watermark */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="absolute top-[5%] left-[-2%] opacity-[0.03]">
          <span className="font-Aeonik text-[40px] sm:text-[60px] lg:text-[180px] tracking-[0.02em] whitespace-nowrap text-white font-bold">
            FREQUENTLY
          </span>
        </div>
        <div className="absolute top-[18%] left-[8%] opacity-[0.03]">
          <span className="font-Aeonik text-[40px] sm:text-[60px] lg:text-[180px] tracking-[0.02em] whitespace-nowrap text-white font-bold">
            ASKED
          </span>
        </div>
        <div className="absolute top-[31%] left-[-5%] opacity-[0.03]">
          <span className="font-Aeonik text-[40px] sm:text-[60px] lg:text-[180px] tracking-[0.02em] whitespace-nowrap text-white font-bold">
            QUESTIONS
          </span>
        </div>
        <div className="absolute top-[48%] left-[12%] opacity-[0.03]">
          <span className="font-Aeonik text-[40px] sm:text-[60px] lg:text-[180px] tracking-[0.02em] whitespace-nowrap text-white font-bold">
            FREQUENTLY
          </span>
        </div>
        <div className="absolute top-[61%] left-[-8%] opacity-[0.03]">
          <span className="font-Aeonik text-[40px] sm:text-[60px] lg:text-[180px] tracking-[0.02em] whitespace-nowrap text-white font-bold">
            ASKED
          </span>
        </div>
        <div className="absolute top-[74%] left-[5%] opacity-[0.03]">
          <span className="font-Aeonik text-[40px] sm:text-[60px] lg:text-[180px] tracking-[0.02em] whitespace-nowrap text-white font-bold">
            QUESTIONS
          </span>
        </div>
      </div>

      <div className="px-[4vw] sm:px-[6vw] lg:px-20 relative z-10">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-Aeonik text-2xl sm:text-3xl lg:text-[48px] leading-[1.15] tracking-[-0.01em] mb-4 sm:mb-6 lg:mb-12 opacity-0 translate-y-8 transition-all duration-700 ease-out uppercase whitespace-nowrap"
        >
          Frequently Asked Questions
        </h2>

        {/* Separator line */}
        <div className="w-full h-px bg-white/10 mb-2" />

        {/* FAQ items */}
        <div className="flex flex-col">
          {faqs.map((faq, index) => (
            <FAQItemComponent
              key={index}
              item={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

