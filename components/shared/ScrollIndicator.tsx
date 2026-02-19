"use client";

import { usePathname } from "next/navigation";

/**
 * ScrollIndicator - A vertical scroll progress indicator
 * 
 * This component renders a fixed position scroll bar on the right side
 * of the viewport. The indicator bar position is controlled by the
 * LenisProvider's scroll event handler via DOM manipulation.
 * 
 * The indicator auto-hides after 800ms of scroll inactivity.
 */
export function ScrollIndicator() {
  const pathname = usePathname();
  const isAboutPage = pathname === '/about';

  return (
    <div id="scroll-indicator" className={isAboutPage ? "inverted" : ""}>
      <div id="scroll-indicator-bar" />
    </div>
  );
}

export default ScrollIndicator;

