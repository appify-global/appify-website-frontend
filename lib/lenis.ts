import Lenis from "lenis";

let lenis: Lenis | null = null;

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.2, // controls smoothness
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // ease out expo
    // @ts-expect-error - smooth is a valid Lenis option but not in type definitions
    smooth: true,
    smoothTouch: false,
  });

  const raf = (time: number) => {
    lenis!.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);

  return lenis;
}
