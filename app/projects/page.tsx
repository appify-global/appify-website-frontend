import type { Metadata } from "next";

import ProjectCard from "@/components/Featured/ProjectCard";
import { PageLayout } from "@/components/layouts";
import { ServicesFooterCTA } from "@/components/services";
import { projectsData } from "@/data/projects";
import NextPageSection from "@/components/NextPageSection";

export const metadata: Metadata = {
  title: "Projects | Appify",
  description:
    "Browse Appify case studies and projects spanning AI development, product design, app development, and digital transformation.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Appify",
    description:
      "Browse Appify case studies and projects spanning AI development, product design, app development, and digital transformation.",
    url: "https://appify.global/projects",
    images: ["/appify.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Appify",
    description:
      "Browse Appify case studies and projects spanning AI development, product design, app development, and digital transformation.",
    images: ["/appify.png"],
  },
};

export default function ProjectsPage() {
  return (
    <PageLayout
      navbarPadding="pb-[4vw]"
      hideFooterAboutUs={true}
      childrenAfterFooter={
        <NextPageSection
          nextPageHref="/services"
          pageTitle="SERVICES"
          ariaLabel="Go to Services page"
        />
      }
    >
      {/* Hero - same horizontal padding as services/home for alignment */}
      <section
        className="w-full min-w-0 px-[4vw] sm:px-[6vw] lg:px-20 pt-28 sm:pt-32 lg:pt-24 pb-12 sm:pb-16 lg:pb-20"
        aria-labelledby="projects-heading"
      >
        <h1
          id="projects-heading"
          className="font-Aeonik text-[clamp(2.75rem,8vw,6rem)] leading-[1.05] tracking-[-0.02em] mb-6 sm:mb-8"
        >
          Our Projects
        </h1>
        <p className="font-Aeonik text-[clamp(1rem,2vw,1.25rem)] text-[#666] leading-relaxed max-w-2xl">
          Explore our portfolio of innovative projects spanning AI development,
          UI/UX design, app development, and digital transformation.
        </p>
      </section>

      {/* Grid - same padding so content aligns with hero */}
      <section
        className="w-full min-w-0 overflow-x-hidden py-0 pb-16 sm:pb-20 lg:pb-24"
        id="projects-grid"
      >
        <div className="w-full min-w-0 px-[4vw] sm:px-[6vw] lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full">
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
        </div>
      </section>

      {/* Let's Work Together CTA - same as services page, before footer */}
      <section
        id="projects-cta"
        className="w-full min-w-0 px-[4vw] sm:px-[6vw] lg:px-20 mt-10 sm:mt-12 lg:mt-24"
      >
        <ServicesFooterCTA />
      </section>
    </PageLayout>
  );
}
