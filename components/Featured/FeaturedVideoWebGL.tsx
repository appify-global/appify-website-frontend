"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { TAB_BRAKEPOINT, useIsMobile } from "@/hooks/UseIsMobile";
import { RollerText } from "../RollerText";
import MarqueePlusRow from "../MarqueePlusRow";
import HomeReelVideoWatchButton from "../ui/HomeReelVideoWatchButton";

/**
 * FeaturedVideoWebGL - Scroll-driven expand/collapse animation
 *
 * Phase 1 (0-0.35): Video sits small (40.3vw) on the left — normal layout
 * Phase 2 (0.35-0.5): Video scales up to fullscreen, centers, z-index above all
 * Phase 3 (0.5-0.65): Holds fullscreen — PLAY REEL visible
 * Phase 4 (0.65-1.0): Video scales back down to original left position
 */

interface FeaturedVideoWebGLProps {
  /** @deprecated - kept for API compatibility */
  topkeyframe?: string;
  className?: string;
  playerClassName?: string;
  playerId?: string;
  /** @deprecated - kept for API compatibility */
  scrollToOverrideId?: string;
  /** @deprecated - kept for API compatibility */
  refForward?: React.RefObject<HTMLElement | null>;
}

const FeaturedVideoWebGL = ({
  topkeyframe: _topkeyframe,
  className,
  playerClassName,
  playerId,
  scrollToOverrideId: _scrollToOverrideId,
  refForward: _refForward,
}: FeaturedVideoWebGLProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(TAB_BRAKEPOINT);

  const [showPlayReel, setShowPlayReel] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const videoSrc = "/Videos/Appify_Introduction_CEO_cropped.mp4";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "start 20%"], // Much shorter range - completes in ~60vh of scroll
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // === Width: small -> large (stays large, doesn't shrink back) ===
  const width = useTransform(
    smoothProgress,
    [0, 0.5, 1.0],
    ["40.3vw", "75vw", "75vw"] // Enlarges and stays large
  );

  // === Horizontal: left-aligned -> centered (stays centered) ===
  // Start at left (0), move to center by translating left by half the difference
  // When width is 40.3vw, x is 0. When width is 75vw, x should center it
  // Center calculation: translateX(calc(50vw - 50%)) centers any width
  const x = useTransform(
    smoothProgress,
    [0, 0.5, 1.0],
    [0, "calc(50vw - 37.5vw)", "calc(50vw - 37.5vw)"] // Moves to center and stays
  );

  // === Vertical: moves down and stays down ===
  const y = useTransform(
    smoothProgress,
    [0, 0.5, 1.0],
    ["2vh", "50vh", "50vh"] // Moves down to center and stays
  );

  // === Z-index: normal -> above everything (stays on top once enlarged) ===
  const zIndex = useTransform(
    smoothProgress,
    [0, 0.2, 1.0],
    [20, 100, 100] // Jumps to front early when expanding and stays
  );

  // Border radius: rounded -> minimal (stays minimal)
  const borderRadius = useTransform(
    smoothProgress,
    [0, 0.6, 1.0],
    ["16px", "4px", "4px"] // Becomes less rounded quickly and stays
  );

  // Shadow: subtle -> dramatic (stays dramatic)
  const boxShadow = useTransform(
    smoothProgress,
    [0, 0.6, 1.0],
    [
      "0 10px 30px rgba(0,0,0,0.1)",
      "0 40px 100px rgba(0,0,0,0.35)",
      "0 40px 100px rgba(0,0,0,0.35)",
    ]
  );

  // Show PLAY REEL once video is enlarged and centered
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setShowPlayReel(value > 0.5);
  });

  // Mobile layout
  if (isMobile) {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center space-y-3 w-full">
          <div id={playerId} />

          <div
            className="w-full relative overflow-hidden"
            style={{ borderRadius: "12px", aspectRatio: "2.1 / 1" }}
          >
            <video
              className="absolute inset-0 w-full h-full"
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{
                borderRadius: "12px",
                objectFit: "cover",
                objectPosition: "center center",
                transform: "scale(1.08)",
                transformOrigin: "center center",
              }}
            />

            <div
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-white tracking-[0.15em] font-light z-50 bg-black/10"
              style={{ borderRadius: "12px" }}
            >
              <div className="flex items-center justify-center gap-4">
                <span className="text-xl font-Aeonik uppercase">PLAY</span>
                <HomeReelVideoWatchButton
                  onMouseEnter={() => {}}
                  onMouseLeave={() => {}}
                />
                <span className="text-xl font-Aeonik uppercase">REEL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "250vh" }}
    >
      {/* Sticky wrapper keeps video pinned in viewport */}
      <div
        className="sticky w-full flex items-center"
        style={{
          top: "10vh",
          height: "90vh",
          paddingLeft: "5vw",
          paddingRight: "5vw",
        }}
      >
        <motion.div
          className={`relative ${className ?? ""}`}
          style={{
            width,
            x,
            y,
            zIndex,
            willChange: "transform, width",
          }}
        >
          <div
            id="player-container"
            className={`flex flex-col items-center space-y-3 w-full ${playerClassName ?? ""}`}
          >
            <div id={playerId} />

            {/* Plus sign marquee - top */}
            <AnimatePresence>
              {showPlayReel && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <MarqueePlusRow
                    show={showPlayReel}
                    isHovering={isHovering}
                    direction="left"
                    count={10}
                    exitOffset="-0.5em"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Video wrapper */}
            <motion.div
              className="w-full relative overflow-hidden"
              style={{
                aspectRatio: "2.1 / 1",
                borderRadius,
                boxShadow,
              }}
            >
              <video
                className="absolute inset-0 w-full h-full"
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                  transform: "scale(1.08)",
                  transformOrigin: "center center",
                }}
              />

              {/* PLAY REEL overlay - visible at fullscreen */}
              <AnimatePresence>
                {showPlayReel && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-white tracking-[0.2em] font-light z-50"
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                      background: "rgba(0,0,0,0.15)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center justify-center gap-6">
                      <RollerText text="PLAY" className="font-Aeonik uppercase" stagger={0.05} />
                      <HomeReelVideoWatchButton
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                      />
                      <RollerText text="REEL" className="font-Aeonik uppercase" stagger={0.05} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Plus sign marquee - bottom */}
            <AnimatePresence>
              {showPlayReel && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <MarqueePlusRow
                    show={showPlayReel}
                    isHovering={isHovering}
                    direction="right"
                    count={10}
                    exitOffset="0.5em"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedVideoWebGL;
