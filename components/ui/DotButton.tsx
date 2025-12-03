import Link from "next/link";

type ButtonVariant = "black" | "white" | "primary";
interface ButtonProps {
    text: string;
    animate?: boolean;
    variant?: ButtonVariant;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    href?: string;
}

const DotButton = ({ text, variant = "black", className = "", onClick, href }: ButtonProps) => {
  const buttonClasses = variant === "black" ? "black-btn " : "white-btn " + className;
  const content = (
    <>
      <span id="home-reel-cta-dot"></span>
      <span id="home-reel-cta-text">{text}</span>
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
    </>
  );

  if (href) {
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
