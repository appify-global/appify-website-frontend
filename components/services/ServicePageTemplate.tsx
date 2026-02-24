"use client";
import { PageLayout } from "@/components/layouts";
import ScrollToNextInvisible from "@/components/ScrollToNextInvisible";
import { Service, ServicePageContent } from "@/lib/data/services";
import ServiceHero from "./ServiceHero";
import ServiceExperience from "./ServiceExperience";
import ServiceOfferings from "./ServiceOfferings";
import ServiceProcess from "./ServiceProcess";
import ServiceFAQ from "./ServiceFAQ";
import ServiceCTA from "./ServiceCTA";
import ServiceFooterNav from "./ServiceFooterNav";

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
  // Check if this is the last service (custom-ai-models)
  const isLastService = service.slug === 'custom-ai-models';
  const nextPageHref = isLastService
    ? "/about"
    : content.nextService
      ? `/services/${content.nextService.category}/${content.nextService.slug}`
      : null;

  return (
    <PageLayout
      navbarPadding="pb-[4vw]"
      showBackButton
      backHref="/services"
      hideFooterAboutUs={true}
      childrenAfterFooter={
        nextPageHref ? <ScrollToNextInvisible nextPageHref={nextPageHref} /> : null
      }
    >
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

      {/* Footer navigation - shows next service or ABOUT US for last service */}
      {isLastService ? (
        <ServiceFooterNav showAboutUs={true} />
      ) : content.nextService ? (
        <ServiceFooterNav nextService={content.nextService} />
      ) : null}
    </PageLayout>
  );
}
