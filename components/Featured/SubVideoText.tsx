"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeaturedVideoWebGL from "./FeaturedVideoWebGL";
import DotButton from "../ui/DotButton";
import { TAB_BRAKEPOINT, useIsMobile } from "@/hooks/UseIsMobile";

gsap.registerPlugin(ScrollTrigger);

/**
 * ACCURATE Lusion.co Layout Replication
 * 
 * FIXES IMPLEMENTED (from user feedback):
 * 1. Text width NARROWER (~36% not 44%) - matches reference
 * 2. Video starts FLAT (handled in FeaturedVideoWebGL)
 * 3. Title moves up EARLIER - starts at "top 95%"
 * 4. Text maintains SPACING from title - more padding top
 * 5. Button moves with text at SAME PACE - same animation values
 * 6. Video doesn't cover button - z-index 40 on text container
 * 7. Video sits LOWER (handled in FeaturedVideoWebGL)
 * 
 * Reference Layout (1200px viewport):
 * - Video (LEFT): 5vw from left, 40.3% width
 * - Text (RIGHT): ~54% from left, ~36% width
 * - Spacing: ~9% gap between video and text
 */

interface SubVideoTextProps {
  ref?: React.RefObject<HTMLElement | null>;
}

const SubVideoText = ({ ref }: SubVideoTextProps) => {
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(TAB_BRAKEPOINT);
  const [isVideoInReel, setIsVideoInReel] = useState(false);

  useEffect(() => {
    if (!textRef.current || !buttonRef.current || !sectionRef.current || isMobile) return;

    let hasAnimated = false;

    const ctx = gsap.context(() => {
      // Set initial position - start lower
      gsap.set([textRef.current, buttonRef.current], {
        y: 100,
        opacity: 0,
      });

      // One-time animation when section enters viewport
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        scroller: document.body,
        start: "top 85%",
        onEnter: () => {
          if (!hasAnimated) {
            hasAnimated = true;
            
            // Animate text and button up together
            gsap.to([textRef.current, buttonRef.current], {
              y: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              onComplete: () => {
                // Clear transforms after animation to keep elements fixed
                if (textRef.current) {
                  gsap.set(textRef.current, { clearProps: "transform" });
                }
                if (buttonRef.current) {
                  gsap.set(buttonRef.current, { clearProps: "transform" });
                }
              },
            });
          }
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => ctx.revert();
  }, [isMobile]);

  // Animate text container upward when video moves to reel position, down when back to thumbnail
  useEffect(() => {
    if (!textContainerRef.current || isMobile) return;

    gsap.to(textContainerRef.current, {
      top: isVideoInReel ? '-3vh' : '6vh', // Move up more when in reel state, down when in thumbnail
      duration: 0.6,
      ease: "power2.inOut", // Smooth easing similar to cubic-bezier(0.25, 0.1, 0.25, 1)
    });
  }, [isVideoInReel, isMobile]);

  return (
    <div 
      ref={sectionRef} 
      className="relative z-20"
      style={{ marginTop: '4vw' }} // FIX #4: More spacing from title above
    >
      {/* 
        Layout container - Video on LEFT (40.3%), Text on RIGHT (36%)
        FIX #1: Text width reduced from 44% to 36%
      */}
      <div className="relative hidden lg:flex" style={{ minHeight: '180vh' }}>
        
        {/* VIDEO SECTION - Handles its own sticky positioning and animation */}
        <div 
          className="relative"
          style={{ 
            width: '100%',
            zIndex: 20, // Lower z-index so it doesn't cover text
          }}
        >
          <FeaturedVideoWebGL 
            refForward={ref}
            topkeyframe={"70vh"}
            playerId="about-us-video-player"
            onReelStateChange={setIsVideoInReel}
          />
        </div>

        {/* TEXT SECTION - Right side, absolutely positioned */}
        {/* FIX #1: Width reduced to 36% (was 44%) */}
        {/* FIX #4: More padding-top for spacing from title */}
        {/* FIX #6: z-index 40 so video doesn't cover it */}
        <div 
          ref={textContainerRef}
          className="absolute flex flex-col items-start text-left font-Aeonik pointer-events-auto"
          style={{
            top: '6vh',           // Moved even higher (was 12vh)
            left: '54%',          // FIX #1: Moved right (was 51%)
            width: '95%',         // Increased width (was 90%)
            maxWidth: '600px',    // Increased max width (was 480px)
            paddingRight: '5vw',
            zIndex: 40,           // FIX #6: Higher than video z-index
          }}
        >
          {/* Text paragraph */}
          <div
            ref={textRef}
            className="text-[1.1rem] xl:text-[1.15rem] leading-[1.6] font-Aeonik text-[#2B2E3A]"
            style={{ willChange: "transform" }}
          >
            Appify partners with enterprises and startups across Australia, UAE,
            and Qatar to build custom software. From AI-powered automation and
            machine learning solutions to enterprise ERP systems and mobile
            applications, we bring unprecedented ideas to life. Serving businesses
            in Sydney, Melbourne, Brisbane, Dubai, Abu Dhabi, and Doha.
          </div>

          {/* FIX #5: Button wrapper - same animation as text */}
          <div 
            ref={buttonRef}
            className="mt-8 flex justify-start pointer-events-auto"
            style={{ willChange: "transform" }}
          >
            <DotButton text="ABOUT US" onClick={() => window.location.href = "/about"} variant="white" />
          </div>
        </div>
      </div>

      {/* Mobile & Tablet layout - stacked single column */}
      <div className="lg:hidden flex flex-col">
        <div className="w-full">
          <FeaturedVideoWebGL
            refForward={ref}
            topkeyframe={"70vh"}
            playerId="about-us-video-player-mobile"
          />
        </div>

        <div className="mt-4 flex flex-col items-start text-left font-Aeonik px-1">
          <div className="text-base md:text-lg leading-[1.55] font-Aeonik text-[#2B2E3A]">
            Appify partners with enterprises and startups across Australia, UAE,
            and Qatar to build custom software. From AI-powered automation and
            machine learning solutions to enterprise ERP systems and mobile
            applications, we bring unprecedented ideas to life. Serving businesses
            in Sydney, Melbourne, Brisbane, Dubai, Abu Dhabi, and Doha.
          </div>
          <div className="mt-4">
            <DotButton text="ABOUT US" onClick={() => window.location.href = "/about"} variant="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubVideoText;
