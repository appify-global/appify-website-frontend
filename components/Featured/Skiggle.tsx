"use client";
import { useState, useEffect, useRef, useMemo, RefObject } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import {
  generate_skiggle_path_2,
  compute_dashoffset_rev,
} from "../../rust/pkg/skiggle_wasm";

interface SkiggleProps {
  /** Ref to the parent section for scroll tracking */
  ref: RefObject<HTMLElement | null>;
}

const Skiggle = ({ ref: sectionRef }: SkiggleProps) => {
  const pathRef = useRef<SVGPathElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [length, setLength] = useState(0);
  
  // Compute path once using useMemo to avoid setState in effect
  const pathD = useMemo(() => generate_skiggle_path_2(), []);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 50%", "end 100%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(1 - v);
  });

  useEffect(() => {
    if (!pathRef.current) return;
    const len = pathRef.current.getTotalLength();
    setLength(len);

    const p = pathRef.current;
    p.style.willChange = "stroke-dashoffset";
    p.style.strokeDasharray = `${len}`;
    p.style.strokeDashoffset = `${len}`;
  }, [pathD]);

  return (
    <svg
      className="squigggle absolute top-[-10%] left-0 w-full h-full z-0"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d={pathD}
        style={{
          strokeDashoffset: compute_dashoffset_rev(progress, length),
          strokeWidth: 50,
          strokeLinecap: "round",
        }}
        stroke="url(#paint0_linear_5_4)"
      />

      <defs>
        <linearGradient
          id="paint0_linear_5_4"
          x1="35"
          y1="-17"
          x2="605"
          y2="444"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#FF009E" />
          <stop offset={1} stopColor="#FF7B00" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Skiggle;
