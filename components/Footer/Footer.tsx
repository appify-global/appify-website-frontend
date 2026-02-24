"use client";
import React, { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowUp, FaArrowRight, FaHeart } from "react-icons/fa";

// Right arrow icon (matching ServiceFooterNav style)
const RightArrowIcon: React.FC = () => (
  <svg
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-white"
  >
    <path
      d="M1 8H19M19 8L12 1M19 8L12 15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const cities = [
    { name: "Melbourne", flag: "🇦🇺", tz: "Australia/Melbourne" },
    { name: "San Francisco", flag: "🇺🇸", tz: "America/Los_Angeles" },
    { name: "Sri Lanka", flag: "🇱🇰", tz: "Asia/Colombo" },
    { name: "Dubai", flag: "🇦🇪", tz: "Asia/Dubai" },
];

function ScrollToTopButton() {
    const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
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

// Compute times only on client to avoid server/client hydration mismatch
const computeTimes = () => {
    if (typeof window === "undefined") return {} as Record<string, string>;
    const updated: Record<string, string> = {};
    cities.forEach((c) => {
        const now = new Date();
        const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
        updated[c.name] = new Intl.DateTimeFormat("en-US", { ...opts, timeZone: c.tz }).format(now);
    });
    return updated;
};

interface FooterProps {
    hideAboutUsSection?: boolean;
}

const SCROLL_THRESHOLD = 3000; // Total scroll distance needed to fill progress bar (in pixels) - ~5% per scroll

const Footer = ({ hideAboutUsSection = false }: FooterProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const isAboutPage = pathname === "/about";
    // Start with empty so server and client match; fill in useEffect to avoid hydration mismatch
    const [times, setTimes] = useState<Record<string, string>>(() => ({}));
    const aboutSectionRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const sectionInViewRef = useRef(false);
    const scrollProgressRef = useRef(0);
    const hasNavigatedRef = useRef(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setTimes(computeTimes());
        const t = setInterval(() => setTimes(computeTimes()), 60_000);
        return () => clearInterval(t);
    }, []);

    // Track when ABOUT US section enters viewport
    useEffect(() => {
        if (hideAboutUsSection) return;
        const section = aboutSectionRef.current;
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
    }, [hideAboutUsSection]);

    // Track scroll progress and update progress bar
    useEffect(() => {
        if (hideAboutUsSection) return;

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
                const nextHref = isAboutPage ? "/projects" : "/about";
                // Use window.location for full page reload to ensure scroll reset
                window.location.href = nextHref;
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [hideAboutUsSection, isAboutPage, router]);

    return (
        <footer className="w-full font-Aeonik">
            {/* MAIN AREA */}
            <div
                className="bg-white text-black px-[4vw] pt-12 sm:pt-16 lg:pt-48
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
                                    <div className="flex items-center w-full bg-[#f6f6fb] rounded-lg overflow-hidden border border-transparent">
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
            <div className="bg-white text-black px-[4vw] py-8 sm:py-12">
                {/* City times - visible on tablet and up */}
                <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 flex-wrap mb-6">
                    {cities.map((c) => (
                        <span key={c.name} className="whitespace-nowrap text-sm lg:text-base">
                            {c.flag} {c.name} {times[c.name] || "--:--"}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm sm:text-base">©{new Date().getFullYear()} Appify Design Studio</p>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm sm:text-base">
                            <span className="hidden sm:inline">Built by Appify with</span>
                            <FaHeart className="text-red-500" />
                        </div>
                        <ScrollToTopButton />
                    </div>
                </div>
            </div>

            {/* BLACK ABOUT US SECTION */}
            {!hideAboutUsSection && (
                <div ref={aboutSectionRef} className="bg-black text-white px-[4vw] py-12 sm:py-16 lg:py-20 pb-0">
                    <div className="text-xs sm:text-sm lg:text-xl text-gray-400 mb-4 sm:mb-6 tracking-wide">KEEP SCROLLING TO LEARN MORE</div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                        {isAboutPage ? (
                            <Link href="/projects">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light hover:text-[#ff009e] transition-colors">PROJECTS</h2>
                            </Link>
                        ) : (
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">ABOUT US</h2>
                        )}

                        <div className="flex items-center gap-3">
                            <p className="text-sm sm:text-base lg:text-xl">NEXT PAGE</p>
                            <div className="flex items-center gap-2">
                                <div className="h-[4px] w-[120px] lg:w-[160px] bg-[#34393f] rounded-full relative overflow-hidden">
                                    <div
                                        ref={progressBarRef}
                                        className="absolute h-full bg-[#ff009e] rounded-full left-0 top-0 transition-all duration-150 ease-out"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <RightArrowIcon />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 text-center text-sm sm:text-base lg:text-lg opacity-90">
                        <span>+</span>
                        <span>+</span>
                        <span>+</span>
                        <span>+</span>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;
