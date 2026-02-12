"use client";
import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { TAB_BRAKEPOINT, useIsMobile } from "@/hooks/UseIsMobile";
import { RollerText } from "../RollerText";
import MarqueePlusRow from "../MarqueePlusRow";
import HomeReelVideoWatchButton from "../ui/HomeReelVideoWatchButton";

/**
 * FeaturedVideoWebGL - CSS 3D Transform implementation for liquid glass effect
 * 
 * Uses CSS 3D transforms instead of WebGL for better reliability and performance.
 * The effect mimics Lusion.co's liquid glass warp through perspective, rotateX/Y, and skew.
 * 
 * Animation phases (matching Lusion.co):
 * 1. Video starts small (40.3vw) on LEFT, completely FLAT
 * 2. Text parallaxes up while video stays static
 * 3. Video gains 3D perspective warp and starts expanding
 * 4. Video continues expanding while warp intensity peaks
 * 5. Video flattens to 90vw, centered, PLAY REEL appears
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
  
  // Local video source - no CORS issues
  const videoSrc = "/Videos/Appify_Introduction_CEO_cropped.mp4";

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 80%"],
  });

  // Smooth the progress for buttery animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // === ANIMATION TRANSFORMS ===
  // Designed to match Lusion.co's behavior:
  // - Start small and flat on left
  // - Build warp effect during middle of scroll
  // - End large and flat, centered
  
  // Width: 40.3vw -> 90vw
  const width = useTransform(
    smoothProgress,
    [0, 0.15, 0.5, 0.75],
    ["40.3vw", "40.3vw", "70vw", "90vw"]
  );
  
  // Vertical position: Start lower, push down more as video expands
  // After 0.65, push down further for play reel reveal
  const y = useTransform(
    smoothProgress,
    [0, 0.5, 0.65, 0.75, 1],
    ["5vh", "35vh", "90vh", "35vh", "40vh"]
  );

  // 3D Perspective transforms for liquid glass effect
  // rotateX: Tips forward/backward
  const rotateX = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.55, 0.75],
    [0, 0, 12, 6, 0]  // Flat -> peak warp -> flat
  );
  
  // rotateY: Slight side tilt for more 3D feel
  const rotateY = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.55, 0.75],
    [0, 0, -3, -1.5, 0]
  );
  
  // skewY: Adds to the liquid distortion
  const skewY = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.55, 0.75],
    [0, 0, 2, 1, 0]
  );
  
  // Scale for subtle depth pulse during warp
  const scale = useTransform(
    smoothProgress,
    [0, 0.35, 0.55],
    [1, 1.02, 1]
  );

  // Border radius
  const borderRadius = useTransform(
    smoothProgress,
    [0, 0.75],
    ["16px", "12px"]
  );

  // Shadow intensity - stronger during warp phase
  const shadowOpacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.55, 0.75],
    [0.15, 0.15, 0.4, 0.3, 0.2]
  );

  // Box shadow derived from shadow opacity - MUST be at top level, not inside JSX
  const boxShadow = useTransform(
    shadowOpacity,
    (opacity) => `0 40px 80px rgba(0, 0, 0, ${opacity}), 0 20px 40px rgba(0, 0, 0, ${opacity * 0.6})`
  );

  // Horizontal position: animate from left-aligned to centered as video expands
  // This prevents video from cutting off screen during expansion
  const x = useTransform(
    smoothProgress,
    [0, 0.15, 0.5, 0.75],
    ["0vw", "0vw", "5vw", "0vw"]
  );

  // Track scroll progress for PLAY REEL visibility
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setShowPlayReel(value > 0.65);
  });
  
  // Mobile layout - simple video without complex animation
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
  
  // Desktop layout with CSS 3D transforms
  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ height: "200vh" }}
    >
      {/* Sticky container - keeps video in viewport during scroll */}
      <div
        className="sticky w-full flex items-start"
        style={{
          top: "12vh",
          height: "80vh",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          perspective: "1200px",
          perspectiveOrigin: "center center",
        }}
      >
        {/* Video container with CSS 3D transforms */}
        <motion.div
          className={`relative ${className ?? ""}`}
          style={{
            width,
            x,
            y,
            rotateX,
            rotateY,
            skewY,
            scale,
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            zIndex: 20,
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
            
            {/* Video wrapper with shadow - slightly wider aspect to crop letterboxing */}
            <motion.div 
              className="w-full relative overflow-hidden"
              style={{ 
                aspectRatio: "2.1 / 1", // Wider to crop black bars from video
                borderRadius,
                boxShadow,
              }}
            >
              {/* Native HTML5 video element - scaled to crop letterboxing */}
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
                  transform: "scale(1.08)", // Scale up slightly to crop black bars
                  transformOrigin: "center center",
                }}
              />
              
              {/* PLAY REEL overlay */}
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
