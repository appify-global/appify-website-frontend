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
