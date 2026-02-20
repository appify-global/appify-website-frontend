"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import { getProjectBySlug, projectsData } from "@/data/projects";
import initWasmModule from "../../../rust/pkg/skiggle_wasm";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import { TAB_BRAKEPOINT, useIsMobile } from "@/hooks/UseIsMobile";

/**
 * Project Detail Page
 * 
 * This page uses a custom horizontal scroll setup that differs from the standard
 * PageLayout. It has its own Lenis instance for horizontal scrolling behavior.
 */

// Project-specific background colors
const getProjectBackgroundColor = (slug: string): string => {
  const colorMap: Record<string, string> = {
    "booked-ai": "#CCD8EC",
    "lifecard": "#DBEBEA",
    "prelo": "#DBD7EE",
    "construction-supply": "#E1E2E4",
    "endota": "#E3EDDA",
    "guardian-childcare": "#F8E9EF",
  };
  return colorMap[slug] || "#0a0a0a";
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const galleryImageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const project = getProjectBySlug(slug);
  const isMobileOrTablet = useIsMobile(TAB_BRAKEPOINT); // true when < 1024px
  const backgroundColor = getProjectBackgroundColor(slug);

  // Get next project
  const currentIndex = projectsData.findIndex(p => p.slug === slug);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  // Track mount state and init WASM
  useEffect(() => {
    setIsMounted(true);
    
    // Register GSAP plugin after mount
    gsap.registerPlugin(ScrollTrigger);
    
    const initWasm = async () => {
      try {
        await initWasmModule();
      } catch (error) {
        console.error("Failed to initialize WASM:", error);
      }
    };
    initWasm();
  }, []);

  // Initialize Lenis smooth scroll (only after mount)
  useEffect(() => {
    if (!isMounted) return;
    
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisInstance.destroy();
    };
  }, [isMounted]);

  // Setup horizontal scroll with GSAP ScrollTrigger (desktop only)
  useEffect(() => {
    if (!isMounted || isMobileOrTablet || !horizontalRef.current || !wrapperRef.current) return;

    const horizontal = horizontalRef.current;
    const wrapper = wrapperRef.current;

    // Calculate scroll distance
    const getScrollAmount = () => {
      const wrapperWidth = wrapper.scrollWidth;
      return -(wrapperWidth - window.innerWidth);
    };

    // Clear any existing ScrollTrigger
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    // Create the horizontal scroll animation
    const ctx = gsap.context(() => {
      const tween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: horizontal,
          start: "top top",
          end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger as ScrollTrigger;
    });

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [isMounted, isMobileOrTablet, slug, isTransitioning]);

  // Animate gallery images to scale as they approach center (mobile/tablet)
  useEffect(() => {
    if (!isMounted || !isMobileOrTablet) return;

    const images = galleryImageRefs.current.filter(Boolean) as HTMLDivElement[];
    if (images.length === 0) return;

    images.forEach((image, index) => {
      gsap.fromTo(
        image,
        { scale: 0.7, opacity: 0.8 },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: image,
            start: "top 80%",
            end: "center center",
            scrub: 1,
            once: true, // Don't reverse animation
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (images.some((img) => trigger.vars.trigger === img)) {
          trigger.kill();
        }
      });
    };
  }, [isMounted, isMobileOrTablet, project?.galleryImages]);

  // Animate gallery images to scale as they approach center (desktop horizontal scroll)
  useEffect(() => {
    if (!isMounted || isMobileOrTablet || !wrapperRef.current) return;

    const images = galleryImageRefs.current.filter(Boolean) as HTMLDivElement[];
    if (images.length === 0) return;

    // Track which images have reached full scale (so they stay enlarged)
    const maxScaledImages = new Set<HTMLDivElement>();

    const updateImageScales = () => {
      const viewportCenter = window.innerWidth / 2;
      
      images.forEach((image) => {
        // If image has already reached full scale, keep it at 1.0
        if (maxScaledImages.has(image)) {
          gsap.to(image, {
            scale: 1,
            duration: 0.1,
            ease: "power1.out",
          });
          return;
        }

        const rect = image.getBoundingClientRect();
        const imageCenter = rect.left + rect.width / 2;
        const distanceFromCenter = Math.abs(imageCenter - viewportCenter);
        const maxDistance = window.innerWidth * 0.8; // Scale within 80% of viewport width
        
        // Calculate scale: 0.7 when far, 1.0 when at center
        let normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
        if (distanceFromCenter < viewportCenter * 0.1) {
          normalizedDistance = 0; // At center, use full scale
        }
        const scale = 0.7 + (1 - normalizedDistance) * 0.3;
        const finalScale = Math.max(0.7, Math.min(1, scale));
        
        // If image reaches full scale, mark it so it stays enlarged
        if (finalScale >= 0.99) {
          maxScaledImages.add(image);
        }
        
        gsap.to(image, {
          scale: finalScale,
          duration: 0.1,
          ease: "power1.out",
        });
      });
    };

    // Update on scroll using requestAnimationFrame for smooth updates
    let rafId: number;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateImageScales);
    };

    // Use ScrollTrigger's onUpdate for better performance with horizontal scroll
    ScrollTrigger.addEventListener("scroll", handleScroll);
    ScrollTrigger.addEventListener("refresh", updateImageScales);
    window.addEventListener("resize", updateImageScales);
    updateImageScales(); // Initial update

    return () => {
      ScrollTrigger.removeEventListener("scroll", handleScroll);
      ScrollTrigger.removeEventListener("refresh", updateImageScales);
      window.removeEventListener("resize", updateImageScales);
      if (rafId) cancelAnimationFrame(rafId);
      maxScaledImages.clear();
    };
  }, [isMounted, isMobileOrTablet, project?.galleryImages]);

  // Handle next project navigation
  const handleNextProject = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // Animate out current content
    gsap.to(wrapperRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        router.push(`/projects/${nextProject.slug}`);
      }
    });
  }, [isTransitioning, nextProject.slug, router]);

  if (!project) {
    return (
      <div className="h-screen w-screen flex items-center justify-center" style={{ backgroundColor }}>
        <div className="text-2xl" style={{ color: "#000" }}>Project not found</div>
      </div>
    );
  }

  // Render loading state until client is mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center" style={{ backgroundColor }}>
        <div className="text-xl font-Aeonik" style={{ color: "#000" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="overflow-x-hidden min-h-screen" style={{ backgroundColor }}>
      <Navbar showBackButton backHref="/projects" logoColor="white" />

      {/* Mobile & Tablet: vertical scroll, single column, card-style sections */}
      <main className="block lg:hidden min-h-screen pt-[10rem] sm:pt-[10.5rem] pb-24" style={{ backgroundColor }}>
        <div className="w-full px-6 sm:px-8 max-w-2xl mx-auto">
          {/* Hero: title + description + meta */}
          <section className="space-y-6 sm:space-y-8">
            <h1 className="font-Aeonik font-bold leading-[1.05] tracking-[-0.02em] text-[clamp(2.25rem,7vw,4rem)]" style={{ color: "#000" }}>
              {project.title}
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "#333" }}>
              {project.description}
            </p>
            {project.challenge && (
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#666" }}>
                {project.challenge}
              </p>
            )}
            <div className="flex flex-wrap gap-10 sm:gap-14 pt-2">
              <div>
                <h4 className="text-xs sm:text-sm uppercase tracking-wider mb-2" style={{ color: "#666" }}>Services</h4>
                <div className="space-y-1">
                  {project.services?.map((service, i) => (
                    <div key={i} className="text-sm" style={{ color: "#000" }}>{service}</div>
                  ))}
                </div>
              </div>
              {project.recognitions && project.recognitions.length > 0 && (
                <div>
                  <h4 className="text-xs sm:text-sm uppercase tracking-wider mb-2" style={{ color: "#666" }}>Recognitions</h4>
                  <div className="space-y-1">
                    {project.recognitions.map((recognition, i) => (
                      <div key={i} className="text-sm" style={{ color: "#000" }}>{recognition}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {project.launchUrl && (
              <a
                href={project.launchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group pt-2"
                style={{ color: "#000" }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#4ECDC4]" />
                <span className="text-sm uppercase tracking-wider group-hover:text-[#4ECDC4] transition-colors">
                  Launch Project
                </span>
              </a>
            )}
          </section>

          {/* Hero image card */}
          <section className="mt-10 sm:mt-14">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="relative w-full aspect-[4/3] sm:aspect-video">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          {/* Gallery cards */}
          {project.galleryImages?.map((image, index) => (
            <section key={index} className="mt-8 sm:mt-12">
              <div 
                ref={(el) => {
                  galleryImageRefs.current[index] = el;
                }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl transform-gpu transition-transform"
                style={{ transformOrigin: "center" }}
              >
                <div className="relative w-full aspect-video">
                  <Image
                    src={image}
                    alt={`${project.title} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </section>
          ))}

          {/* Next project */}
          <section className="mt-16 sm:mt-20 pt-8 border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }}>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="block text-center group"
            >
              <span className="text-xs sm:text-sm uppercase tracking-wider" style={{ color: "#666" }}>Next Project</span>
              <div className="flex items-center justify-center gap-2 mt-3 mb-4">
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#666" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h2 className="font-Aeonik font-bold group-hover:text-[#4ECDC4] transition-colors text-2xl sm:text-3xl" style={{ color: "#000" }}>
                {nextProject.title}
              </h2>
              <div className="mt-6 flex justify-center">
                <div className="w-24 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                  <div className="h-full w-full bg-[#4ECDC4] rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          </section>
        </div>
      </main>

      {/* Desktop: horizontal scroll - extra top padding so zoomed-in users clear navbar */}
      <section ref={horizontalRef} className="hidden lg:block relative h-screen overflow-hidden min-w-0">
        <div
          ref={wrapperRef}
          className="flex h-screen items-stretch min-w-0"
          style={{ width: "fit-content" }}
        >
          {/* Panel 1: Hero with Project Info */}
          <div className="flex-shrink-0 w-screen h-screen flex flex-col lg:flex-row items-center justify-center relative px-6 sm:px-8 lg:px-20 pt-[12rem] sm:pt-[13rem] lg:pt-[15rem] pb-20 sm:pb-24 lg:pb-24 min-h-0">

            {/* Left Side - Project Info; on desktop: title full width, then paragraph + Services/Recognitions side by side */}
            <div className="w-full lg:w-1/2 lg:pr-12 z-20 flex flex-col justify-center order-2 lg:order-1 min-h-0 overflow-y-auto overflow-x-hidden py-4 lg:py-0 scrollbar-hide">
              <h1 className="font-Aeonik font-bold leading-[1.05] tracking-[-0.02em] mb-4 sm:mb-6 lg:mb-8 text-[clamp(2.5rem,8vw,5.5rem)] lg:text-[clamp(3rem,4vw,6rem)] shrink-0" style={{ color: "#000" }}>
                {project.title}
              </h1>

              {/* On desktop: row with description/CTA left, Services/Recognitions right (next to paragraph) */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10 xl:gap-12 min-w-0">
                {/* Left: Description, challenge, launch */}
                <div className="flex flex-col min-w-0 flex-1">
                  <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-4 lg:mb-6 max-w-lg" style={{ color: "#333" }}>
                    {project.description}
                  </p>

                  {project.challenge && (
                    <p className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 lg:mb-8 max-w-lg" style={{ color: "#666" }}>
                      {project.challenge}
                    </p>
                  )}

                  {project.launchUrl && (
                    <a
                      href={project.launchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 group w-fit mt-auto"
                      style={{ color: "#000" }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#4ECDC4]" />
                      <span className="text-xs sm:text-sm uppercase tracking-wider group-hover:text-[#4ECDC4] transition-colors">
                        Launch Project
                      </span>
                    </a>
                  )}
                </div>

                {/* Right: Services + Recognitions (pushed down a bit, more gap before Recognitions) */}
                <div className="flex flex-wrap gap-6 sm:gap-10 lg:gap-0 lg:flex-col lg:flex-shrink-0 lg:w-[180px] xl:w-[200px] mb-4 sm:mb-6 lg:mb-0 lg:mt-1">
                  <div>
                    <h4 className="text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3" style={{ color: "#666" }}>Services</h4>
                    <div className="space-y-1">
                      {project.services?.map((service, i) => (
                        <div key={i} className="text-xs sm:text-sm" style={{ color: "#000" }}>{service}</div>
                      ))}
                    </div>
                  </div>

                  {project.recognitions && project.recognitions.length > 0 && (
                    <div className="lg:mt-8">
                      <h4 className="text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3" style={{ color: "#666" }}>Recognitions</h4>
                      <div className="space-y-1">
                        {project.recognitions.map((recognition, i) => (
                          <div key={i} className="text-xs sm:text-sm" style={{ color: "#000" }}>{recognition}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="w-full lg:w-1/2 h-[70vh] sm:h-[75vh] lg:h-[85%] min-h-[380px] max-h-[720px] lg:max-h-[85vh] relative z-10 order-1 lg:order-2 mb-6 lg:mb-0 shrink-0">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Gallery Panels */}
          {project.galleryImages?.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-6 sm:px-10 lg:px-20 pt-[12rem] sm:pt-[13rem] lg:pt-[15rem] pb-20 sm:pb-24 lg:pb-24"
            >
              <div 
                ref={(el) => {
                  galleryImageRefs.current[index] = el;
                }}
                className="relative w-full max-w-2xl lg:max-w-xl xl:max-w-2xl aspect-video lg:aspect-[16/10] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl transform-gpu"
                style={{ transformOrigin: "center", scale: 0.7 }}
              >
                <Image
                  src={image}
                  alt={`${project.title} - Gallery ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}

          {/* Next Project Panel */}
          <div
            className="flex-shrink-0 w-screen h-screen flex items-center justify-center cursor-pointer group pt-[12rem] sm:pt-[13rem] lg:pt-[15rem] pb-20 sm:pb-24 lg:pb-24"
            onClick={handleNextProject}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="text-sm uppercase tracking-wider" style={{ color: "#666" }}>Next Project</span>
                <svg 
                  className="w-5 h-5 transform group-hover:translate-x-2 transition-transform"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ color: "#666" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              
              <h2 className="font-Aeonik font-bold group-hover:text-[#4ECDC4] transition-colors leading-[1.05] text-[clamp(2rem,6vw,5rem)]" style={{ color: "#000" }}>
                {nextProject.title}
              </h2>

              {/* Progress indicator */}
              <div className="mt-12 flex items-center justify-center gap-2">
                <div className="w-32 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                  <div className="h-full bg-[#4ECDC4] rounded-full w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator - desktop only; safe insets so zoom doesn't crop it */}
      <div className="hidden lg:flex fixed bottom-16 right-10 items-center gap-3 z-50 pointer-events-none max-w-[calc(100vw-4rem)]">
        <span className="text-[#4ECDC4] text-xs uppercase tracking-widest whitespace-nowrap">Scroll to explore</span>
        <div className="flex gap-1">
          <svg className="w-4 h-4 text-[#4ECDC4] animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <svg className="w-4 h-4 text-[#4ECDC4] animate-pulse delay-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-900 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#3B82F6] to-[#4ECDC4] transition-all duration-100"
          id="scroll-progress"
        ></div>
      </div>
    </div>
  );
}
