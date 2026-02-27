"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Featured/Header";
import Skiggle from "@/components/Featured/Skiggle";
import SubVideoText from "@/components/Featured/SubVideoText";
import Hero from "@/components/Hero/Hero";
import ScrollText from "@/components/Navbar/ScrollText";
import { PageLayout } from "@/components/layouts";
import HomeAboutScrollSection from "@/components/HomeAboutScrollSection";

// Below-the-fold sections: load after first paint to speed up initial render
const HomeExpertsSection = dynamic(
  () => import("@/components/home/HomeExpertsSection"),
  { ssr: false, loading: () => <div className="min-h-[50vh]" aria-hidden /> }
);

const HomeFeatureWorkSection = dynamic(
  () => import("@/components/home/HomeFeatureWorkSection"),
  { ssr: false, loading: () => <div className="min-h-[80vh]" aria-hidden /> }
);

const HomeAiSection = dynamic(
  () => import("@/components/home/HomeAiSection"),
  { ssr: false, loading: () => <div className="min-h-[60vh]" aria-hidden /> }
);

export default function Home() {
  const ref = useRef<HTMLElement>(null);

  return (
    <PageLayout
      showParticles={true}
      navbarPadding="pb-[4vw]"
      hideFooterAboutUs={true}
      childrenAfterFooter={<HomeAboutScrollSection />}
    >
      <section
        id="hero-section"
        className="h-full flex flex-col w-full p-[4vw] pt-[14vw] md:pt-[6vw]"
      >
        <Hero />
        <div className="mt-6 sm:mt-10" />
        <ScrollText />
      </section>

      <section
        id="beoynd-visions"
        className="h-auto relative z-20 pt-[4vw] pb-[2vw] overflow-hidden lg:overflow-visible"
        ref={ref}
      >
        <Skiggle ref={ref} />
        <div className="w-full px-[5vw]">
          <Header />
          <SubVideoText ref={ref} />
        </div>
      </section>

      <HomeExpertsSection />
      <HomeFeatureWorkSection />
      <HomeAiSection />
    </PageLayout>
  );
}
