"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { PageLayout } from "@/components/layouts";
import { Service, ServicePageContent } from "@/lib/data/services";
import { useLenis, useLenisReady } from "@/hooks/useLenis";
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
  const lenis = useLenis();
  const lenisReady = useLenisReady();
  const pathname = usePathname();

  // Scroll to top when page loads - aggressive approach to prevent mid-page loading
  useEffect(() => {
    let isActive = true;
    const duration = 1000; // Keep forcing scroll to top for 1 second

    const forceScrollToTop = () => {
      if (!isActive) return;
      
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }
    };

    // Immediate scroll
    forceScrollToTop();
    
    // Use Lenis to scroll to top when it's ready
    if (lenisReady && lenis) {
      lenis.scrollTo(0, { immediate: true });
    }

    // Continuously force scroll to top during initial load period
    const intervalId = setInterval(forceScrollToTop, 50); // Every 50ms

    // Multiple delayed attempts to ensure scroll stays at top
    // This handles cases where components cause layout shifts after mount
    const timeouts = [
      setTimeout(forceScrollToTop, 100),
      setTimeout(forceScrollToTop, 200),
      setTimeout(forceScrollToTop, 300),
      setTimeout(forceScrollToTop, 400),
      setTimeout(forceScrollToTop, 500),
      setTimeout(forceScrollToTop, 600),
      setTimeout(forceScrollToTop, 700),
      setTimeout(forceScrollToTop, 800),
      setTimeout(() => {
        forceScrollToTop();
        isActive = false; // Stop forcing after duration
        clearInterval(intervalId);
      }, duration),
    ];

    // Also use requestAnimationFrame for next frame
    const rafId = requestAnimationFrame(forceScrollToTop);
    const rafId2 = requestAnimationFrame(() => {
      requestAnimationFrame(forceScrollToTop);
    });

    return () => {
      isActive = false;
      clearInterval(intervalId);
      timeouts.forEach(clearTimeout);
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(rafId2);
    };
  }, [lenis, lenisReady, pathname]);

  // Check if this is the last service (custom-ai-models)
  const isLastService = service.slug === 'custom-ai-models';

  return (
    <PageLayout
      navbarPadding="pb-[4vw]"
      showBackButton
      backHref="/services"
      hideFooterAboutUs={true}
      childrenAfterFooter={
        <>
          {/* Footer navigation - shows next service or ABOUT US for last service */}
          {isLastService ? (
            <ServiceFooterNav showAboutUs={true} />
          ) : content.nextService ? (
            <ServiceFooterNav nextService={content.nextService} />
          ) : null}
        </>
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
    </PageLayout>
  );
}
