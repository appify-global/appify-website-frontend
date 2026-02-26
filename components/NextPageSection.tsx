"use client";

import Link from "next/link";

interface NextPageSectionProps {
  nextPageHref: string;
  pageTitle: string;
  ariaLabel?: string;
  /** Optional id for scroll targets (e.g. #footer-scroll from "CONTINUE TO SCROLL" button) */
  id?: string;
}

export default function NextPageSection({
  nextPageHref,
  pageTitle,
  ariaLabel,
  id,
}: NextPageSectionProps) {
  return (
    <div
      id={id}
      className="bg-black text-white px-[4vw] py-12 sm:py-16 lg:py-20 pb-0 z-40 relative"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">{pageTitle}</h2>
        <Link
          href={nextPageHref}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
          aria-label={ariaLabel ?? `Go to ${pageTitle} page`}
        >
          <p className="text-sm sm:text-base lg:text-xl">NEXT PAGE</p>
          <div className="flex items-center gap-2">
            <div className="h-[4px] w-[120px] lg:w-[160px] bg-[#34393f] rounded-full relative overflow-hidden">
              <div className="absolute h-full w-[33%] bg-[#ff009e] rounded-full left-0 top-0" />
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
