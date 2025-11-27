"use client";

import { useSpring, a } from "@react-spring/web";

type ButtonVariant = "black" | "white" | "primary";

interface ButtonProps {
    text: string;
    animate?: boolean;
    variant?: ButtonVariant;
    onClick?: () => void;
}

const Button = ({
    text,
    animate = true,
    variant = "black",
    onClick,
}: ButtonProps) => {
    // Spring for the background overlay (scales from left)
    const [bgSprings, bgApi] = useSpring(() => ({
        from: { scaleX: 0 },
        config: { duration: 250 }, // Changed to duration for a smooth, non-bouncy wipe
    }));

    // Spring for the circle (fades out)
    const [circleSprings, circleApi] = useSpring(() => ({
        from: { opacity: 1 },
        config: { tension: 250, friction: 20 },
    }));

    // Spring for the arrow (fades in)
    const [arrowSprings, arrowApi] = useSpring(() => ({
        from: { opacity: 0 },
        config: { tension: 250, friction: 20 },
    }));

    const handleMouseEnter = () => {
        if (!animate) return;
        bgApi.start({ scaleX: 1 });
        circleApi.start({ opacity: 0 });
        arrowApi.start({ opacity: 1 });
    };

    const handleMouseLeave = () => {
        if (!animate) return;
        bgApi.start({ scaleX: 0 });
        circleApi.start({ opacity: 1 });
        arrowApi.start({ opacity: 0 });
    };

    // Removed hover: variants as animation handles it
    const variantClasses = {
        black: "bg-black text-white",
        white: "bg-white text-black",
        primary: "bg-brblue text-white",
    };

    return (
        <button
            type="button"
            className={`
                relative overflow-hidden
                rounded-full px-5 py-4 md:px-5 md:py-4  /* Mobile padding smaller, desktop same */
                font-[400] text-xs md:text-lg font-Aeonik /* Mobile font smaller, desktop same */
                flex items-center justify-between
                shadow-md
                transition-colors duration-300
                ${variantClasses[variant]}
            `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {/* Background Overlay */}
            <a.div
                style={bgSprings}
                className="absolute inset-0 bg-[#FF7B00] rounded-full transform-origin-left"
            />

            {/* Content Wrapper (needs to be above the overlay) */}
            <span className="relative z-10 flex items-center">
                <a.div style={circleSprings} className="flex items-center">
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="5" cy="5" r="5" fill={variant === "white" ? "black" : "white"} />
                    </svg>
                </a.div>

                <a.div className="ml-2"> {/* Removed spring from text */}
                    {text}
                </a.div>
            </span>

            {/* Arrow (positioned on the right by justify-between) */}
            <a.div style={arrowSprings} className="relative z-10 ml-2">
                ➔
            </a.div>
        </button>
    );
};

export default Button;
