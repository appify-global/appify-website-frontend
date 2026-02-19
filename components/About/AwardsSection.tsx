"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// Awards data
const awardsData = [
  {
    organization: "Awwwards",
    awards: [
      { count: "001", name: "Site of the Year" },
      { count: "001", name: "Developer Site of the Year" },
      { count: "001", name: "Site of the Month" },
      { count: "010", name: "Site of the Day" },
      { count: "016", name: "Honorable Mention" },
    ],
  },
  {
    organization: "FWA",
    awards: [
      { count: "001", name: "Site of the Year" },
      { count: "002", name: "Site of the Month" },
      { count: "017", name: "Site of the Day" },
    ],
  },
  {
    organization: "CSSDA",
    awards: [
      { count: "001", name: "Site of the Year" },
      { count: "001", name: "Agency Site of the Year" },
    ],
  },
  {
    organization: "Webby Awards",
    awards: [
      { count: "002", name: "Webby Winner" },
      { count: "002", name: "Webby Nominee" },
    ],
  },
  {
    organization: "Lovie Awards",
    awards: [{ count: "001", name: "Lovie Winner" }],
  },
  {
    organization: "Drum Awards",
    awards: [{ count: "001", name: "The Drum Awards for Design" }],
  },
  {
    organization: "Comm Arts",
    awards: [{ count: "001", name: "Best-in-show Interactive" }],
  },
];

// Articles data
const articlesData = [
  { title: "Porche Newsroom - Driven By Dream" },
  { title: "Wallpaper - Driven by Dream" },
  { title: "Opera North - The Turn of the Screw" },
];

// Talks data
const talksData = [
  { 
    event: "FRWRDx", 
    location: "Dec 2025 Dubai", 
    link: "https://www.linkedin.com/posts/mennan-yelkenci_frwrdx-foundersupport-uaestartupcommunity-activity-7412263036276895744-eULj/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADEEUk8B5-EP02wHXlhflK9PuUd7nYa80q8" 
  },
  { 
    event: "Everything AI in Travel", 
    location: "Oct 2025 Melbourne", 
    link: "https://www.linkedin.com/pulse/mennan-yelkenci-isnt-afraid-take-swing-big-prize-trave-tony-carne-y3gtc/?trackingId=UCQ4dJoHIRgs2VqzWtQQQA%3D%3D" 
  },
  { 
    event: "Beyond the buzz", 
    location: "Aug 2025 Brisbane", 
    link: "https://www.linkedin.com/posts/bttb2025-bttb2025-travelai-ugcPost-7359106313575915521-sMdt/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADEEUk8B5-EP02wHXlhflK9PuUd7nYa80q8" 
  },
  { 
    event: "Travel Tech Innovation", 
    location: "Sep 2025 Melbourne", 
    link: "https://www.linkedin.com/posts/mennan-yelkenci_great-few-days-with-the-booked-ai-scalerr-activity-7375661354692780033-7TJJ/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADEEUk8B5-EP02wHXlhflK9PuUd7nYa80q8" 
  },
  { 
    event: "More than Money", 
    location: "Feb 2025 Sydney", 
    link: "https://www.linkedin.com/posts/ravi-sharma-buyer%E2%80%99s-agency-of-the-year-finalist-95b8b849_revolutionising-travel-with-the-worlds-first-share-7292785009617182720-lybz/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADEEUk8B5-EP02wHXlhflK9PuUd7nYa80q8" 
  },
];

