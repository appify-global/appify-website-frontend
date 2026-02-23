"use client";

import dynamic from "next/dynamic";
import HeaderExpert from "@/components/Featured/HeaderExpert";
import FloatingCards from "@/components/Featured/ServiceCard";

const SkiggleDrop = dynamic(
  () => import("@/components/Featured/SkiggleDrop"),
  { ssr: false }
);

export default function HomeExpertsSection() {
  return (
    <section
      className="h-auto lg:h-[200vh] relative z-30 py-[1vw] pt-[0.5vw] lg:pt-[1vw]"
      id="experts-section"
      style={{ zIndex: 30, overflow: "visible" }}
    >
      <SkiggleDrop />
      <div className="w-full px-[4vw]">
        <HeaderExpert />
      </div>
      <div className="w-full px-[4vw] overflow-visible" style={{ overflow: "visible" }}>
        <FloatingCards />
      </div>
    </section>
  );
}
