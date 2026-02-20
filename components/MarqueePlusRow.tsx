import { motion, AnimatePresence } from "framer-motion";
import { AnimatedMarqueePlayIcon, PlusIconSVG } from "./Icons/icons";

const baseVariants = {
    initial: { opacity: 0, y: "0.5em" },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function MarqueePlusRow({ show, isHovering = false, direction = "right", count = 5, exitOffset = "0.5em" }: {
    isHovering: boolean,
    show: boolean,
    direction: "left" | "right",
    count: number,
    exitOffset: string,
}) {
    return (
        <>
            {show && (
                <div className="w-full flex">
                    <AnimatePresence mode="wait">
                        {isHovering ? (
                            <motion.div
                                key={`marquee-${direction}`}
                                className="w-full"
                                variants={{ ...baseVariants, exit: { opacity: 0, y: `-${exitOffset}` } }}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                <AnimatedMarqueePlayIcon className="h-2 w-auto text-black font-thin" direction={direction} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="plus-row"
                                className="w-full flex justify-between"
                                variants={{ ...baseVariants, exit: { opacity: 0, y: `-${exitOffset}`, transition: { duration: 0.15 } } }}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                            >
                                {[...Array(count)].map((_, i) => (
                                    <PlusIconSVG key={i} className="h-4 w-4 text-black font-thin" />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </>
    );
}
