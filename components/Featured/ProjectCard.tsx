"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { compute_hover, calculate_image_ref_transform, calc_image_ref_on_leave } from "@/rust/pkg/skiggle_wasm";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  title: string;
  metadata: string[];
  imageUrl: string;
  linkUrl?: string;
  lenis?: Lenis | null;
}

export default function ProjectCard({ title, metadata, imageUrl, linkUrl, lenis }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const state = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    hovered: false,
    raf: 0,
  });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const s = state.current;

    function onMove(e: MouseEvent) {
      //@ts-ignore
      const rect = card.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      s.targetX = -nx * 18;
      s.targetY = -ny * 12;
    }

    function onEnter() {
      s.hovered = true;
      if (imgRef.current) {
        imgRef.current.style.willChange = "transform";
        imgRef.current.style.transition = calculate_image_ref_transform();
      }
      if (!s.raf) loop();
    }

    function onLeave() {
      s.hovered = false;
      s.targetX = 0;
      s.targetY = 0;
      if (imgRef.current) {
        imgRef.current.style.transition = calc_image_ref_on_leave();
        // Remove will-change after animation completes to free GPU resources
        setTimeout(() => {
          if (imgRef.current) imgRef.current.style.willChange = "auto";
        }, 500);
      }
    }

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  function loop() {
    const s = state.current;
    const result = compute_hover(s.targetX, s.targetY, s.currentX, s.currentY, s.hovered);
    s.currentX = result.tx;
    s.currentY = result.ty;

    if (imgRef.current) {
      imgRef.current.style.transform = `translate3d(${result.tx}px, ${result.ty}px, 0) rotateX(${result.rx}deg) rotateY(${result.ry}deg) scale(${result.scale})`;
    }

    const atRest = Math.abs(s.currentX - s.targetX) < 0.05 && Math.abs(s.currentY - s.targetY) < 0.05;
    if (!atRest || s.hovered) s.raf = requestAnimationFrame(loop);
    else s.raf = 0;
  }

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !lenis) return;

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        //@ts-ignore
        return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    ScrollTrigger.defaults({ scroller: document.body });

    const ctx = gsap.context(() => {
      gsap.fromTo(card,
        { opacity: 0, y: 80, scale: 0.93, filter: "blur(8px)" },
        {
          opacity: 1, y: 0, scale: 1, filter: "blur(0px)", ease: "power3.out", duration: 1.1,
          force3D: true,
          scrollTrigger: { 
            trigger: card, 
            start: "top 85%", 
            end: "bottom 10%", 
            toggleActions: "play none none reverse",
            invalidateOnRefresh: false
          }
        }
      );
    }, card);

    // Remove unnecessary refresh - handled by main page.tsx
    return () => ctx.revert();
  }, [lenis]);

  const metadataString = metadata.join(" • ").toUpperCase();

  return (
    <a
      href={linkUrl ?? "#"}
      ref={cardRef}
      className="group block relative h-full project-card will-change-transform"
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
    >
      <div className="h-full overflow-hidden transform-gpu transition-shadow duration-300">
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
          <div ref={imgRef} className="absolute inset-0" style={{ transformOrigin: "center" }}>
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" draggable={false} />
          </div>
        </div>
        <div className="py-4 sm:py-5 md:py-6">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl tracking-normal mb-2 font-Aeonik leading-snug">
            {metadataString}
          </p>
          <h3 className="flex items-center relative font-Aeonik text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
            {title}
          </h3>
        </div>
      </div>
    </a>
  );
}
