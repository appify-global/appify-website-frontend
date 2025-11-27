"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const RollerText = ({
    text,
    className,
    stagger = 0.05,
}: {
    text: string;
    className?: string;
    stagger?: number;
}) => {
    const letters = Array.from(text);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const idx = Math.floor(Math.random() * letters.length);
            setActiveIndex(idx);

            // Reset after flip finishes
            setTimeout(() => setActiveIndex(null), 850);
        }, 2000); // you set this to 2s

        return () => clearInterval(interval);
    }, [letters.length]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
                delayChildren: 0.2,
            },
        },
    };

    return (
        <motion.span
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: "inline-block" }}
        >
            {letters.map((char, index) => {
                const isActive = index === activeIndex;

                return (
                    <span
                        key={index}
                        style={{
                            display: "inline-block",
                            overflow: "hidden",
                            height: "1em",
                            lineHeight: 1,
                        }}
                    >
                        <motion.span
                            style={{ display: "inline-block" }}
                            animate={
                                isActive
                                    ? {
                                        rotateX: [0, 360],
                                        opacity: [1, 0.7, 1],
                                        scale: [1, 1.05, 1],
                                        transition: {
                                            duration: 0.8,               // slower + smoother
                                            ease: [0.17, 0.84, 0.44, 1], // fast → slow (easeOutCubic feel)
                                        },
                                    }
                                    : {}
                            }
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    </span>
                );
            })}
        </motion.span>
    );
};
