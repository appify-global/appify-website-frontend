"use client";

import { useState, useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import initWasmModule, { generate_skiggle_path } from "../../rust/pkg/skiggle_wasm";

const SkiggleDrop = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const { scrollYProgress } = useScroll({
    // @ts-expect-error - svgRef type mismatch with framer-motion expected type
    target: svgRef,
    offset: ["start 30%", "end 70%"],
  });

  const [pathD, setPathD] = useState("");
  const [progress, setProgress] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    (async () => {
      await initWasmModule();
      const generated = generate_skiggle_path();
      setPathD(generated);
    })();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
  });

  useEffect(() => {
    if (!pathRef.current) return;
    const total = pathRef.current.getTotalLength();
    setLength(total);

    const p = pathRef.current;
    p.style.willChange = "stroke-dashoffset";
    p.style.strokeDasharray = `${total}`;
    p.style.strokeDashoffset = `${total}`;
  }, [pathD]);

  return (
    <svg
      ref={svgRef}
      className="squigggle absolute top-[-10%] left-0 w-screen h-full z-4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={pathRef}
        d={pathD}
        style={{
          strokeDashoffset: length * (1 - progress),
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

export default SkiggleDrop;
