import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocationBySlug, locations } from "@/data/locations";
import { categories, categoryDisplayOrder } from "@/lib/data/services";
import { JsonLd } from "@/components/JsonLd";

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) return { title: "Location" };

  const title = `Custom Software, AI & Digital Transformation in ${location.name}`;
  const description = location.intro;

  return {
    title,
    description,
    keywords: [
      `software development ${location.name}`,
      `AI engineering ${location.name}`,
      `custom software ${location.name}`,
      `digital transformation ${location.name}`,
      `mobile app development ${location.name}`,
      `ERP ${location.name}`,
      `Appify ${location.name}`,
      ...(location.focusIndustries ?? []),
    ],
    alternates: { canonical: `/locations/${location.slug}` },
    openGraph: {
      title: `${title} | Appify`,
      description,
      url: `https://appify.global/locations/${location.slug}`,
      images: ["/appify.png"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/appify.png"],
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const location = getLocationBySlug(city);
  if (!location) notFound();

  const baseUrl = "https://appify.global";
  const cityUrl = `${baseUrl}/locations/${location.slug}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${cityUrl}#localbusiness`,
    name: `Appify — ${location.name}`,
    description: location.intro,
    url: cityUrl,
    image: `${baseUrl}/appify.png`,
    parentOrganization: { "@type": "Organization", name: "Appify", url: baseUrl },
    areaServed: {
      "@type": "City",
      name: location.name,
      ...(location.region ? { containedInPlace: location.region } : {}),
    },
    ...(location.address
      ? {
          address: {
            "@type": "PostalAddress",
            ...(location.address.streetAddress
              ? { streetAddress: location.address.streetAddress }
              : {}),
            addressLocality: location.address.addressLocality,
            ...(location.address.addressRegion
              ? { addressRegion: location.address.addressRegion }
              : {}),
            ...(location.address.postalCode
              ? { postalCode: location.address.postalCode }
              : {}),
            addressCountry: location.address.addressCountry,
          },
        }
      : {}),
    ...(location.geo
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: location.geo.latitude,
            longitude: location.geo.longitude,
          },
        }
      : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${baseUrl}/locations` },
      { "@type": "ListItem", position: 3, name: location.name, item: cityUrl },
    ],
  };

  const orderedCategories = categoryDisplayOrder
    .map((id) => categories.find((c) => c.id === id))
    .filter((c): c is (typeof categories)[number] => Boolean(c));

  return (
    <>
      <JsonLd data={[localBusinessSchema, breadcrumbSchema]} />
      <main className="min-h-screen bg-[#ECEDF3] px-4 md:px-[4vw] pt-[20vw] md:pt-[12vw] lg:pt-[8vw] pb-20">
        <div className="max-w-[1100px] mx-auto">
          <nav aria-label="Breadcrumb" className="font-Aeonik text-[13px] tracking-[0.1em] uppercase text-[rgba(0,0,0,0.5)] mb-6">
            <Link href="/" className="hover:text-black">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-black">Locations</Link>
            <span className="mx-2">/</span>
            <span className="text-black">{location.name}</span>
          </nav>

          <header className="mb-12 md:mb-16">
            <p className="font-Aeonik text-[13px] tracking-[0.15em] uppercase text-[rgba(0,0,0,0.4)] mb-3">
              {location.country}
            </p>
            <h1 className="font-Aeonik text-[clamp(2.25rem,5vw,4rem)] leading-tight text-black mb-6">
              {location.tagline}
            </h1>
            <p className="font-Aeonik text-[17px] md:text-[19px] leading-relaxed text-[rgba(0,0,0,0.8)] max-w-[800px]">
              {location.intro}
            </p>
            {location.focusIndustries && location.focusIndustries.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {location.focusIndustries.map((industry) => (
                  <li
                    key={industry}
                    className="font-Aeonik text-[13px] tracking-[0.05em] px-3 py-1 rounded-full bg-black/5 text-black"
                  >
                    {industry}
                  </li>
                ))}
              </ul>
            )}
          </header>

          <section aria-labelledby="services-heading">
            <h2
              id="services-heading"
              className="font-Aeonik text-[24px] md:text-[32px] text-black mb-8 border-b border-black/10 pb-4"
            >
              Services available in {location.name}
            </h2>
            <div className="space-y-12">
              {orderedCategories.map((cat) => (
                <div key={cat.id}>
                  <h3 className="font-Aeonik text-[20px] md:text-[24px] text-black mb-4">
                    {cat.label}
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.services.map((service) => (
                      <li key={service.id}>
                        <Link
                          href={service.href}
                          className="block font-Aeonik text-[16px] text-black bg-white rounded-[12px] px-4 py-3 hover:shadow-md hover:text-[#f23084] transition-all"
                        >
                          {service.name} in {location.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 pt-10 border-t border-black/10">
            <h2 className="font-Aeonik text-[20px] md:text-[24px] text-black mb-4">
              Get in touch
            </h2>
            <p className="font-Aeonik text-[16px] text-[rgba(0,0,0,0.7)] max-w-[700px]">
              Talk to the team about your {location.name} project — write to{" "}
              <a
                href="mailto:hello@appify.global"
                className="text-black underline hover:text-[#f23084]"
              >
                hello@appify.global
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
