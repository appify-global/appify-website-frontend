import type { Metadata } from "next";
import { projectsData, getProjectBySlug } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

export async function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project | Appify" };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Appify`,
      description: project.description,
      url: `https://www.appify.global/projects/${slug}`,
      images: [project.imageUrl || "/appify.png"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.imageUrl || "/appify.png"],
    },
  };
}

export default function ProjectPage() {
  return <ProjectDetailClient />;
}
