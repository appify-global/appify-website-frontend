"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(scrollTop / docHeight, 1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-[6px] h-[200px]">
      <div className="w-full h-full rounded-full bg-[rgba(0,0,0,0.08)] relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full rounded-full bg-black transition-[height] duration-100 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}
