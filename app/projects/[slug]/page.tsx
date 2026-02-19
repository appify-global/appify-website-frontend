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

  const project = getProjectBySlug(slug);
  const isMobileOrTablet = useIsMobile(TAB_BRAKEPOINT); // true when < 1024px

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
      <div className="h-screen w-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-2xl">Project not found</div>
      </div>
    );
  }

  // Render loading state until client is mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <div className="h-screen w-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl font-Aeonik">Loading...</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] overflow-hidden">
      <Navbar showBackButton backHref="/projects" />

      {/* Mobile & Tablet: vertical scroll, single column, card-style sections */}
      <main className="block lg:hidden bg-[#0a0a0a] min-h-screen pt-[10rem] sm:pt-[10.5rem] pb-24">
        <div className="w-full px-6 sm:px-8 max-w-2xl mx-auto">
          {/* Hero: title + description + meta */}
          <section className="space-y-6 sm:space-y-8">
            <h1 className="font-Aeonik font-bold text-white leading-[1.05] tracking-[-0.02em] text-[clamp(2.25rem,7vw,4rem)]">
              {project.title}
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
              {project.description}
            </p>
            {project.challenge && (
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                {project.challenge}
              </p>
            )}
            <div className="flex flex-wrap gap-10 sm:gap-14 pt-2">
              <div>
                <h4 className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-2">Services</h4>
                <div className="space-y-1">
                  {project.services?.map((service, i) => (
                    <div key={i} className="text-white text-sm">{service}</div>
                  ))}
                </div>
              </div>
              {project.recognitions && project.recognitions.length > 0 && (
                <div>
                  <h4 className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-2">Recognitions</h4>
                  <div className="space-y-1">
                    {project.recognitions.map((recognition, i) => (
                      <div key={i} className="text-white text-sm">{recognition}</div>
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
                className="inline-flex items-center gap-3 text-white group pt-2"
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
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
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
          <section className="mt-16 sm:mt-20 pt-8 border-t border-white/10">
            <Link
              href={`/projects/${nextProject.slug}`}
              className="block text-center group"
            >
              <span className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider">Next Project</span>
              <div className="flex items-center justify-center gap-2 mt-3 mb-4">
                <svg className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h2 className="font-Aeonik font-bold text-white group-hover:text-[#4ECDC4] transition-colors text-2xl sm:text-3xl">
                {nextProject.title}
              </h2>
              <div className="mt-6 flex justify-center">
                <div className="w-24 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-[#4ECDC4] rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </Link>
          </section>
        </div>
      </main>

      {/* Desktop: horizontal scroll */}
      <section ref={horizontalRef} className="hidden lg:block relative h-screen overflow-hidden">
        <div
          ref={wrapperRef}
          className="flex h-screen items-stretch"
          style={{ width: "fit-content" }}
        >
          {/* Panel 1: Hero with Project Info */}
          <div className="flex-shrink-0 w-screen h-screen flex flex-col lg:flex-row items-center justify-center relative px-6 sm:px-8 lg:px-20 pt-[10rem] sm:pt-[10.5rem] lg:pt-[12rem] pb-20 sm:pb-24 lg:pb-24 min-h-0">
            {/* Background decorative element */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <svg
                className="absolute -right-[10%] top-0 w-[80%] h-full opacity-10"
                viewBox="0 0 500 500"
                fill="none"
              >
                <path
                  d="M250 50 L450 150 L450 350 L250 450 L50 350 L50 150 Z"
                  stroke="url(#gradient1)"
                  strokeWidth="1"
                  fill="none"
                />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Left Side - Project Info - scrollable on short viewports */}
            <div className="w-full lg:w-1/2 lg:pr-12 z-10 flex flex-col justify-center order-2 lg:order-1 min-h-0 overflow-y-auto overflow-x-hidden py-4 lg:py-0 scrollbar-hide">
              <h1 className="font-Aeonik font-bold text-white leading-[1.05] tracking-[-0.02em] mb-4 sm:mb-6 lg:mb-8 text-[clamp(2.5rem,8vw,5.5rem)] lg:text-[clamp(3rem,4vw,6rem)] shrink-0">
                {project.title}
              </h1>

              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-3 sm:mb-4 lg:mb-6 max-w-lg">
                {project.description}
              </p>

              {project.challenge && (
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 lg:mb-8 max-w-lg">
                  {project.challenge}
                </p>
              )}

              {/* Services + Recognitions */}
              <div className="flex flex-wrap gap-6 sm:gap-10 lg:gap-20 mb-4 sm:mb-6 lg:mb-8">
                <div>
                  <h4 className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">Services</h4>
                  <div className="space-y-1">
                    {project.services?.map((service, i) => (
                      <div key={i} className="text-white text-xs sm:text-sm">{service}</div>
                    ))}
                  </div>
                </div>

                {project.recognitions && project.recognitions.length > 0 && (
                  <div>
                    <h4 className="text-gray-500 text-xs sm:text-sm uppercase tracking-wider mb-2 sm:mb-3">Recognitions</h4>
                    <div className="space-y-1">
                      {project.recognitions.map((recognition, i) => (
                        <div key={i} className="text-white text-xs sm:text-sm">{recognition}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Launch Project Button */}
              {project.launchUrl && (
                <a
                  href={project.launchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white group w-fit"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4ECDC4]" />
                  <span className="text-xs sm:text-sm uppercase tracking-wider group-hover:text-[#4ECDC4] transition-colors">
                    Launch Project
                  </span>
                </a>
              )}
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
              className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-6 sm:px-10 lg:px-20 pt-[10rem] sm:pt-[10.5rem] lg:pt-[12rem] pb-20 sm:pb-24 lg:pb-24"
            >
              <div className="relative w-full max-w-4xl aspect-video lg:aspect-[16/10] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl">
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
            className="flex-shrink-0 w-screen h-screen flex items-center justify-center cursor-pointer group pt-[10rem] sm:pt-[10.5rem] lg:pt-[12rem] pb-20 sm:pb-24 lg:pb-24"
            onClick={handleNextProject}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="text-gray-500 text-sm uppercase tracking-wider">Next Project</span>
                <svg 
                  className="w-5 h-5 text-gray-500 transform group-hover:translate-x-2 transition-transform"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              
              <h2 className="font-Aeonik font-bold text-white group-hover:text-[#4ECDC4] transition-colors leading-[1.05] text-[clamp(2rem,6vw,5rem)]">
                {nextProject.title}
              </h2>

              {/* Progress indicator */}
              <div className="mt-12 flex items-center justify-center gap-2">
                <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#4ECDC4] rounded-full w-0 group-hover:w-full transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll Indicator - desktop only (horizontal scroll) */}
      <div className="hidden lg:flex fixed bottom-12 right-8 items-center gap-3 z-50 pointer-events-none">
        <span className="text-[#4ECDC4] text-xs uppercase tracking-widest">Scroll to explore</span>
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
