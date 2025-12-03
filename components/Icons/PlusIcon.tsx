/**
 * PlusIcon - Shared plus/cross icon component used across the application
 * 
 * This component replaces the duplicated PlusIcon implementations found in:
 * - AboutHero.tsx
 * - ServicesHero.tsx
 * - ServicesFooterCTA.tsx
 * - CategorySection.tsx
 * - etc.
 */

interface PlusIconProps {
  className?: string;
  /** Icon color - defaults to currentColor */
  color?: string;
  /** Stroke width for the outline - defaults to 0.3 */
  strokeWidth?: number;
}

export const PlusIcon = ({ 
  className = "w-4 h-4 lg:w-5 lg:h-5", 
  color,
  strokeWidth = 0.3 
}: PlusIconProps) => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M11.7581 0.149597V9.84198H21.4504V11.758H11.7581V21.4504H9.84204V11.758H0.149658V9.84198H9.84204V0.149597H11.7581Z"
      fill={color ?? "currentColor"}
      stroke={color ?? "currentColor"}
      strokeWidth={strokeWidth}
    />
  </svg>
);

/**
 * PlusIconRow - A row of plus icons used as separators
 * Commonly used between sections
 */
interface PlusIconRowProps {
  /** Number of icons to show (default: 5 on desktop, 2 on mobile) */
  count?: number;
  className?: string;
  iconClassName?: string;
}

export const PlusIconRow = ({ 
  count = 5, 
  className = "py-4",
  iconClassName = "w-4 h-4 lg:w-5 lg:h-5"
}: PlusIconRowProps) => (
  <div className={`flex items-center justify-between w-full ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <PlusIcon 
        key={i} 
        className={`${iconClassName} ${i > 0 && i < count - 1 ? 'hidden lg:block' : ''}`} 
      />
    ))}
  </div>
);

export default PlusIcon;

