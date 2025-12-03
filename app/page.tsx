"use client";
import { useRef } from "react";
import Header from "@/components/Featured/Header";
import HeaderExpert from "@/components/Featured/HeaderExpert";
import HeaderAi from "@/components/Featured/Hero-Ai";
import ProjectCard from "@/components/Featured/ProjectCard";
import Skiggle from "@/components/Featured/Skiggle";
import SkiggleAi from "@/components/Featured/SkiggleAi";
import SubVideoText from "@/components/Featured/SubVideoText";
import Hero from "@/components/Hero/Hero";
import ScrollText from "@/components/Navbar/ScrollText";
import FloatingCards from "@/components/Featured/ServiceCard";
import dynamic from "next/dynamic";
import SubVideoTextAi from "@/components/Featured/SubVideoAi";
import FeatureWorkHeader from "@/components/Featured/FeatureWorkHeader";
import { projectsData } from "@/data/projects";
import DotButton from "@/components/ui/DotButton";
import { PageLayout } from "@/components/layouts";

const SkiggleDrop = dynamic(
  () => import("../components/Featured/SkiggleDrop"),
  { ssr: false }
);

export default function Home() {
  const ref = useRef<HTMLElement>(null);
  const aiRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);

  return (
    <PageLayout showParticles={true} navbarPadding="pb-[4vw]">
      <section
        id="hero-section"
        className="h-full flex flex-col w-screen p-[4vw]"
      >
        <Hero />
        <div className="mt-10" />
        <ScrollText />
      </section>

      <section
        id="beoynd-visions"
        className="h-auto relative z-20 pt-[4vw] pb-[2vw]"
        ref={ref}
        style={{ overflow: 'visible' }}
      >
        <Skiggle ref={ref} />
        <div className="w-screen" style={{ paddingLeft: '5vw', paddingRight: '5vw', overflow: 'visible' }}>
          <Header />
          <SubVideoText ref={ref} />
        </div>
      </section>

      <section
        className="h-auto lg:h-[200vh] relative z-40 py-[4vw]"
        id="experts-section"
      >
        <SkiggleDrop />

        <div className="w-screen px-[4vw]">
          <HeaderExpert />
        </div>

        <div className="w-full px-[4vw]">
          <FloatingCards />
        </div>
      </section>

      <section
        ref={gridRef}
        className="h-auto relative z-40 lg:mt-0"
        id="feature-work"
      >
        <div className="w-screen px-[4vw]">
          <FeatureWorkHeader />
        </div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 relative z-40 w-screen px-6 lg:px-20 mt-2 lg:mt-24"
        >
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              metadata={project.metadata}
              imageUrl={project.imageUrl}
              linkUrl={project.linkUrl}
            />
          ))}
        </div>

        <div className="flex justify-center w-full mt-[2rem] lg:mt-[5rem]">
          <DotButton
            text="SEE ALL PROJECTS"
            variant="white"
            className="see-all-projects-btn"
            href="/projects"
          />
        </div>
      </section>

      <section
        className="h-auto lg:h-[180vh] relative mt-[5rem] lg:mt-[15rem] z-40 w-full"
        ref={aiRef}
      >
        <SkiggleAi />
        <div className="w-screen px-[4vw]">
          <HeaderAi />
          <SubVideoTextAi ref={aiRef} />
        </div>
      </section>
    </PageLayout>
  );
}
