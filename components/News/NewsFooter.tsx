"use client";

import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowRight, FaHeart } from "react-icons/fa";

const cities = [
  { name: "Melbourne", flag: "🇦🇺", tz: "Australia/Melbourne" },
  { name: "San Francisco", flag: "🇺🇸", tz: "America/Los_Angeles" },
  { name: "Sri Lanka", flag: "🇱🇰", tz: "Asia/Colombo" },
  { name: "Dubai", flag: "🇦🇪", tz: "Asia/Dubai" },
];

// Compute times only on client to avoid server/client hydration mismatch
const computeTimes = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  const updated: Record<string, string> = {};
  cities.forEach((c) => {
    const now = new Date();
    const opts: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    updated[c.name] = new Intl.DateTimeFormat("en-US", {
      ...opts,
      timeZone: c.tz,
    }).format(now);
  });
  return updated;
};

function ScrollToTopButton() {
  const handleScrollTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0 });
  };
  return (
    <button
      onClick={handleScrollTop}
      aria-label="Scroll to top"
      className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-800 transition shadow-lg"
    >
      <FaArrowUp size={16} />
    </button>
  );
}

export default function NewsFooter() {
  // Start with empty so server and client match; fill in useEffect to avoid hydration mismatch
  const [times, setTimes] = useState<Record<string, string>>(() => ({}));

  useEffect(() => {
    setTimes(computeTimes());
    const t = setInterval(() => setTimes(computeTimes()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer className="w-full font-Aeonik bg-white">
      {/* MAIN AREA */}
      <div
        className="text-black px-[4vw] pt-12 sm:pt-16 lg:pt-32
               grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[320px_1fr] gap-6 md:gap-8"
        aria-label="Footer main area"
      >
        {/* LEFT: address */}
        <div className="order-2 md:order-1 md:mb-20">
          <div className="max-w-[220px] font-Aeonik text-base sm:text-lg lg:text-xl">
            <p className="font-medium mb-1">Level 2</p>
            <p>696 Bourke Street,</p>
            <p>Melbourne VIC,</p>
            <p>Australia</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="order-1 md:order-2 md:pl-8 lg:pl-12">
          <div className="grid grid-cols-1 md:grid-cols-[0.4fr_0.6fr] lg:grid-cols-[0.35fr_0.65fr] gap-6 md:gap-8 lg:gap-11 items-start">
            {/* LINKS + EMAILS */}
            <div className="order-2 md:order-1">
              <ul className="space-y-2 text-base sm:text-lg lg:text-xl mb-6 lg:mb-12">
                <li className="cursor-pointer">Youtube</li>
                <li className="cursor-pointer">Instagram</li>
                <li className="cursor-pointer">Linkedin</li>
              </ul>

              <div className="mb-4 lg:mb-12">
                <p className="text-base sm:text-lg lg:text-xl font-medium mb-1">General enquiries</p>
                <p className="text-base sm:text-lg lg:text-xl break-all md:break-normal">hello@appify.global</p>
              </div>

              <div className="mb-4 lg:mb-12">
                <p className="text-base sm:text-lg lg:text-xl font-medium mb-1">Support enquiries</p>
                <p className="text-base sm:text-lg lg:text-xl break-all md:break-normal">support@appify.global</p>
              </div>
            </div>

            {/* PARTNER FORM */}
            <div className="order-1 md:order-2">
              <div className="lg:pr-28">
                <h2 className="text-3xl sm:text-4xl md:text-[2.5rem] lg:text-6xl leading-tight md:leading-normal mb-4 sm:mb-6">
                  Partner with <br /> our team
                </h2>

                <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex items-center w-full bg-[#f0f1fa] rounded-lg overflow-hidden border border-transparent">
                    <input
                      type="email"
                      placeholder="Your email"
                      required
                      className="flex-1 min-w-0 px-4 py-3 text-base bg-transparent focus:outline-none"
                    />
                    <button type="submit" className="px-4 py-3 flex-shrink-0">
                      <FaArrowRight size={16} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TIMES / CREDITS / SCROLL - compact row */}
      <div className="text-black px-[4vw] py-8 sm:py-12">
        {/* City times - visible on tablet and up */}
        <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 flex-wrap mb-6">
          {cities.map((c) => (
            <span key={c.name} className="whitespace-nowrap text-sm lg:text-base">
              {c.flag} {c.name} {times[c.name] || "--:--"}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm sm:text-base">©{new Date().getFullYear()} Appify App Development Pty Ltd</p>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <span className="hidden sm:inline">Built by Appify with</span>
              <FaHeart className="text-red-500" />
            </div>
            <ScrollToTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}

