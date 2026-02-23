"use client";

import { useEffect, useState } from "react";

export const TAB_BRAKEPOINT = 1024;
export const DEVICE_BRAKEPOINT = 768;

/**
 * Returns whether viewport is below breakpoint. Uses false on server and first client paint
 * to avoid hydration mismatch; updates in useEffect. May cause one layout update after mount.
 */
export const useIsMobile = (breakpoint = DEVICE_BRAKEPOINT) => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < breakpoint);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, [breakpoint]);
    return isMobile;
};
