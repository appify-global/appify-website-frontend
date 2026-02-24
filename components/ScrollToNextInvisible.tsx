"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const MIN_VIEW_TIME_MS = 200;

interface ScrollToNextInvisibleProps {
  nextPageHref: string;
}

/**
 * Renders nothing visible. When placed after the footer, detects when user has
 * scrolled to the end and then scrolls down again → navigates to nextPageHref.
 * No UI - only functionality.
 */
export default function ScrollToNextInvisible({ nextPageHref }: ScrollToNextInvisibleProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const inViewRef = useRef(false);
  const inViewSinceRef = useRef<number | null>(null);
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        if (!e) return;
        const now = Date.now();
        if (e.isIntersecting) {
          inViewRef.current = true;
          if (inViewSinceRef.current === null) inViewSinceRef.current = now;
        } else {
          inViewRef.current = false;
          inViewSinceRef.current = null;
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (hasNavigatedRef.current || !inViewRef.current || e.deltaY <= 0) return;
      const since = inViewSinceRef.current;
      if (since === null || Date.now() - since < MIN_VIEW_TIME_MS) return;
      e.preventDefault();
      hasNavigatedRef.current = true;
      router.push(nextPageHref);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [router, nextPageHref]);

  return (
    <div
      ref={sentinelRef}
      style={{ height: 1, minHeight: 1, opacity: 0, pointerEvents: "none", overflow: "hidden" }}
      aria-hidden="true"
    />
  );
}
