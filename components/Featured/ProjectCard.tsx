"use client";
import { useRef, useEffect, memo } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/hooks/useLenis";
import { compute_hover, calculate_image_ref_transform, calc_image_ref_on_leave } from "@/rust/pkg/skiggle_wasm";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  title: string;
  metadata: string[];
  imageUrl: string;
  linkUrl?: string;
  /** Set for first 1–2 cards to prioritize image loading */
  priority?: boolean;
}

function ProjectCard({ title, metadata, imageUrl, linkUrl, priority = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const lenis = useLenis();

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

    // Define loop inside the effect to avoid variable hoisting issues
    function loop() {
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

    function onMove(e: MouseEvent) {
      // @ts-expect-error - card is checked above but TS doesn't narrow inside nested function
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
      
      // Animate arrow and title on hover
      if (arrowRef.current && titleRef.current) {
        const arrowWidth = arrowRef.current.getBoundingClientRect().width || 24;
        const titleSpan = titleRef.current.querySelector('span');
        if (titleSpan) {
          const titleLeft = titleSpan.getBoundingClientRect().left - titleRef.current.getBoundingClientRect().left;
          gsap.to(arrowRef.current, {
            opacity: 1,
            x: titleLeft, // Arrow aligns with the left edge of the title text
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(titleSpan, {
            x: arrowWidth + 16, // Move title to the right with 16px gap
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
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
      
      // Animate arrow and title back on leave
      if (arrowRef.current && titleRef.current) {
        const titleSpan = titleRef.current.querySelector('span');
        gsap.to(arrowRef.current, {
          opacity: 0,
          x: -30, // Arrow moves back left when hiding
          duration: 0.3,
          ease: "power2.out",
        });
        if (titleSpan) {
          gsap.to(titleSpan, {
            x: 0, // Title returns to original position
            duration: 0.3,
            ease: "power2.out",
          });
        }
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

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !lenis) return;

    const hasAnimatedRef = { current: false };

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(card, {
        opacity: 0,
        y: 80,
        scale: 0.93,
        filter: "blur(8px)",
        force3D: true
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimatedRef.current) {
              hasAnimatedRef.current = true;
              gsap.to(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                ease: "power3.out",
                duration: 1.1,
                force3D: true
              });
              observer.disconnect();
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -15% 0px"
        }
      );

      observer.observe(card);

      return () => {
        observer.disconnect();
      };
    }, card);

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
            <Image src={imageUrl} alt={title} fill className="object-cover" draggable={false} priority={priority} />
          </div>
        </div>
        <div className="py-4 sm:py-5 md:py-6">
          <p className="text-[10px] sm:text-xs md:text-xs lg:text-[13px] tracking-wide mb-1 font-Aeonik leading-snug text-black/70">
            {metadataString}
          </p>
          <h3 ref={titleRef} className="relative font-Aeonik text-xl sm:text-2xl md:text-2xl lg:text-3xl leading-tight font-medium">
            <svg
              ref={arrowRef}
              className="absolute w-5 h-5 sm:w-6 sm:h-6 text-black opacity-0"
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ left: 0, top: "50%", transform: "translateY(-50%) translateX(-30px)" }}
            >
              <path d="M0.942871 11.3138H22.9429M22.9429 11.3138L12.8857 0.942383M22.9429 11.3138L12.8857 21.0567" stroke="black" strokeWidth="1.88571" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="inline-block">{title}</span>
          </h3>
        </div>
      </div>
    </a>
  );
}

export default memo(ProjectCard);
