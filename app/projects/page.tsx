"use client";
import ProjectCard from "@/components/Featured/ProjectCard";
import { PageLayout } from "@/components/layouts";
import { projectsData } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <PageLayout navbarPadding="pb-[4vw]">
      <section className="h-full flex flex-col w-screen p-[4vw] pt-[8vw]">
        <h1 className="font-Aeonik text-[clamp(3rem,8vw,8rem)] leading-tight mb-8">
          Our Projects
        </h1>
        <p className="font-Aeonik text-[clamp(1rem,2vw,1.5rem)] text-[#666] mb-12 max-w-3xl">
          Explore our portfolio of innovative projects spanning AI development, 
          UI/UX design, app development, and digital transformation.
        </p>
      </section>

      <section className="h-auto relative z-40 py-[4vw]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 relative z-40 w-screen px-6 lg:px-20">
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
      </section>
    </PageLayout>
  );
}
