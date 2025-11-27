// Temporary stub module for skiggle_wasm
// This allows the app to run without the actual WASM files
// Note: Animations may not work as expected without the real WASM module

// Default export - initialization function
export default async function initWasmModule() {
  // Stub initialization - does nothing
  return Promise.resolve();
}

// Generate a simple SVG path (stub)
export function generate_skiggle_path_2() {
  // Return a simple path as fallback
  return "M 0 0 Q 100 50 200 0 T 400 0";
}

export function generate_skiggle_path() {
  return "M 0 0 Q 100 50 200 0 T 400 0";
}

export function generate_skiggle_ai_path() {
  return "M 0 0 Q 100 50 200 0 T 400 0";
}

// Compute dash offset (stub)
export function compute_dashoffset_rev(progress, length) {
  return length * (1 - progress);
}

// Compute hover state (stub)
export function compute_hover(targetX, targetY, currentX, currentY, hovered) {
  // Simple interpolation
  const lerp = 0.1;
  const tx = currentX + (targetX - currentX) * lerp;
  const ty = currentY + (targetY - currentY) * lerp;
  
  return {
    tx,
    ty,
    rx: hovered ? targetY * 0.1 : 0,
    ry: hovered ? targetX * 0.1 : 0,
    scale: hovered ? 1.05 : 1.0
  };
}

// Image transform calculations (stubs)
export function calculate_image_ref_transform() {
  return "transform 0.3s ease-out";
}

export function calc_image_ref_on_leave() {
  return "transform 0.5s ease-out";
}

// Compute card state (stub)
export function compute_card_state(progress, index, rotations, positions) {
  const rot = rotations[index] || 0;
  const pos = positions[index] || 50;
  
  return {
    front_rot: progress > 0.5 ? 180 : 0,
    back_rot: progress > 0.5 ? 0 : -180,
    left: pos,
    rot: rot * (1 - progress)
  };
}




