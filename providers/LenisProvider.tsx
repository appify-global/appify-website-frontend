"use client";

import {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
  useRef,
  ReactNode,
  RefObject,
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

export function LenisProvider({ children, footerRef }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [isReady, setIsReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useLayoutEffect(() => {
    const lenisInstance = new Lenis({
      lerp: 0.1,
      syncTouch: true,
    });

    lenisRef.current = lenisInstance;
    setLenis(lenisInstance);

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

      // Footer parallax effect
      if (footerRef?.current) {
        const totalFooterMovement = progress * -300;
        gsap.set(footerRef.current, { y: totalFooterMovement });
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
          ? // @ts-ignore
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

    requestAnimationFrame(raf);
    ScrollTrigger.defaults({ scroller: document.body });
    ScrollTrigger.refresh();

    setIsReady(true);

    return () => {
      if (hideTimeout) clearTimeout(hideTimeout);
      lenisInstance.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [footerRef]);

  return (
    <LenisContext.Provider value={{ lenis, isReady }}>
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

