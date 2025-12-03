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
    <PageLayout navbarPadding="pb-[2vw]">
      {/* Hero Section */}
      <section id="services-hero" className="h-full flex flex-col w-screen">
        <ServicesHero />
      </section>

      {/* Service Categories */}
      <section id="service-categories" className="w-full px-4 lg:px-[5vw] mt-16 lg:mt-24">
        {orderedCategories.map((category, index) => (
          <CategorySection
            key={category.id}
            category={category}
            index={index}
          />
        ))}
      </section>

      {/* Let's Work Together CTA */}
      <section id="services-cta" className="w-full px-4 lg:px-[5vw] mt-16 lg:mt-24">
        <ServicesFooterCTA />
      </section>

      {/* About Us transition section */}
      <section className="w-full px-4 lg:px-[5vw] py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-Aeonik text-xs lg:text-sm uppercase tracking-wider text-[#666] mb-4">
              KEEP SCROLLING TO LEARN MORE
            </p>
            <h3 className="font-Aeonik text-[clamp(2rem,6vw,5rem)] leading-[1]">
              ABOUT US
            </h3>
          </div>
          
          {/* Next page indicator */}
          <div className="flex items-center gap-4 mt-8 lg:mt-0">
            <span className="font-Aeonik text-sm uppercase tracking-wider text-[#666]">
              NEXT PAGE
            </span>
            <div className="w-[180px] h-[6px] bg-[#E4E6EF] rounded-full relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-[60px] bg-[#2B2E3A] rounded-full" />
            </div>
            <svg
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 1L21 10M21 10L12 19M21 10H1"
                stroke="#2B2E3A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Plus icon separator */}
        <div className="flex items-center justify-between w-full mt-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg
              key={i}
              width="21"
              height="21"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 lg:w-5 lg:h-5 ${i > 0 && i < 4 ? 'hidden lg:block' : ''}`}
            >
              <path
                d="M11.7581 0.149597V9.84198H21.4504V11.758H11.7581V21.4504H9.84204V11.758H0.149658V9.84198H9.84204V0.149597H11.7581Z"
                fill="#1B1B1B"
                stroke="black"
                strokeWidth="0.3"
              />
            </svg>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
