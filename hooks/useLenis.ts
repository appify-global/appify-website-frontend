"use client";

import { useContext } from "react";
import { LenisContext } from "@/providers/LenisProvider";

/**
 * Hook to access the Lenis smooth scroll instance from context.
 * Must be used within a LenisProvider.
 */
export function useLenis() {
  const context = useContext(LenisContext);
  if (context === undefined) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return context.lenis;
}

/**
 * Hook to check if Lenis is initialized and ready.
 * Useful for conditional rendering that depends on scroll setup.
 */
export function useLenisReady() {
  const context = useContext(LenisContext);
  if (context === undefined) {
    throw new Error("useLenisReady must be used within a LenisProvider");
  }
  return context.isReady;
}

