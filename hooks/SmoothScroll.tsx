import { useEffect } from "react";

const SmoothScroll = () => {
    useEffect(() => {
        // Virtual scroll setup
        let targetScroll = window.scrollY;
        let currentScroll = window.scrollY;
        const ease = 0.08;

        const onScroll = () => {
            targetScroll = window.scrollY;
        };

        const smooth = () => {
            currentScroll += (targetScroll - currentScroll) * ease;
            window.scrollTo(0, currentScroll);
            requestAnimationFrame(smooth);
        };

        window.addEventListener("scroll", onScroll);
        requestAnimationFrame(smooth);

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return null;
};

export default SmoothScroll;
