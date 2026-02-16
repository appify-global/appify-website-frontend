"use client";

import { useRef, useEffect, useState, Suspense, ReactNode } from "react";
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
}: PageLayoutProps) {
  const footerRef = useRef<HTMLElement>(null);
  const [wasmReady, setWasmReady] = useState(false);

  // Initialize WASM module
  useEffect(() => {
    (async () => {
      try {
        await initWasmModule();
        setWasmReady(true);
      } catch (error) {
        console.error("Failed to initialize WASM module:", error);
        // Still set ready to allow page to render without WASM features
        setWasmReady(true);
      }
    })();
  }, []);

  const defaultLoadingFallback = (
    <div className="w-full h-screen bg-[var(--color-background,#F0F1FA)] text-black flex items-center justify-center">
      <span className="font-Aeonik text-[8vw]">Loading...</span>
    </div>
  );

  return (
    <Suspense fallback={loadingFallback || defaultLoadingFallback}>
      <LenisProvider footerRef={footerRef}>
        <div className="bg-[var(--color-background,#F0F1FA)] h-auto w-full flex flex-col overflow-hidden min-h-screen relative z-10">
          <ScrollIndicator />

          {wasmReady && (
            <>
              {showNavbar && (
                <nav id="navbar" className={navbarPadding}>
                  <Navbar />
                </nav>
              )}

              <main className={`flex-1 ${className}`}>
                {children}
              </main>
            </>
          )}
        </div>

        {/* Particle section - only on pages that need it */}
        {showParticles && wasmReady && (
          <section
            className="h-[92vh] md:h-[calc(100vh+200px)] lg:h-[100vh] w-full relative z-10 lg:z-20"
            id="particle-section"
          >
            <ParticleWaterfall />
          </section>
        )}

        {/* Footer with parallax effect */}
        {showFooter && wasmReady && (
          <section id="footer" ref={footerRef} className={`relative z-20 lg:z-[15] ${showParticles ? 'lg:pt-24' : ''}`}>
            <Footer />
          </section>
        )}
      </LenisProvider>
    </Suspense>
  );
}

export default PageLayout;

