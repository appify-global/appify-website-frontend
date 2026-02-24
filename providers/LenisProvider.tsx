"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  ReactNode,
  RefObject,
  useSyncExternalStore,
  useCallback,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface LenisContextType {
  lenis: Lenis | null;
  isReady: boolean;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  isReady: false,
});

interface LenisProviderProps {
  children: ReactNode;
  footerRef?: RefObject<HTMLElement | null>;
}

// Store for managing lenis instance lifecycle
interface LenisStore {
  lenis: Lenis | null;
  isReady: boolean;
  listeners: Set<() => void>;
}

// Cached server snapshot - must be a stable reference to avoid infinite loops
const SERVER_SNAPSHOT: LenisContextType = {
  lenis: null,
  isReady: false,
};

export function LenisProvider({ children, footerRef }: LenisProviderProps) {
  // Use ref to store state that shouldn't trigger re-renders on its own
  const storeRef = useRef<LenisStore>({
    lenis: null,
    isReady: false,
    listeners: new Set(),
  });
  
  // Cache the snapshot to avoid creating new objects on each call
  const snapshotRef = useRef<LenisContextType>(SERVER_SNAPSHOT);

  const subscribe = useCallback((callback: () => void) => {
    storeRef.current.listeners.add(callback);
    return () => storeRef.current.listeners.delete(callback);
  }, []);

  const getSnapshot = useCallback(() => {
    // Only create a new snapshot if values changed
    const current = storeRef.current;
    if (
      snapshotRef.current.lenis !== current.lenis ||
      snapshotRef.current.isReady !== current.isReady
    ) {
      snapshotRef.current = {
        lenis: current.lenis,
        isReady: current.isReady,
      };
    }
    return snapshotRef.current;
  }, []);

  // Return stable cached reference for server
  const getServerSnapshot = useCallback(() => SERVER_SNAPSHOT, []);

  // Use useSyncExternalStore to manage the external lenis instance
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useLayoutEffect(() => {
    const lenisInstance = new Lenis({
      lerp: 0.1,
      syncTouch: true,
    });

    storeRef.current.lenis = lenisInstance;

    const indicator = document.getElementById("scroll-indicator");
    const bar = document.getElementById("scroll-indicator-bar");
    let hideTimeout: NodeJS.Timeout | null = null;

    const showIndicator = () => {
      if (indicator) indicator.style.opacity = "1";
      if (hideTimeout) clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
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

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? // @ts-expect-error - Lenis scrollTo has different signature than expected
            lenisInstance.scrollTo(value, { immediate: true })
          : lenisInstance.scroll;
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

    // Always start at top when LenisProvider mounts (page navigation)
    window.scrollTo(0, 0);
    lenisInstance.scrollTo(0, { immediate: true });

    requestAnimationFrame(raf);
    ScrollTrigger.defaults({ scroller: document.body });
    ScrollTrigger.refresh();

    // Update store and notify listeners
    storeRef.current.isReady = true;
    storeRef.current.listeners.forEach((listener) => listener());

    return () => {
      if (hideTimeout) clearTimeout(hideTimeout);
      lenisInstance.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      storeRef.current.lenis = null;
      storeRef.current.isReady = false;
    };
  }, [footerRef]);

  return (
    <LenisContext.Provider value={state}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  const context = useContext(LenisContext);
  if (context === undefined) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return context.lenis;
}

export function useLenisReady() {
  const context = useContext(LenisContext);
  if (context === undefined) {
    throw new Error("useLenisReady must be used within a LenisProvider");
  }
  return context.isReady;
}

export { LenisContext };

