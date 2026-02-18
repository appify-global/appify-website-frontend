"use client";
import { PageLayout } from "@/components/layouts";
import { Service, ServicePageContent } from "@/lib/data/services";
import ServiceHero from "./ServiceHero";
import ServiceExperience from "./ServiceExperience";
import ServiceOfferings from "./ServiceOfferings";
import ServiceProcess from "./ServiceProcess";
import ServiceFAQ from "./ServiceFAQ";
import ServiceCTA from "./ServiceCTA";

interface ServicePageTemplateProps {
  service: Service;
  content: ServicePageContent;
}

/**
 * ServicePageTemplate - Reusable template for individual service pages
 * 
 * Uses PageLayout for consistent scrolling, navigation, and footer behavior.
 * Each section is self-contained and can be edited without affecting other pages.
 */
export default function ServicePageTemplate({ service, content }: ServicePageTemplateProps) {
  return (
    <PageLayout navbarPadding="pb-[4vw]">
      <ServiceHero
        title={service.name}
        subtitle={content.heroSubtitle}
        heroImage={content.heroImage}
      />

      <ServiceExperience
        tagline={content.experienceTagline}
        description={content.experienceDescription}
      />

      <ServiceOfferings
        subtitle={content.whatWeDoSubtitle}
        offerings={content.offerings}
      />

      <ServiceProcess
        subtitle={content.processSubtitle}
        steps={content.processSteps}
      />

      <ServiceFAQ faqs={content.faqs} />

      <ServiceCTA />
    </PageLayout>
  );
}
