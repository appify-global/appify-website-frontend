"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowRight, FaHeart } from "react-icons/fa";

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

const Footer = () => {
    const [times, setTimes] = useState<Record<string, string>>({});

    const updateTimes = () => {
        const updated: Record<string, string> = {};
        cities.forEach((c) => {
            const now = new Date();
            const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
            updated[c.name] = new Intl.DateTimeFormat("en-US", { ...opts, timeZone: c.tz }).format(now);
        });
        setTimes(updated);
    };

    useEffect(() => {
        updateTimes();
        const t = setInterval(updateTimes, 60_000);
        return () => clearInterval(t);
    }, []);

    return (
        <footer className="w-full font-Aeonik">
            {/* MAIN AREA */}
            <div
                className="bg-white text-black px-[4vw] pt-20 lg:pt-48
               grid grid-cols-1 md:grid-cols-[320px_1fr] gap-8"
                aria-label="Footer main area"
            >

                {/* LEFT: address */}
                <div className="order-2 md:order-1 md:mb-20">
                    <div className="max-w-[220px] font-Aeonik text-xl">
                        <p className="font-medium mb-1">Level 2</p>
                        <p>696 Bourke Street,</p>
                        <p>Melbourne VIC,</p>
                        <p>Australia</p>
                    </div>
                </div>

                {/* RIGHT SIDE — now aligned correctly */}
                <div className="order-1 md:order-2 md:pl-12">
                    <div className="grid grid-cols-1 md:grid-cols-[0.35fr_0.65fr] gap-11 items-start">

                        {/* LINKS + EMAILS */}
                        <div className="order-2 md:order-1">
                            <ul className="space-y-2 text-xl mb-6 lg:mb-12">
                                <li className="cursor-pointer">Youtube</li>
                                <li className="cursor-pointer">Instagram</li>
                                <li className="cursor-pointer">Linkedin</li>
                            </ul>

                            <div className="mb-4 lg:mb-12   ">
                                <p className="text-xl font-medium mb-1">General enquiries</p>
                                <p className="text-xl">hello@appify.global</p>
                            </div>

                            <div className="lg:mb-12   ">
                                <p className="text-xl font-medium mb-1">Support enquiries</p>
                                <p className="text-xl">support@appify.global</p>
                            </div>
                        </div>

                        {/* PARTNER FORM — now starts from the left edge correctly */}
                        <div className="order-1 md:order-2">
                            <div className="md:pr-0 lg:pr-28">
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-normal mb-6">
                                    Partner with <br /> our team
                                </h2>

                                <form className="w-full" onSubmit={(e) => e.preventDefault()}>
                                    <div className="flex items-center w-full bg-[#f6f6fb] rounded-lg overflow-hidden border border-transparent">
                                        <input
                                            type="email"
                                            placeholder="Your email"
                                            required
                                            className="flex-1 px-4 py-3 text-xl sm:text-base bg-transparent focus:outline-none"
                                        />
                                        <button type="submit" className="px-4 py-3">
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
            <div className="bg-white text-black px-[4vw] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-12">
                <div className="flex items-center gap-4 justify-between w-full sm:w-auto">
                    <p className="text-md">©{new Date().getFullYear()} Appify Design Studio</p>
                </div>

                <div className="flex-1 flex items-center justify-center gap-6 flex-wrap">
                    {/* hide flags on very small screens to reduce clutter */}
                    <div className="text-md hidden xs:hidden sm:flex gap-4 items-center flex-wrap">
                        {cities.map((c) => (
                            <span key={c.name} className="whitespace-nowrap text-md">
                                {c.flag} {c.name} {times[c.name] || "--:--"}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3 justify-end w-full sm:w-auto">
                    <div className="flex items-center gap-2 text-md md:text-xl">
                        <span className="hidden sm:inline">Built by Appify with</span>
                        <FaHeart className="text-red-500" />
                    </div>

                    <div className="md:relative">
                        <div className="hidden md:block absolute -right-10 -top-10">
                            <ScrollToTopButton />
                        </div>
                        <div className="block md:hidden">
                            <ScrollToTopButton />
                        </div>
                    </div>
                </div>
            </div>

            {/* BLACK ABOUT US SECTION */}
            <div className="bg-black text-white px-6 md:px-16 lg:px-24 py-20 relative">
                <div className="text-xl text-gray-400 mb-6">KEEP SCROLLING TO LEARN MORE</div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <h2 className="text-3xl md:text-4xl font-light mb-6 md:mb-0">ABOUT US</h2>

                    <div className="flex items-center gap-3">
                        <p className="text-xl">NEXT PAGE</p>
                        <div className="w-12 h-[2px] bg-pink-500" />
                        <FaArrowRight size={14} />
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-8 mt-12 text-center text-lg opacity-90">
                    <span>+</span>
                    <span>+</span>
                    <span>+</span>
                    <span>+</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
