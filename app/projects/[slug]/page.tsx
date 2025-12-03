"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import { getProjectBySlug, projectsData } from "@/data/projects";
import initWasmModule from "../../../rust/pkg/skiggle_wasm";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";

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

  // Setup horizontal scroll with GSAP ScrollTrigger (only after mount)
  useEffect(() => {
    if (!isMounted || !horizontalRef.current || !wrapperRef.current) return;

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
  }, [isMounted, slug, isTransitioning]);

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
      <Navbar />
      
      {/* Horizontal Scroll Container */}
      <section ref={horizontalRef} className="relative h-screen overflow-hidden">
        <div 
          ref={wrapperRef} 
          className="flex h-screen items-center"
          style={{ width: "fit-content" }}
        >
          {/* Panel 1: Hero with Project Info */}
          <div className="flex-shrink-0 w-screen h-screen flex items-center relative px-20">
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

            {/* Left Side - Project Info */}
            <div className="w-1/2 pr-12 z-10">
              <h1 className="text-[6rem] font-bold text-white leading-none mb-8">
                {project.title}
              </h1>
              
              <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-lg">
                {project.description}
              </p>
              
              {project.challenge && (
                <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
                  {project.challenge}
                </p>
              )}

              {/* Services */}
              <div className="flex gap-20 mb-8">
                <div>
                  <h4 className="text-gray-500 text-sm uppercase tracking-wider mb-3">Services</h4>
                  <div className="space-y-1">
                    {project.services?.map((service, i) => (
                      <div key={i} className="text-white text-sm">{service}</div>
                    ))}
                  </div>
                </div>
                
                {project.recognitions && project.recognitions.length > 0 && (
                  <div>
                    <h4 className="text-gray-500 text-sm uppercase tracking-wider mb-3">Recognitions</h4>
                    <div className="space-y-1">
                      {project.recognitions.map((recognition, i) => (
                        <div key={i} className="text-white text-sm">{recognition}</div>
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
                  className="inline-flex items-center gap-3 text-white group"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#4ECDC4]"></span>
                  <span className="text-sm uppercase tracking-wider group-hover:text-[#4ECDC4] transition-colors">
                    Launch Project
                  </span>
                </a>
              )}
            </div>

            {/* Right Side - Hero Image */}
            <div className="w-1/2 h-[70%] relative z-10">
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
              className="flex-shrink-0 w-screen h-screen flex items-center justify-center px-20"
            >
              <div className="relative w-[85%] h-[75%] rounded-2xl overflow-hidden shadow-2xl">
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
            className="flex-shrink-0 w-screen h-screen flex items-center justify-center cursor-pointer group"
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
              
              <h2 className="text-[5rem] font-bold text-white group-hover:text-[#4ECDC4] transition-colors leading-none">
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

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 right-8 flex items-center gap-3 z-50 pointer-events-none">
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
