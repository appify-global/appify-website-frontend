"use client";

import {
  useLayoutEffect,
  useRef,
  ReactNode,
  RefObject,
  useSyncExternalStore,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// ── Module-level store ──
let _lenis: Lenis | null = null;
const _listeners = new Set<() => void>();

function _notify() {
  _listeners.forEach((l) => l());
}

function _subscribe(cb: () => void) {
  _listeners.add(cb);
  return () => _listeners.delete(cb);
}

function _getSnapshot() {
  return _lenis;
}

function _getServerSnapshot() {
  return null;
}

// ── Module-level scroller proxy ──
// Set up ONCE at import time. Reads from `_lenis` dynamically so it
// works regardless of when lenis is created/destroyed. ScrollTrigger
// triggers can be created at ANY time — the proxy is always in place.
if (typeof window !== "undefined") {
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        const v = value ?? 0;
        if (_lenis) _lenis.scrollTo(v, { immediate: true });
        else document.documentElement.scrollTop = v;
        return v;
      }
      return _lenis ? _lenis.scroll : document.documentElement.scrollTop;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.defaults({ scroller: document.body });
}

interface LenisProviderProps {
  children: ReactNode;
  footerRef?: RefObject<HTMLElement | null>;
}

export function LenisProvider({ children, footerRef }: LenisProviderProps) {
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    // Prevent browser from restoring old scroll positions on navigation
    if (history.scrollRestoration !== "manual") {
      history.scrollRestoration = "manual";
    }
    // GSAP can keep internal scroll memory between route mounts.
    // Clear it so refreshes/pins cannot restore a stale position.
    if (typeof ScrollTrigger.clearScrollMemory === "function") {
      ScrollTrigger.clearScrollMemory("manual");
    }

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;

    const lenisInstance = new Lenis({
      lerp: 0.12,
      syncTouch: false,
    });

    const indicator = document.getElementById("scroll-indicator");
    const bar = document.getElementById("scroll-indicator-bar");

    const showIndicator = () => {
      if (indicator) indicator.style.opacity = "1";
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        if (indicator) indicator.style.opacity = "0";
      }, 800);
    };

    lenisInstance.on("scroll", ({ scroll, limit }) => {
      const progress = scroll / limit;

      if (indicator && bar) {
        const trackHeight = indicator.offsetHeight;
        const barHeight = bar.offsetHeight;
        const maxY = trackHeight - barHeight;
        const y = progress * maxY;
        bar.style.transform = `translateY(${y}px)`;
      }

      // Footer parallax effect - only on desktop to avoid overlap on mobile/tablet
      if (footerRef?.current) {
        if (window.innerWidth >= 1024) {
          const totalFooterMovement = progress * -200;
          gsap.set(footerRef.current, { y: totalFooterMovement });
        } else {
          gsap.set(footerRef.current, { y: 0 });
        }
      }

      showIndicator();
      ScrollTrigger.update();
    });

    let rafId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    lenisInstance.scrollTo(0, { immediate: true });

    rafId = requestAnimationFrame((time) => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      lenisInstance.scrollTo(0, { immediate: true });
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    _lenis = lenisInstance;
    _notify();

    return () => {
      cancelAnimationFrame(rafId);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

      lenisInstance.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;

      lenisInstance.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());

      _lenis = null;
      _notify();
    };
  }, [footerRef]);

  return children;
}

/**
 * Hook to access the Lenis instance.
 * Uses useSyncExternalStore directly (NOT context) so that when the
 * store updates during a useLayoutEffect commit, consumers get a
 * SYNCHRONOUS re-render before paint — no batching gap.
 */
export function useLenis() {
  return useSyncExternalStore(_subscribe, _getSnapshot, _getServerSnapshot);
}
