"use client";

import { useRef } from "react";
import ProjectCard from "@/components/Featured/ProjectCard";
import FeatureWorkHeader from "@/components/Featured/FeatureWorkHeader";
import DotButton from "@/components/ui/DotButton";
import { projectsData } from "@/data/projects";

export default function HomeFeatureWorkSection() {
  const gridRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={gridRef}
      className="h-auto relative z-40 mt-16 sm:mt-24 md:mt-16 lg:mt-[100vh] min-w-0 overflow-x-hidden bg-[var(--color-background,#F0F1FA)]"
      id="feature-work"
    >
      <div className="w-full min-w-0 px-[4vw]">
        <FeatureWorkHeader />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 relative z-40 w-full min-w-0 px-4 sm:px-6 lg:px-20 mt-6 md:mt-8 lg:mt-36">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            metadata={project.metadata}
            imageUrl={project.imageUrl}
            linkUrl={project.linkUrl}
            priority={index < 2}
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
  );
}
