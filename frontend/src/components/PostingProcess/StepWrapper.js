import { motion, AnimatePresence } from 'framer-motion';

const transition = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1],
};

const slideVariants = {
    next: {
        initial: { opacity: 0, x: 80, filter: 'blur(8px)' },
        animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition },
        exit: { opacity: 0, x: -80, filter: 'blur(8px)', transition },
    },
    prev: {
        initial: { opacity: 0, x: -80, filter: 'blur(8px)' },
        animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition },
        exit: { opacity: 0, x: 80, filter: 'blur(8px)', transition },
    },
};

function StepWrapper({ children, direction = 'next' }) {
    const variantSet = slideVariants[direction];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={children.key}
                initial={variantSet.initial}
                animate={variantSet.animate}
                exit={variantSet.exit}
                style={{
                    willChange: 'transform, opacity, filter',
                    overflow: 'hidden',
                    transformOrigin: 'center center',
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export default StepWrapper;
