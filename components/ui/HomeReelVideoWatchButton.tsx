import React from "react";
import clsx from "clsx";

const HomeReelVideoWatchButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
    className = "",
    ...props
}) => {
    return (
        <button
            id="home-reel-video-watch-btn"
            aria-label="Watch reel button"
            className={clsx(
                "relative flex items-center justify-center",
                "w-[8rem] h-[5rem]",
                "rounded-full overflow-hidden",
                "transition-transform duration-300",
                "group",
                className
            )}
            {...props}
        >
            {/* OUTLINE / BASE */}
            <div
                id="home-reel-video-watch-btn-base"
                className="absolute inset-0 rounded-full bg-white"
            />

            {/* FILL ANIMATION (BOTTOM → TOP) */}
            <div
                id="home-reel-video-watch-btn-background"
                className={clsx(
                    "absolute inset-0 rounded-full bg-[#f23084]",
                    "origin-bottom translate-y-full",
                    "transition-transform duration-200 ease-out",
                    "group-hover:translate-y-0"
                )}
            />

            {/* SMALLER ICON */}
            <svg
                id="home-reel-video-watch-btn-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 36 36"
                className={clsx(
                    "relative z-10 w-[2rem] h-[2rem]",
                    "text-black transition-colors duration-300 group-hover:text-white",
                    "group-hover:scale-[1.06] transition-transform"
                )}
                fill="currentColor"
            >
                <path d="M7 7.29c0-1.5 1.59-2.466 2.92-1.776l20.656 10.71c1.439.747 1.439 2.805 0 3.552L9.92 30.486C8.589 31.176 7 30.21 7 28.71V7.29Z" />
            </svg>
        </button>
    );
};

export default HomeReelVideoWatchButton;
