import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-primary z-50 origin-left"
        style={{ scaleX }}
      />
      
      {/* Circular progress indicator */}
      <motion.div
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full border-4 border-muted z-50 hidden md:flex items-center justify-center glass-card"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-muted-foreground"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <motion.path
            className="text-primary"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            style={{
              pathLength: scrollYProgress
            }}
          />
        </svg>
        <div className="absolute text-xs font-medium text-foreground">
          <motion.span>
            {Math.round(scrollYProgress.get() * 100)}%
          </motion.span>
        </div>
      </motion.div>
    </>
  );
}