import React, { useRef, useState } from "react";
import Menu from "./Menu";

const MenuButton: React.FC = () => {
  const [isOpen, open] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    ref.current?.classList.toggle("--opened");
    open((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;
      return newIsOpen;
    });
  };

  const handleWindowClick = (event: MouseEvent | TouchEvent) => {
    if (isOpen) {
      open(false);
      ref.current?.classList.remove("--opened");
    }
  };

  return (
    <>
      <Menu open={isOpen} onOutsideClick={handleWindowClick} />
      <button
        id="header-right-menu-btn"
        aria-label="Menu button"
        style={{ transform: "translate3d(0px, 0em, 0px)" }}
        onClick={handleClick}
        ref={ref}
      >
        <div id="header-right-menu-btn-inner">
          <span id="header-right-menu-btn-text" className="font-Aeonik uppercase font-medium text-lg p-0">Menu</span>
          <span id="header-right-menu-btn-text-close" className="font-Aeonik uppercase font-medium text-lg p-0">Close</span>
          <div id="header-right-menu-btn-dots">
            <span className="header-right-menu-btn-dot"></span>
            <span className="header-right-menu-btn-dot"></span>
          </div>
        </div>
      </button>
    </>
  );
};

export default MenuButton;
