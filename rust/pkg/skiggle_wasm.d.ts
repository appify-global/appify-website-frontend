// Type definitions for skiggle_wasm stub module

export default function initWasmModule(): Promise<void>;

export function generate_skiggle_path_2(): string;
export function generate_skiggle_path(): string;
export function generate_skiggle_ai_path(): string;
export function compute_dashoffset_rev(progress: number, length: number): number;

export function compute_hover(
  targetX: number,
  targetY: number,
  currentX: number,
  currentY: number,
  hovered: boolean
): {
  tx: number;
  ty: number;
  rx: number;
  ry: number;
  scale: number;
};

export function calculate_image_ref_transform(): string;
export function calc_image_ref_on_leave(): string;

export function compute_card_state(
  progress: number,
  index: number,
  rotations: number[],
  positions: number[]
): {
  front_rot: number;
  back_rot: number;
  left: number;
  rot: number;
};




