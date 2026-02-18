"use client";

import { PageLayout } from "@/components/layouts";
import { ServicesHero, CategorySection, ServicesFooterCTA } from "@/components/services";
import { categoryDisplayOrder, getCategoryById } from "@/lib/data/services";

export default function ServicesPage() {
  // Get categories in display order
  const orderedCategories = categoryDisplayOrder
    .map((id) => getCategoryById(id))
    .filter((cat): cat is NonNullable<typeof cat> => cat !== undefined);

  return (
    <PageLayout navbarPadding="pb-[4vw]">
      {/* Hero Section */}
      <section id="services-hero" className="h-full flex flex-col w-full">
        <ServicesHero />
      </section>

      {/* Service Categories */}
      <section id="service-categories" className="w-full px-[4vw] sm:px-[6vw] lg:px-[5vw] mt-10 sm:mt-12 lg:mt-16">
        {orderedCategories.map((category, index) => (
          <CategorySection
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </section>

      {/* Let's Work Together CTA */}
      <section id="services-cta" className="w-full px-[4vw] sm:px-[6vw] lg:px-[5vw] mt-10 sm:mt-12 lg:mt-24">
        <ServicesFooterCTA />
      </section>

    </PageLayout>
  );
}
