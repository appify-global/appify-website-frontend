"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, useMotionValue, animate } from "framer-motion";
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
  /** Callback when reel state changes */
  onReelStateChange?: (isInReel: boolean) => void;
}

const FeaturedVideoWebGL = ({
  topkeyframe: _topkeyframe,
  className,
  playerClassName,
  playerId,
  scrollToOverrideId: _scrollToOverrideId,
  refForward: _refForward,
  onReelStateChange,
}: FeaturedVideoWebGLProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);
  const reelContainerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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

        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;

        // Check thumbnail container position
        const thumbRect = thumbnailRef.current?.getBoundingClientRect();
        if (!thumbRect) {
          ticking = false;
          return;
        }

        // Check if more than half of the thumbnail has passed the center line
        // This means the thumbnail's center point is above the viewport center
        const thumbCenter = thumbRect.top + thumbRect.height / 2;
        
        // Buffer zone: 20px to prevent premature transitions when very close to center
        // When scrolling down: thumbnail needs to be more than 20px above center to transition to reel
        // When scrolling up: thumbnail needs to be at or below center (no buffer) to transition back to thumbnail
        const CENTER_BUFFER = 20;
        const distanceFromCenter = viewportCenter - thumbCenter; // Positive when thumb is below center
        
        // Determine if we should be in reel state
        // For going to reel (scrolling down): thumb center must be more than buffer above center
        // For going back to thumbnail (scrolling up): thumb center must be at or below center
        let shouldBeInReelState;
        if (scrollDirection === 1) {
          // Scrolling down: need more than buffer above center
          shouldBeInReelState = distanceFromCenter < -CENTER_BUFFER;
        } else if (scrollDirection === -1) {
          // Scrolling up: need to be at or below center (no buffer)
          shouldBeInReelState = distanceFromCenter < 0;
        } else {
          // No scroll direction yet: use current state logic without buffer
          shouldBeInReelState = distanceFromCenter < 0;
        }

        // Transition to reel position if needed
        if (shouldBeInReelState && !isInReelState) {
          setIsInReelState(true);
          onReelStateChange?.(true);
          animate(animationProgressValue, 1, {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          });
        } else if (!shouldBeInReelState && isInReelState) {
          setIsInReelState(false);
          onReelStateChange?.(false);
          animate(animationProgressValue, 0, {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
          });
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

  // Programmatically play video on mount and when video is ready
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Autoplay was prevented, but that's okay - user can click to play
          console.log('Video autoplay prevented:', error);
        });
      }
    };

    // Try to play immediately
    tryPlay();

    // Also try when video can play
    video.addEventListener('canplay', tryPlay, { once: true });
    video.addEventListener('loadeddata', tryPlay, { once: true });

    return () => {
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
    };
  }, []);

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
              ref={videoRef}
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
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.play().catch((error) => {
                    console.log('Video play failed:', error);
                  });
                }
              }}
            />

            <div
              className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-white tracking-[0.15em] font-light z-50 bg-black/10"
              style={{ borderRadius: "12px" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const video = videoRef.current;
                if (video) {
                  console.log('Attempting to play video from mobile overlay...', {
                    readyState: video.readyState,
                    paused: video.paused,
                    muted: video.muted
                  });
                  // Toggle mute/unmute when user clicks
                  video.muted = !video.muted;
                  const playPromise = video.play();
                  if (playPromise !== undefined) {
                    playPromise
                      .then(() => {
                        console.log('Video playing successfully', {
                          paused: video.paused,
                          muted: video.muted
                        });
                      })
                      .catch((error) => {
                        console.error('Video play failed:', error);
                      });
                  }
                } else {
                  console.error('Video ref is null');
                }
              }}
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
          top: "42vh", // Position moved up a tiny bit
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
        style={{ height: "120vh" }} // Reduced height to decrease space before expertise section
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
                ref={videoRef}
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
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const video = videoRef.current;
                  if (video) {
                    console.log('Attempting to play video...', {
                      readyState: video.readyState,
                      paused: video.paused,
                      muted: video.muted,
                      src: video.src
                    });
                    // Toggle mute/unmute when user clicks
                    video.muted = !video.muted;
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                      playPromise
                        .then(() => {
                          console.log('Video playing successfully', {
                            paused: video.paused,
                            muted: video.muted,
                            currentTime: video.currentTime,
                            duration: video.duration
                          });
                          // Double check it's actually playing
                          if (video.paused) {
                            console.warn('Video is paused after play() resolved');
                            video.play().catch(console.error);
                          }
                        })
                        .catch((error) => {
                          console.error('Video play failed:', error);
                        });
                    }
                  } else {
                    console.error('Video ref is null');
                  }
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
                      pointerEvents: 'auto',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const video = videoRef.current;
                      if (video) {
                        console.log('Attempting to play video from overlay...', {
                          readyState: video.readyState,
                          paused: video.paused,
                          muted: video.muted,
                          src: video.src
                        });
                        // Toggle mute/unmute when user clicks
                        video.muted = !video.muted;
                        // Force play and check if it actually plays
                        const playPromise = video.play();
                        if (playPromise !== undefined) {
                          playPromise
                            .then(() => {
                              console.log('Video playing successfully', {
                                paused: video.paused,
                                muted: video.muted,
                                currentTime: video.currentTime,
                                duration: video.duration
                              });
                              // Double check it's actually playing
                              if (video.paused) {
                                console.warn('Video is paused after play() resolved');
                                video.play().catch(console.error);
                              }
                            })
                            .catch((error) => {
                              console.error('Video play failed:', error);
                            });
                        }
                      } else {
                        console.error('Video ref is null');
                      }
                    }}
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
