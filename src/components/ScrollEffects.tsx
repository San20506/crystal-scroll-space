import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  className = '' 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getInitialValues = () => {
    switch (direction) {
      case 'up': return { y: 100, x: 0 };
      case 'down': return { y: -100, x: 0 };
      case 'left': return { y: 0, x: 100 };
      case 'right': return { y: 0, x: -100 };
      default: return { y: 100, x: 0 };
    }
  };

  const initial = getInitialValues();
  const y = useTransform(scrollYProgress, [0, 0.3], [initial.y, 0]);
  const x = useTransform(scrollYProgress, [0, 0.3], [initial.x, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ y, x, opacity, scale }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className = '' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScrollTriggerProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide' | 'scale' | 'rotate';
  threshold?: number;
  className?: string;
}

export function ScrollTrigger({ 
  children, 
  animation = 'fade',
  threshold = 0.3,
  className = ''
}: ScrollTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getAnimationValues = () => {
    switch (animation) {
      case 'fade':
        return {
          opacity: useTransform(scrollYProgress, [0, threshold], [0, 1]),
        };
      case 'slide':
        return {
          y: useTransform(scrollYProgress, [0, threshold], [50, 0]),
          opacity: useTransform(scrollYProgress, [0, threshold], [0, 1]),
        };
      case 'scale':
        return {
          scale: useTransform(scrollYProgress, [0, threshold], [0.8, 1]),
          opacity: useTransform(scrollYProgress, [0, threshold], [0, 1]),
        };
      case 'rotate':
        return {
          rotate: useTransform(scrollYProgress, [0, threshold], [-180, 0]),
          opacity: useTransform(scrollYProgress, [0, threshold], [0, 1]),
        };
      default:
        return {
          opacity: useTransform(scrollYProgress, [0, threshold], [0, 1]),
        };
    }
  };

  const animationValues = getAnimationValues();

  return (
    <motion.div
      ref={ref}
      style={animationValues}
      className={className}
    >
      {children}
    </motion.div>
  );
}