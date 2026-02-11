interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      className="nav_btn_sm flex items-center justify-center cursor-pointer"
    >
      <span className="text-[0.5rem]">⬤ ⬤</span>
    </button>
  );
}
