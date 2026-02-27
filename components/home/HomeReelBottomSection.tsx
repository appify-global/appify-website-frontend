"use client";

import { useState, useRef } from "react";
import { FOUNDER_VIDEO_SRC } from "@/lib/video";
import HomeReelVideoWatchButton from "@/components/ui/HomeReelVideoWatchButton";

/**
 * Static founder reel video at the bottom of the home page.
 * Same video as SubVideoText section, without scroll animation.
 */
export default function HomeReelBottomSection() {
  const [hasClickedPlay, setHasClickedPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = FOUNDER_VIDEO_SRC;

  const handlePlayClick = () => {
    setHasClickedPlay(true);
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      video.play().catch((err) => console.error("Video play failed:", err));
    }
  };

  return (
    <section
      className="w-full px-[4vw] py-16 sm:py-20 lg:py-24 bg-[var(--color-background,#F0F1FA)]"
      aria-label="Watch our reel"
    >
      <div className="max-w-[85vw] mx-auto">
        <div
          className="relative overflow-hidden rounded-[16px] md:rounded-[20px] shadow-[0_40px_100px_rgba(0,0,0,0.2)]"
          style={{ aspectRatio: "2.1 / 1" }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover object-center"
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
              transform: "scale(1.08)",
              transformOrigin: "center center",
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (hasClickedPlay) {
                setHasClickedPlay(false);
                if (videoRef.current) videoRef.current.muted = true;
              } else {
                handlePlayClick();
              }
            }}
          />

          {!hasClickedPlay && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-white tracking-[0.2em] font-light z-50 bg-black/15"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handlePlayClick();
              }}
            >
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <span className="text-xl sm:text-2xl lg:text-3xl font-Aeonik uppercase">
                  PLAY
                </span>
                <HomeReelVideoWatchButton
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                />
                <span className="text-xl sm:text-2xl lg:text-3xl font-Aeonik uppercase">
                  REEL
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
