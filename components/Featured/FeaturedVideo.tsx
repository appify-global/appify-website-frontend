"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TAB_BRAKEPOINT, useIsMobile } from "@/hooks/UseIsMobile";
import { RollerText } from "../RollerText";
import MarqueePlusRow from "../MarqueePlusRow";
import HomeReelVideoWatchButton from "../ui/HomeReelVideoWatchButton";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reference site (Lusion.co) - Accurate measurements:
 * 
 * INITIAL STATE:
 * - Video positioned at LEFT: 5vw (60px on 1200px viewport)
 * - Video width: 40.3% (484px on 1200px viewport)
 * - Video has 16:9 aspect ratio
 * - Video is at the SAME vertical level as the text
 * 
 * ANIMATION (happens in phases):
 * Phase 1 (scroll 0-50%): Video stays mostly static, text parallaxes up
 * Phase 2 (scroll 50-100%): Video scales from 0.45→1.0 with 3D perspective warp
 * 
 * FINAL STATE:
 * - Video width: 90% (1080px), centered with 5% margins
 * - PLAY REEL overlay visible
 * - Plus sign rows appear above/below
 * 
 * SECTION HEIGHT: ~2152px (2.9x viewport) for the scroll space
 */

interface FeaturedVideoProps {
  /** @deprecated - kept for API compatibility */
  topkeyframe?: string;
  className?: string;
  playerClassName?: string;
  playerId?: string;
  /** @deprecated - kept for API compatibility */
  scrollToOverrideId?: string;
  /** @deprecated - kept for API compatibility */
  refForward?: React.RefObject<HTMLElement | null>;
  /** Skip the 3D tilt animation */
  disableTilt?: boolean;
}

const FeaturedVideo = ({
  topkeyframe: _topkeyframe,
  className,
  playerClassName,
  playerId,
  scrollToOverrideId: _scrollToOverrideId,
  refForward: _refForward,
  disableTilt = false,
}: FeaturedVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile(TAB_BRAKEPOINT);

  const [showPlayReel, setShowPlayReel] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Programmatically play video on mount
  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Autoplay was prevented, but that's okay - user can click to play
          console.log('Video autoplay prevented:', error);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isMobile || !containerRef.current || !videoWrapperRef.current) return;

    if (disableTilt) {
      setShowPlayReel(true);
      return;
    }

    // Set initial 3D rotation (inline style handles initial width)
    gsap.set(videoWrapperRef.current, {
      rotateX: 8,
      rotateY: -2,
    });

    const ctx = gsap.context(() => {
      // Animation: Video stays at initial width, just flattens the 3D rotation
      gsap.to(
        videoWrapperRef.current,
        {
          rotateX: 0,
          rotateY: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            scroller: document.body,
            start: "top 50%",
            end: "top -30%",
            scrub: 1.5,
            onUpdate: (self) => {
              setShowPlayReel(self.progress > 0.65);
            },
          },
        }
      );
    });

    return () => ctx.revert();
  }, [isMobile, disableTilt]);

  // Mobile layout
  if (isMobile) {
    return (
      <div className="w-full">
        <div className="flex flex-col items-center space-y-3 w-full">
          <div id={playerId} />
          
          <div 
            className="w-full relative overflow-hidden" 
            style={{ 
              borderRadius: '12px', 
              aspectRatio: '16 / 9',
            }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src="https://cdn.ebadfd.tech/Appify_Introduction_CEO_cropped.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={{ borderRadius: "12px" }}
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

  // Desktop layout with GSAP scroll animation
  // Key: Video starts at 40.3% width on left, expands to 90% centered
  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{
        height: 'auto',
      }}
    >
      <div
        style={disableTilt ? undefined : {
          perspective: '1200px',
          perspectiveOrigin: 'left center',
        }}
      >
        <div
          ref={videoWrapperRef}
          className={`relative z-30 ${className ?? ""}`}
          style={{
            width: '100%',
            transformOrigin: 'left top',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
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

            {/* Video container - 16:9 aspect with object-fit cover */}
            <div 
              className="w-full relative overflow-hidden" 
              style={{ 
                borderRadius: '12px',
                aspectRatio: '16 / 9',
              }}
            >
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full"
                src="https://cdn.ebadfd.tech/Appify_Introduction_CEO_cropped.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              />
              
              {/* PLAY REEL overlay - fades in when video is expanded */}
              <AnimatePresence>
                {showPlayReel && (
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer text-white tracking-[0.2em] font-light z-50"
                    style={{ 
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                      background: 'rgba(0,0,0,0.15)',
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
            </div>

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
        </div>
      </div>
    </div>
  );
};

export default FeaturedVideo;
