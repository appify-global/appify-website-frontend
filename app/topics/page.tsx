import type { Metadata } from "next";
import Link from "next/link";
import { topics } from "@/data/topics";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 3600;

const TITLE = "Topics — Browse Insights by Subject | Appify";
const DESCRIPTION =
  "Browse Appify's writing by topic — AI engineering, custom software development, automation, digital transformation, mobile apps, and product design.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/topics" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.appify.global/topics",
    images: ["/appify.png"],
    type: "website",
  },
};

export default function TopicsIndexPage() {
  const baseUrl = "https://www.appify.global";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Topics", item: `${baseUrl}/topics` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main className="min-h-screen bg-[#ECEDF3] px-4 md:px-[4vw] pt-[20vw] md:pt-[12vw] lg:pt-[8vw] pb-20">
        <div className="max-w-[1100px] mx-auto">
          <nav aria-label="Breadcrumb" className="font-Aeonik text-[13px] tracking-[0.1em] uppercase text-[rgba(0,0,0,0.5)] mb-6">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-black">Topics</span>
          </nav>
          <h1 className="font-Aeonik text-[clamp(2rem,4vw,3.5rem)] leading-tight text-black mb-4">
            Topics
          </h1>
          <p className="font-Aeonik text-[16px] md:text-[18px] text-[rgba(0,0,0,0.7)] max-w-[700px] mb-12">
            {DESCRIPTION}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/topics/${t.slug}`}
                  className="block bg-white rounded-[16px] p-6 hover:shadow-lg transition-shadow h-full group"
                >
                  <h2 className="font-Aeonik text-[22px] md:text-[24px] text-black group-hover:text-[#f23084] transition-colors mb-2">
                    {t.name}
                  </h2>
                  <p className="font-Aeonik text-[14px] leading-snug text-[rgba(0,0,0,0.7)] line-clamp-3">
                    {t.tagline}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
