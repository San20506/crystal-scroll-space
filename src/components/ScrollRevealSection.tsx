import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver, useScrollProgress } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fadeDirection?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  enableScrollProgress?: boolean;
}

export function ScrollRevealSection({
  children,
  className,
  id,
  fadeDirection = 'up',
  delay = 0,
  duration = 0.3,
  threshold = 0.1,
  rootMargin = '0px 0px -10% 0px',
  enableScrollProgress = false,
}: ScrollRevealSectionProps) {
  const { elementRef: intersectionRef, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  const { elementRef: progressRef, scrollProgress } = useScrollProgress();

  // Combine refs
  const combinedRef = React.useCallback((node: HTMLElement | null) => {
    if (intersectionRef) {
      (intersectionRef as React.MutableRefObject<HTMLElement | null>).current = node;
    }
    if (progressRef && enableScrollProgress) {
      (progressRef as React.MutableRefObject<HTMLElement | null>).current = node;
    }
  }, [intersectionRef, progressRef, enableScrollProgress]);

  const getInitialTransform = () => {
    switch (fadeDirection) {
      case 'up':
        return { y: 60, opacity: 0 };
      case 'down':
        return { y: -60, opacity: 0 };
      case 'left':
        return { x: -60, opacity: 0 };
      case 'right':
        return { x: 60, opacity: 0 };
      case 'fade':
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateTransform = () => {
    switch (fadeDirection) {
      case 'up':
      case 'down':
        return { y: 0, opacity: 1 };
      case 'left':
      case 'right':
        return { x: 0, opacity: 1 };
      case 'fade':
      default:
        return { opacity: 1 };
    }
  };

  const progressOpacity = enableScrollProgress 
    ? Math.max(0.3, 1 - scrollProgress * 0.7)
    : 1;

  return (
    <motion.section
      ref={combinedRef}
      id={id}
      className={cn(
        'relative scroll-snap-section',
        'transition-all duration-300 ease-out',
        className
      )}
      initial={getInitialTransform()}
      animate={hasIntersected ? getAnimateTransform() : getInitialTransform()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{
        opacity: enableScrollProgress ? progressOpacity : undefined,
      }}
    >
      {children}
    </motion.section>
  );
}

interface ScrollRevealContentProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function ScrollRevealContent({
  children,
  className,
  delay = 0,
  stagger = 0.1,
}: ScrollRevealContentProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '0px 0px -5% 0px',
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={elementRef}
      className={className}
      initial={{ opacity: 0 }}
      animate={hasIntersected ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          initial={{ y: 30, opacity: 0 }}
          animate={hasIntersected ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{
            duration: 0.3,
            delay: delay + index * stagger,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}