// Trophy icon component
const TrophyIcon = ({ className = "" }: { className?: string }) => (
  <svg
    width="42"
    height="41"
    viewBox="0 0 42 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M21 30.5V36M14 41H28M7 4H3C2.44772 4 2 4.44772 2 5V12C2 17.5228 6.47715 22 12 22H14M35 4H39C39.5523 4 40 4.44772 40 5V12C40 17.5228 35.5228 22 30 22H28M14 4H28V18C28 23.5228 23.5228 28 18 28H24C18.4772 28 14 23.5228 14 18V4Z"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Circle number badge
const CircleBadge = ({ number, className = "" }: { number: string; className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="w-[44px] h-[44px] rounded-full border border-white/30 flex items-center justify-center">
      <TrophyIcon className="w-6 h-6 text-white/60" />
    </div>
    <span className="font-mono text-[22px] text-white">{number}</span>
  </div>
);

const AwardsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0
      );
    }

    if (tableRef.current) {
      tl.fromTo(
        tableRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
        },
        0.3
      );
    }
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full bg-black overflow-hidden">
      {/* Large background text - AWARD WINNING */}
      <div className="relative min-h-[40vh] sm:min-h-[50vh] lg:min-h-[740px] overflow-hidden py-[6vh] sm:py-[8vh] lg:py-[112px]">
        {/* Background animated text */}
        <div className="absolute inset-0 flex flex-col justify-center items-start overflow-hidden pointer-events-none">
          <div className="whitespace-nowrap">
            <span className="font-Aeonik text-[15vw] lg:text-[105px] text-transparent bg-clip-text bg-gradient-to-r from-white/5 to-white/10 tracking-[0.03em]">
              AWARD
            </span>
          </div>
          <div className="whitespace-nowrap -mt-[2vw] lg:-mt-4 ml-[10vw] lg:ml-[114px]">
            <span className="font-Aeonik text-[15vw] lg:text-[105px] italic text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/5 tracking-[0.03em]">
              WINNING
            </span>
          </div>
          <div className="whitespace-nowrap -mt-[2vw] lg:-mt-4">
            <span className="font-Aeonik text-[15vw] lg:text-[105px] text-transparent bg-clip-text bg-gradient-to-r from-white/5 to-white/10 tracking-[0.03em]">
              AWARD
            </span>
          </div>
          <div className="whitespace-nowrap -mt-[2vw] lg:-mt-4 ml-[20vw] lg:ml-[194px]">
            <span className="font-Aeonik text-[15vw] lg:text-[105px] text-transparent bg-clip-text bg-gradient-to-r from-white/5 to-white/10 tracking-[0.03em]">
              AWARD
            </span>
          </div>
          <div className="whitespace-nowrap -mt-[2vw] lg:-mt-4 ml-[5vw] lg:ml-[180px]">
            <span className="font-Aeonik text-[13vw] lg:text-[92px] italic text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-white/5 tracking-[0.03em]">
              CREATIVE
            </span>
          </div>
          <div className="whitespace-nowrap -mt-[2vw] lg:-mt-4 ml-[25vw] lg:ml-[271px]">
            <span className="font-Aeonik text-[13vw] lg:text-[92px] text-transparent bg-clip-text bg-gradient-to-r from-white/5 to-white/10 tracking-[0.03em]">
              STUDIO
            </span>
          </div>
        </div>

        {/* Title and count */}
        <div className="relative z-10 px-[6vw] lg:px-[5vw]">
          <div className="flex items-center justify-between">
            <h2
              ref={titleRef}
              className="font-Aeonik text-[12vw] lg:text-[45px] leading-[1.1] text-white"
            >
              AWARDS
            </h2>
            <CircleBadge number="58" className="hidden lg:flex" />
          </div>
        </div>
      </div>

      {/* Awards table */}
      <div
        ref={tableRef}
        className="relative z-10 px-[4vw] lg:px-[10px] pb-[30px] sm:pb-[50px] lg:pb-[100px]"
      >
        {awardsData.map((category, idx) => (
          <div
            key={idx}
            className="border-t border-white/10 py-[15px] lg:py-[18px]"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-[49px] px-[2vw] lg:px-[15px]">
              {/* Organization name */}
              <div className="w-full lg:w-[98px] shrink-0">
                <span className="font-Aeonik text-[14px] text-white">
                  {category.organization}
                </span>
              </div>

              {/* Awards list */}
              <div className="flex flex-col gap-[10px] flex-1">
                {category.awards.map((award, awardIdx) => (
                  <div
                    key={awardIdx}
                    className="flex items-center gap-[40px]"
                  >
                    <span className="font-mono text-[14px] text-white/80 w-[46px]">
                      {award.count}
                    </span>
                    <span className="font-Aeonik text-[14px] text-white">
                      {award.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-white/10" />
      </div>

      {/* Articles section */}
      <div className="relative z-10 px-[6vw] lg:px-[5vw] py-[40px] lg:py-[76px]">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <h3 className="font-Aeonik text-[10vw] lg:text-[45px] leading-[1.1] text-white mb-[30px] lg:mb-0">
            ARTICLES
          </h3>
          <div className="lg:max-w-[806px] space-y-[12px]">
            {articlesData.map((article, idx) => (
              <div key={idx} className="flex items-center">
                <span className="font-Aeonik text-[13px] sm:text-[14px] lg:text-[16px] text-white w-[140px] sm:w-[200px] lg:w-[305px]">
                  {article.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Talks section */}
      <div className="relative z-10 px-[6vw] lg:px-[5vw] py-[40px] lg:py-[76px] border-t border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-4 mb-[30px] lg:mb-0">
            <h3 className="font-Aeonik text-[10vw] lg:text-[45px] leading-[1.1] text-white">
              TALKS
            </h3>
            <CircleBadge number="5" className="lg:hidden" />
          </div>

          <div className="lg:max-w-[806px] space-y-[12px]">
            {talksData.map((talk, idx) => {
              const content = (
                <div
                  className={`flex justify-between items-center gap-4 ${
                    talk.link ? "cursor-pointer hover:opacity-80 transition-opacity" : ""
                  }`}
                >
                  <span className="font-Aeonik text-[13px] sm:text-[14px] lg:text-[16px] text-white w-[140px] sm:w-[200px] lg:w-[305px]">
                    {talk.event}
                  </span>
                  <span className="font-Aeonik text-[14px] lg:text-[16px] text-white/60">
                    {talk.location}
                  </span>
                </div>
              );

              return talk.link ? (
                <a
                  key={idx}
                  href={talk.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              ) : (
                <div key={idx}>{content}</div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AwardsSection;

