import React from "react";

type ScrollTextProps = React.HTMLAttributes<HTMLDivElement>;

interface PlusIconProps {
  className?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({ className }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-4 h-4 lg:w-4 lg:h-4 ${className || ""}`}
  >
    <path
      d="M11.7581 0.149597V9.84198H21.4504V11.758H11.7581V21.4504H9.84204V11.758H0.149658V9.84198H9.84204V0.149597H11.7581Z"
      fill="#1B1B1B"
      stroke="black"
      strokeWidth="0.3"
    />
  </svg>
);

const ScrollText: React.FC<ScrollTextProps> = (props) => {
  return (
    <div
      className="w-full flex items-center justify-between font-medium uppercase text-lg sm:text-xl lg:text-xl font-Aeonik"
      {...props}
    >
      <PlusIcon className="font-light" />
      <PlusIcon className="hidden md:inline-block" />
      <div className="mx-2 lg:mx-4">Scroll to Explore</div>
      <PlusIcon className="hidden md:inline-block" />
      <PlusIcon />
    </div>
  );
};

export default ScrollText;
