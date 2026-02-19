"use client";

import { PageLayout } from "@/components/layouts";

import AboutHero from "@/components/About/AboutHero";
import AboutIntro from "@/components/About/AboutIntro";
import TeamDescription from "@/components/About/TeamDescription";
import TeamMember from "@/components/About/TeamMember";
import ClientsSection from "@/components/About/ClientsSection";
import AwardsSection from "@/components/About/AwardsSection";
import ExpertiseSection from "@/components/About/ExpertiseSection";
import CTASection from "@/components/About/CTASection";

export default function AboutPage() {
  return (
    <PageLayout navbarPadding="pb-[2vw]" backgroundColor="bg-black">
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

      {/* Clients Section */}
      <section id="clients" className="w-full">
        <ClientsSection />
      </section>

      {/* Plus Icons Separator */}
      <section className="w-full bg-black pt-[20px] pb-[20px] lg:pt-[30px] lg:pb-[30px]">
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
      <section id="awards" className="w-full">
        <AwardsSection />
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="w-full">
        <ExpertiseSection />
      </section>

      {/* CTA Section - "Let's work together" */}
      <section id="cta" className="w-full">
        <CTASection />
      </section>
    </PageLayout>
  );
}
