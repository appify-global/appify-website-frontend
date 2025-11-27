"use client";
import {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import ProjectCard from "@/components/Featured/ProjectCard";
import Navbar from "@/components/Navbar/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import { projectsData } from "@/data/projects";
import initWasmModule from "../../rust/pkg/skiggle_wasm";
import Footer from "@/components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [initwasm, setInitWasm] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    (async () => {
      await initWasmModule();
      setInitWasm(true);
    })();
  }, []);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      syncTouch: true,
    });

    setLenis(lenis);

    const indicator = document.getElementById("scroll-indicator");
    const bar = document.getElementById("scroll-indicator-bar");
    let hideTimeout: NodeJS.Timeout | null = null;
    const footerElement = footerRef.current;

    const showIndicator = () => {
      if (indicator) indicator.style.opacity = "1";
      if (hideTimeout) clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        if (indicator) indicator.style.opacity = "0";
      }, 800);
    };

    lenis.on("scroll", ({ scroll, limit }) => {
      const progress = scroll / limit;

      if (indicator && bar) {
        const trackHeight = indicator.offsetHeight;
        const barHeight = bar.offsetHeight;
        const maxY = trackHeight - barHeight;

        const y = progress * maxY;
        bar.style.transform = `translateY(${y}px)`;
      }

      if (footerElement) {
        const totalFooterMovement = progress * -300;
        gsap.set(footerElement, { y: totalFooterMovement });
      }

      showIndicator();
      ScrollTrigger.update();
    });

    gsap.registerPlugin(ScrollTrigger);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? //@ts-ignore
          lenis.scrollTo(value, { immediate: true })
          : lenis.scroll;
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

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="bg-[#F0F1FA] h-auto w-full flex flex-col overflow-hidden min-h-screen">
      <div id="scroll-indicator">
        <div id="scroll-indicator-bar"></div>
      </div>

      {initwasm && (
        <>
          <nav id="navbar" className="pb-[4vw]">
            <Navbar />
          </nav>

          <section className="h-full flex flex-col w-screen p-[4vw] pt-[8vw]">
            <h1 className="font-Aeonik text-[clamp(3rem,8vw,8rem)] leading-tight mb-8">
              Our Projects
            </h1>
            <p className="font-Aeonik text-[clamp(1rem,2vw,1.5rem)] text-[#666] mb-12 max-w-3xl">
              Explore our portfolio of innovative projects spanning AI development, 
              UI/UX design, app development, and digital transformation.
            </p>
          </section>

          <section className="h-auto relative z-40 py-[4vw]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 relative z-40 w-screen px-6 lg:px-20">
              {lenis &&
                projectsData.map((project, index) => (
                  <ProjectCard
                    key={index}
                    title={project.title}
                    metadata={project.metadata}
                    imageUrl={project.imageUrl}
                    linkUrl={project.linkUrl}
                    lenis={lenis}
                  />
                ))}
            </div>
          </section>
        </>
      )}

      <section id="footer" ref={footerRef} className="relative z-20 mt-20">
        <Footer />
      </section>
    </div>
  );
}

