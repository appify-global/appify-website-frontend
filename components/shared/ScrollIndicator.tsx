"use client";

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
  return (
    <div id="scroll-indicator">
      <div id="scroll-indicator-bar" />
    </div>
  );
}

export default ScrollIndicator;

