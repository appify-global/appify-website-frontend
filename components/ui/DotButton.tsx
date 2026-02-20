import Link from "next/link";

type ButtonVariant = "black" | "white" | "primary";
interface ButtonProps {
    text: string;
    animate?: boolean;
    variant?: ButtonVariant;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    href?: string;
    target?: React.HTMLAttributeAnchorTarget;
    rel?: string;
    /** When true, renders a submit button for use inside a form. */
    type?: "submit" | "button";
    disabled?: boolean;
}

const DotButton = ({ text, variant = "black", className = "", onClick, href, target, rel, type, disabled }: ButtonProps) => {
  const buttonClasses = variant === "black" ? "black-btn " : "white-btn " + className;
  const isPopupSubmit = type === "submit" && variant === "white";
  const popupCtaContent = (
    <>
      <span className="popup-cta-dot" />
      <span className="popup-cta-text">{text}</span>
      <span className="popup-cta-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984" />
        </svg>
      </span>
    </>
  );
  const content = (
    <>
      <span id={isPopupSubmit ? undefined : "home-reel-cta-dot"} />
      <span id={isPopupSubmit ? undefined : "home-reel-cta-text"}>{text}</span>
      {!isPopupSubmit && (
        <span id="home-reel-cta-arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.343 8h11.314m0 0L8.673 3.016M13.657 8l-4.984 4.984"
            ></path>
          </svg>
        </span>
      )}
    </>
  );

  if (type === "submit") {
    return (
      <button
        type="submit"
        disabled={disabled}
        className={isPopupSubmit ? "popup-cta-btn " + (className || "") : buttonClasses + " w-full flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[52px] disabled:opacity-60 disabled:cursor-not-allowed"}
        id={isPopupSubmit ? undefined : "home-reel-cta"}
      >
        {isPopupSubmit ? popupCtaContent : content}
      </button>
    );
  }

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          className={buttonClasses}
          onClick={onClick}
          id="home-reel-cta"
          target={target ?? "_blank"}
          rel={rel ?? "noopener noreferrer"}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={buttonClasses} onClick={onClick} id="home-reel-cta">
        {content}
      </Link>
    );
  }

  return (
    <a id="home-reel-cta" className={buttonClasses} onClick={onClick} target="_blank">
      {content}
    </a>
  );
};

export default DotButton;
