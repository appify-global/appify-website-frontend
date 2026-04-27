import type { Metadata } from "next";
import Link from "next/link";
import { locations } from "@/data/locations";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 3600;

const TITLE = "Locations — Where Appify Delivers Software & AI Engineering";
const DESCRIPTION =
  "Appify partners with enterprises and startups across Australia, the UAE, and Qatar. Find the team operating in your city — Melbourne, Sydney, Brisbane, Dubai, Abu Dhabi, and Doha.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/locations" },
  openGraph: {
    title: `${TITLE} | Appify`,
    description: DESCRIPTION,
    url: "https://appify.global/locations",
    images: ["/appify.png"],
    type: "website",
  },
};

export default function LocationsIndexPage() {
  const baseUrl = "https://appify.global";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${baseUrl}/locations` },
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
            <span className="text-black">Locations</span>
          </nav>
          <h1 className="font-Aeonik text-[clamp(2rem,4vw,3.5rem)] leading-tight text-black mb-4">
            Where we work
          </h1>
          <p className="font-Aeonik text-[16px] md:text-[18px] text-[rgba(0,0,0,0.7)] max-w-[700px] mb-12">
            {DESCRIPTION}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/locations/${l.slug}`}
                  className="block bg-white rounded-[16px] p-6 hover:shadow-lg transition-shadow h-full group"
                >
                  <p className="font-Aeonik text-[12px] tracking-[0.15em] uppercase text-[rgba(0,0,0,0.4)] mb-2">
                    {l.country}
                  </p>
                  <h2 className="font-Aeonik text-[24px] md:text-[28px] text-black group-hover:text-[#f23084] transition-colors mb-2">
                    {l.name}
                  </h2>
                  <p className="font-Aeonik text-[14px] leading-snug text-[rgba(0,0,0,0.7)] line-clamp-3">
                    {l.tagline}
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
