import type { Metadata } from "next";
import { getProjectBySlug } from "@/data/projects";

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}>;

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Appify",
      description: "The requested project could not be found.",
      alternates: { canonical: `/projects/${slug}` },
    };
  }

  const title = `${project.title} | Appify Projects`;
  const description = project.description;
  const image = project.imageUrl || "/appify.png";
  const canonicalPath = `/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: `https://appify.global${canonicalPath}`,
      images: [image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function ProjectLayout({ children }: LayoutProps) {
  return children;
}
