"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SCROLL_THRESHOLD = 3000; // Total scroll distance needed to fill progress bar (in pixels) - ~5% per scroll

/**
 * Home page only. Renders the "KEEP SCROLLING / ABOUT US" black section.
 * Progress bar fills as user scrolls, navigates to /about when progress reaches 100%.
 */
export default function HomeAboutScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const sectionInViewRef = useRef(false);
  const scrollProgressRef = useRef(0);
  const hasNavigatedRef = useRef(false);
  const [progress, setProgress] = useState(0);

  // Track when section enters viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        if (e.isIntersecting) {
          sectionInViewRef.current = true;
        } else {
          sectionInViewRef.current = false;
          // Reset progress when section leaves viewport
          scrollProgressRef.current = 0;
          setProgress(0);
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Track scroll progress and update progress bar
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (hasNavigatedRef.current || !sectionInViewRef.current) return;

      // Only track scroll down (positive deltaY)
      if (e.deltaY > 0) {
        scrollProgressRef.current = Math.min(
          scrollProgressRef.current + Math.abs(e.deltaY),
          SCROLL_THRESHOLD
        );
      } else if (e.deltaY < 0) {
        // Allow scrolling back up to reduce progress (but not below 0)
        scrollProgressRef.current = Math.max(
          scrollProgressRef.current - Math.abs(e.deltaY),
          0
        );
      }

      const newProgress = (scrollProgressRef.current / SCROLL_THRESHOLD) * 100;
      setProgress(newProgress);

      // Navigate when progress reaches 100%
      if (newProgress >= 100 && !hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        e.preventDefault();
        // Use window.location for full page reload to ensure scroll reset
        window.location.href = "/about";
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [router]);

  return (
    <div
      ref={sectionRef}
      className="bg-black text-white px-[4vw] py-12 sm:py-16 lg:py-20 pb-0 z-40 relative"
    >
      <div className="text-xs sm:text-sm lg:text-xl text-gray-400 mb-4 sm:mb-6 tracking-wide">
        KEEP SCROLLING TO LEARN MORE
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">ABOUT US</h2>
        <Link
          href="/about"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
          aria-label="Go to About us page"
        >
          <p className="text-sm sm:text-base lg:text-xl">NEXT PAGE</p>
          <div className="flex items-center gap-2">
            <div className="h-[4px] w-[120px] lg:w-[160px] bg-[#34393f] rounded-full relative overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute h-full bg-[#ff009e] rounded-full left-0 top-0 transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white group-hover:translate-x-0.5 transition-transform"
              aria-hidden
            >
              <path
                d="M1 8H19M19 8L12 1M19 8L12 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 text-center text-sm sm:text-base lg:text-lg opacity-90">
        <span>+</span>
        <span>+</span>
        <span>+</span>
        <span>+</span>
      </div>
    </div>
  );
}
