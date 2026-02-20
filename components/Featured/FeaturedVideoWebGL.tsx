"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useMotionValue } from "framer-motion";
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
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const reelContainerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(TAB_BRAKEPOINT);

  const [showPlayReel, setShowPlayReel] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isInReelState, setIsInReelState] = useState(false);
  const [thumbnailPos, setThumbnailPos] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [reelPos, setReelPos] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const videoSrc = "/Videos/Appify_Introduction_CEO_cropped.mp4";

  // Motion value for animation progress
  const animationProgressValue = useMotionValue(0);

  // Detect scroll direction and trigger animation based on video visibility
  React.useEffect(() => {
    if (isMobile) return;

    let ticking = false;
    let lastScrollY = window.scrollY;
    let scrollDirection = 0; // 1 = down, -1 = up

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (!videoWrapperRef.current || !reelContainerRef.current) {
          ticking = false;
          return;
        }

        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        
        // Determine scroll direction (accumulate small movements)
        if (Math.abs(scrollDelta) > 5) {
          scrollDirection = scrollDelta > 0 ? 1 : -1;
        }

        const videoRect = videoWrapperRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Check if video is visible in viewport (at least 50% visible)
        const videoTop = videoRect.top;
        const videoBottom = videoRect.bottom;
        const videoVisible = videoTop < viewportHeight && videoBottom > 0;
        const videoCenter = videoRect.top + videoRect.height / 2;
        const viewportCenter = viewportHeight / 2;
        
        // Video is "in center" if its center is within 200px of viewport center
        const isVideoNearCenter = Math.abs(videoCenter - viewportCenter) < 200;

        // Check reel container visibility
        const reelRect = reelContainerRef.current.getBoundingClientRect();
        const isReelVisible = reelRect.bottom <= viewportHeight && reelRect.top >= 0;

        // Trigger animation to reel when:
        // - Video is visible and near center
        // - User scrolls down
        // - Not already in reel state
        if (videoVisible && isVideoNearCenter && !isInReelState && scrollDirection === 1) {
          setIsInReelState(true);
          animationProgressValue.set(1);
        }
        // Trigger animation to thumbnail when:
        // - In reel state
        // - Reel is visible
        // - User scrolls up
        else if (isInReelState && isReelVisible && scrollDirection === -1) {
          setIsInReelState(false);
          animationProgressValue.set(0);
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, isInReelState, animationProgressValue]);

  // Calculate positions on mount and resize
  React.useEffect(() => {
    const calculatePositions = () => {
      if (thumbnailRef.current && reelContainerRef.current && videoWrapperRef.current && !isMobile) {
        const thumbRect = thumbnailRef.current.getBoundingClientRect();
        const reelRect = reelContainerRef.current.getBoundingClientRect();
        const stickyWrapper = videoWrapperRef.current.parentElement;
        
        if (stickyWrapper) {
          const stickyRect = stickyWrapper.getBoundingClientRect();
          
          // Calculate thumbnail position relative to sticky wrapper center
          const thumbCenterX = thumbRect.left + thumbRect.width / 2;
          const thumbCenterY = thumbRect.top + thumbRect.height / 2;
          const stickyCenterX = stickyRect.left + stickyRect.width / 2;
          const stickyCenterY = stickyRect.top + stickyRect.height / 2;
          
          setThumbnailPos({
            x: thumbCenterX - stickyCenterX, // Offset from sticky center (pixels)
            y: thumbCenterY - stickyCenterY, // Offset from sticky center (pixels)
            width: thumbRect.width,
            height: thumbRect.height,
          });
        }
        
        // Calculate reel position relative to sticky wrapper center (below text)
        if (stickyWrapper) {
          const stickyRect = stickyWrapper.getBoundingClientRect();
          const reelCenterX = reelRect.left + reelRect.width / 2;
          const reelCenterY = reelRect.top + reelRect.height / 2;
          const stickyCenterX = stickyRect.left + stickyRect.width / 2;
          const stickyCenterY = stickyRect.top + stickyRect.height / 2;
          
          setReelPos({
            x: reelCenterX - stickyCenterX, // Offset from sticky center (pixels)
            y: reelCenterY - stickyCenterY, // Offset from sticky center (pixels)
            width: reelRect.width,
            height: reelRect.height,
          });
        }
      }
    };

    // Calculate on mount with delay to ensure layout is ready
    const timeoutId = setTimeout(calculatePositions, 100);
    
    window.addEventListener('resize', calculatePositions);
    // Don't recalculate on scroll to prevent position drift during animation
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculatePositions);
    };
  }, [isMobile]);

  // Binary animation: 0 = thumbnail state, 1 = reel state
  // Direct motion value (no spring) for instant, precise transitions
  const smoothProgress = animationProgressValue;

  // === Width: thumbnail -> reel (binary: only two states) ===
  const width = useTransform(
    smoothProgress,
    [0, 1],
    [
      thumbnailPos.width || "40.3vw",
      reelPos.width || "85vw"
    ]
  );

  // === Horizontal: thumbnail position -> reel position (binary) ===
  const x = useTransform(
    smoothProgress,
    [0, 1],
    [
      thumbnailPos.x || 0, // Start at thumbnail position
      reelPos.x || 0 // End at reel position
    ]
  );

  // === Vertical: thumbnail position -> reel position (binary) ===
  const y = useTransform(
    smoothProgress,
    [0, 1],
    [
      thumbnailPos.y || 0, // Start at thumbnail position
      reelPos.y || 0 // End at reel position (below text)
    ]
  );

  // === Z-index: normal -> above everything ===
  const zIndex = useTransform(
    smoothProgress,
    [0, 0.1, 1],
    [20, 100, 100] // Jump to front when animation starts
  );

  // Border radius: more rounded
  const borderRadius = useTransform(
    smoothProgress,
    [0, 1],
    ["24px", "12px"] // More rounded corners
  );

  // Shadow: subtle -> dramatic
  const boxShadow = useTransform(
    smoothProgress,
    [0, 1],
    [
      "0 10px 30px rgba(0,0,0,0.1)",
      "0 40px 100px rgba(0,0,0,0.35)",
    ]
  );

  // Show PLAY REEL once video is in reel state
  useMotionValueEvent(smoothProgress, "change", (value) => {
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
    <>
      {/* Thumbnail container - positioned where video should start */}
      <div
        ref={thumbnailRef}
        className="absolute left-[2vw] top-[35vh] pointer-events-none"
        style={{
          width: "40.3vw",
          aspectRatio: "2.1 / 1",
          opacity: 0,
          zIndex: -1,
        }}
        aria-hidden="true"
      />

      {/* Reel container - target position (below text, centered horizontally) */}
      <div
        ref={reelContainerRef}
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: "60vh", // Position below text section
          width: "85vw",
          aspectRatio: "2.1 / 1",
          opacity: 0,
          zIndex: -1,
        }}
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: "150vh" }} // Reduced height for faster completion
      >
        {/* Sticky wrapper keeps video pinned in viewport */}
        <div
          className="sticky w-full flex items-center justify-center"
          style={{
            top: "10vh",
            height: "90vh",
            paddingLeft: "5vw",
            paddingRight: "5vw",
          }}
        >
          <motion.div
            ref={videoWrapperRef}
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
                    count={5}
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
                    count={5}
                    exitOffset="0.5em"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default FeaturedVideoWebGL;
