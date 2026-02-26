"use client";

import { useRef } from "react";
import SkiggleAi from "@/components/Featured/SkiggleAi";
import HeaderAi from "@/components/Featured/Hero-Ai";
import SubVideoTextAi from "@/components/Featured/SubVideoAi";

export default function HomeAiSection() {
  const aiRef = useRef<HTMLElement>(null);

  return (
    <section
      className="h-auto lg:h-[130vh] relative mt-[3rem] sm:mt-[5rem] md:mt-[3rem] lg:mt-[15rem] pb-[4rem] sm:pb-[4rem] lg:pb-0 z-40 w-full bg-[var(--color-background,#F0F1FA)]"
      ref={aiRef}
    >
      <SkiggleAi />
      <div className="w-full px-[4vw]">
        <HeaderAi />
        <SubVideoTextAi ref={aiRef} />
      </div>
    </section>
  );
}
