"use client";

import { useRef, useEffect, Suspense, ReactNode } from "react";
import { LenisProvider } from "@/providers/LenisProvider";
import { ScrollIndicator } from "@/components/shared/ScrollIndicator";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import dynamic from "next/dynamic";
import initWasmModule from "@/rust/pkg/skiggle_wasm";

// Dynamically import particle waterfall for pages that need it
const ParticleWaterfall = dynamic(
  () => import("@/components/FloatingParticles/FloatingParticles"),
  { ssr: false }
);

interface PageLayoutProps {
  children: ReactNode;
  /**
   * Whether to show the particle waterfall effect before footer.
   * Default: false (only used on homepage)
   */
  showParticles?: boolean;
  /**
   * Additional CSS class names for the main content container
   */
  className?: string;
  /**
   * Whether to show the navbar. Default: true
   */
  showNavbar?: boolean;
  /**
   * Whether to show the footer. Default: true
   */
  showFooter?: boolean;
  /**
   * Custom navbar padding. Default: "pb-[4vw]"
   */
  navbarPadding?: string;
  /**
   * Loading fallback component
   */
  loadingFallback?: ReactNode;
  /**
   * Show a back button in the mobile/tablet navbar
   */
  showBackButton?: boolean;
  /**
   * Href for the back button. Default: "/services"
   */
  backHref?: string;
  /**
   * Hide the ABOUT US section in the footer. Default: false
   */
  hideFooterAboutUs?: boolean;
  /**
   * Custom background color class. Default: uses design token background
   */
  backgroundColor?: string;
  /**
   * Content to render after the footer. Use for home page black "ABOUT US" section.
   */
  childrenAfterFooter?: ReactNode;
}

/**
 * PageLayout - Shared layout wrapper for all pages
 * 
 * Provides:
 * - LenisProvider for smooth scrolling
 * - ScrollIndicator
 * - Navbar
 * - Footer with parallax effect
 * - Optional particle effects
 * - WASM initialization
 * 
 * Usage:
 * ```tsx
 * export default function MyPage() {
 *   return (
 *     <PageLayout showParticles={false}>
 *       <MyContent />
 *     </PageLayout>
 *   );
 * }
 * ```
 */
export function PageLayout({
  children,
  showParticles = false,
  className = "",
  showNavbar = true,
  showFooter = true,
  navbarPadding = "pb-[4vw]",
  loadingFallback,
  showBackButton = false,
  backHref = "/services",
  hideFooterAboutUs = false,
  backgroundColor,
  childrenAfterFooter,
}: PageLayoutProps) {
  const footerRef = useRef<HTMLElement>(null);

  // Init WASM in background so components that need it get it without blocking first paint
  useEffect(() => {
    initWasmModule().catch(() => {});
  }, []);

  const defaultLoadingFallback = (
    <div className="w-full h-screen bg-[var(--color-background,#F0F1FA)] text-black flex items-center justify-center">
      <span className="font-Aeonik text-[8vw]">Loading...</span>
    </div>
  );

  return (
    <Suspense fallback={loadingFallback || defaultLoadingFallback}>
      <LenisProvider footerRef={footerRef}>
        <div className={`${backgroundColor || "bg-[var(--color-background,#F0F1FA)]"} h-auto w-full min-w-0 flex flex-col overflow-x-visible overflow-y-visible min-h-screen relative z-10 lg:z-[20]`}>
          <ScrollIndicator />

          {showNavbar && (
            <nav id="navbar" className={`relative z-50 ${navbarPadding}`}>
              <Navbar 
                showBackButton={showBackButton} 
                backHref={backHref}
                logoColor={backgroundColor === "bg-black" ? "white" : "black"}
              />
            </nav>
          )}

          <main className={`flex-1 min-w-0 overflow-visible ${className}`}>
            {children}
          </main>
        </div>

        {/* Particle section - only on pages that need it */}
        {showParticles && (
          <section
            className="h-[92vh] md:h-[calc(100vh+200px)] lg:h-[100vh] w-full relative z-0"
            id="particle-section"
          >
            <ParticleWaterfall />
          </section>
        )}

        {/* Footer with parallax effect */}
        {showFooter && (
          <section id="footer" ref={footerRef} className={`relative z-[5] lg:z-[15] ${showParticles ? 'lg:pt-24' : 'lg:mt-[200px]'}`}>
            <Footer hideAboutUsSection={hideFooterAboutUs} />
          </section>
        )}

        {childrenAfterFooter}
      </LenisProvider>
    </Suspense>
  );
}

export default PageLayout;

