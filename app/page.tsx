"use client";
import {
  useState,
  useLayoutEffect,
  useRef,
  useEffect,
} from "react";
import Header from "@/components/Featured/Header";
import HeaderExpert from "@/components/Featured/HeaderExpert";
import HeaderAi from "@/components/Featured/Hero-Ai";
import ProjectCard from "@/components/Featured/ProjectCard";
import Skiggle from "@/components/Featured/Skiggle";
import SkiggleAi from "@/components/Featured/SkiggleAi";
import SubVideoText from "@/components/Featured/SubVideoText";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import ScrollText from "@/components/Navbar/ScrollText";
import { Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import FloatingCards from "@/components/Featured/ServiceCard";
import Lenis from "lenis";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer/Footer";
import SubVideoTextAi from "@/components/Featured/SubVideoAi";
import FeatureWorkHeader from "@/components/Featured/FeatureWorkHeader";
import { projectsData } from "@/data/projects";
import initWasmModule from "../rust/pkg/skiggle_wasm";
import DotButton from "@/components/ui/DotButton";

const ParticleWaterfall = dynamic(
  () => import("../components/FloatingParticles/FloatingParticles"),
  { ssr: false }
);

const SkiggleDrop = dynamic(
  () => import("../components/Featured/SkiggleDrop"),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const ref = useRef(null);
  const aiRef = useRef(null);
  const gridRef = useRef(null);
  const footerRef = useRef(null);

  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [initwasm, setInitWasm] = useState(false);

  useEffect(() => {
    (async () => {
      await initWasmModule();
      setInitWasm(true)
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
    const footerElement = footerRef.current; // Get the footer element here

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
    <Suspense
      fallback={
        <div className="w-screen h-screen bg-black text-white flex items-center justify-center">
          <span className="font-Aeonik font-Aeonik text-[8vw]">
            Loading...
          </span>
        </div>
      }
    >
      <div className="bg-[#F0F1FA] h-auto w-full flex flex-col overflow-hidden">
        <div id="scroll-indicator">
          <div id="scroll-indicator-bar"></div>
        </div>

        {initwasm && (
          <>

            <nav id="navbar" className="pb-[4vw]">
              <Navbar />
            </nav>

            <section
              id="hero-section"
              className="h-full flex flex-col w-screen p-[4vw]"
            >
              <Hero />
              <div className="mt-10" />
              <ScrollText />
            </section>

            <section
              id="beoynd-visions"
              className="h-auto relative z-20 pt-[4vw] pb-[2vw]"
              ref={ref}
              style={{ overflow: 'visible' }}
            >
              <Skiggle ref={ref} />
              <div className="w-screen" style={{ paddingLeft: '5vw', paddingRight: '5vw', overflow: 'visible' }}>
                <Header />
                {lenis && <SubVideoText ref={ref} lenis={lenis} />}
              </div>
            </section>

            <section
              className="h-auto lg:h-[200vh] relative z-40  py-[4vw]"
              id="experts-section"
            >
              <SkiggleDrop />

              <div className="w-screen px-[4vw]">
                <HeaderExpert />
              </div>

              <div className="w-full px-[4vw]">
                {lenis && <FloatingCards lenis={lenis} />}
              </div>
            </section>

            <section
              ref={gridRef}
              className="h-auto relative z-40 lg:mt-0"
              id="feature-work"
            >
              <div className="w-screen px-[4vw]">
                {lenis && <FeatureWorkHeader lenis={lenis} />}
              </div>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 relative z-40 w-screen px-6 lg:px-20 mt-2 lg:mt-24                      "
              >
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

              <div className="flex justify-center w-full mt-[2rem]  lg:mt-[5rem]">
                <DotButton
                  text="SEE ALL PROJECTS"
                  variant="white"
                  className="see-all-projects-btn"
                  href="/projects"
                />
              </div>
            </section>

            <section
              className="h-auto lg:h-[180vh] relative mt-[5rem] lg:mt-[15rem]  z-40 w-full"
              ref={aiRef}
            >
              <SkiggleAi />
              <div className="w-screen  px-[4vw]">
                <HeaderAi />
                {lenis && <SubVideoTextAi ref={aiRef} lenis={lenis} />}
              </div>
            </section>
          </>
        )}
      </div>

      {/* Added `relative z-10` for correct stacking (as per previous guidance) */}
      <section
        className="h-[100vh] w-full relative z-10"
        id="particle-section"
      >
        <ParticleWaterfall />
      </section>

      {/* Added `ref={footerRef}` and `className="relative z-20"` */}
      <section id="footer" ref={footerRef} className="relative z-20">
        <Footer />
      </section>
    </Suspense>
  );
}
