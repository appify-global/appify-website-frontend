"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { PageLayout } from "@/components/layouts";

import AboutHero from "@/components/About/AboutHero";
import AboutIntro from "@/components/About/AboutIntro";
import TeamDescription from "@/components/About/TeamDescription";
import TeamMember from "@/components/About/TeamMember";
import ClientsSection from "@/components/About/ClientsSection";
import AwardsSection from "@/components/About/AwardsSection";
import ExpertiseSection from "@/components/About/ExpertiseSection";
import CTASection from "@/components/About/CTASection";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const bgRef = useRef<HTMLDivElement>(null);
  const clientsSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!bgRef.current || !clientsSectionRef.current) return;

    // Animate background opacity when Clients section comes into view
    gsap.to(bgRef.current, {
      opacity: 0,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: clientsSectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === clientsSectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <PageLayout navbarPadding="pb-[2vw]" backgroundColor="bg-transparent">
      {/* Fixed background - fades out when Clients section appears */}
      {/* Background sits above black bg but behind text */}
      <div
        ref={bgRef}
        className="fixed inset-0 z-[1] bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: 'url(/team_bg.png)',
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Content wrapper with relative positioning - above background image */}
      <div className="relative z-10">
        {/* Hero Section - "About Us" */}
        <section id="about-hero" className="w-full">
          <AboutHero />
        </section>

        {/* Introduction Section - "WE ARE APPIFY" */}
        <section id="about-intro" className="w-full">
          <AboutIntro />
        </section>

        {/* Team Description Section */}
        <section id="team-description" className="w-full">
          <TeamDescription />
        </section>

        {/* Team Member Spotlight */}
        <section id="team-member" className="w-full">
          <TeamMember />
        </section>
      </div>

      {/* Clients Section */}
      <section id="clients" ref={clientsSectionRef} className="w-full relative z-10">
        <ClientsSection />
      </section>

      {/* Plus Icons Separator */}
      <section className="w-full bg-black pt-[20px] pb-[20px] lg:pt-[30px] lg:pb-[30px] relative z-10">
        <div className="px-[4vw] sm:px-[6vw] lg:px-[5vw]">
          <div className="flex items-center justify-between w-full">
            {[0, 1, 2, 3].map((i) => (
              <svg
                key={i}
                width="21"
                height="21"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 lg:w-5 lg:h-5 text-white/60"
              >
                <path
                  d="M11.7581 0.149597V9.84198H21.4504V11.758H11.7581V21.4504H9.84204V11.758H0.149658V9.84198H9.84204V0.149597H11.7581Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.3"
                />
              </svg>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section (awards table hidden, articles and talks visible) */}
      <section id="awards" className="w-full relative z-10">
        <AwardsSection />
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="w-full relative z-10">
        <ExpertiseSection />
      </section>

      {/* CTA Section - "Let's work together" */}
      <section id="cta" className="w-full relative z-10">
        <CTASection />
      </section>
    </PageLayout>
  );
}
