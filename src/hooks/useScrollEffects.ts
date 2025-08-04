import { useEffect } from 'react';

export function useScrollBehavior() {
  useEffect(() => {
    // Enhanced smooth scrolling with better performance
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-snap-type: y proximity;
      }
      
      body {
        overflow-x: hidden;
      }
      
      .scroll-snap-section {
        scroll-snap-align: start;
        scroll-snap-stop: normal;
        min-height: 100vh;
        position: relative;
      }
      
      .scroll-snap-center {
        scroll-snap-align: center;
      }
      
      /* Smooth transitions for all elements */
      * {
        transition: opacity 0.3s cubic-bezier(0.25, 0.1, 0.25, 1),
                   transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
      }
      
      /* Custom scrollbar with modern design */
      ::-webkit-scrollbar {
        width: 6px;
      }
      
      ::-webkit-scrollbar-track {
        background: hsl(var(--muted) / 0.3);
        border-radius: 3px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
        border-radius: 3px;
        transition: all 0.3s ease;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, hsl(var(--primary-glow)), hsl(var(--secondary)));
        box-shadow: 0 0 10px hsl(var(--primary) / 0.3);
      }
      
      /* Firefox scrollbar */
      html {
        scrollbar-width: thin;
        scrollbar-color: hsl(var(--primary)) hsl(var(--muted) / 0.3);
      }
      
      /* Reduce motion for accessibility */
      @media (prefers-reduced-motion: reduce) {
        html {
          scroll-behavior: auto;
        }
        
        * {
          transition: none !important;
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Smooth scroll polyfill for better cross-browser support
    const smoothScrollTo = (target: number, duration: number = 800) => {
      const start = window.pageYOffset;
      const distance = target - start;
      const startTime = performance.now();

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const scroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, start + distance * easeProgress);
        
        if (progress < 1) {
          requestAnimationFrame(scroll);
        }
      };

      requestAnimationFrame(scroll);
    };

    // Override default scroll behavior for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;
        
        if (targetElement) {
          const targetPosition = targetElement.offsetTop - 80; // Account for header
          smoothScrollTo(targetPosition);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.head.removeChild(style);
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
}

export function useSmoothScroll() {
  useEffect(() => {
    // Legacy smooth scrolling - kept for backward compatibility
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-snap-type: y proximity;
      }
      
      .scroll-snap-section {
        scroll-snap-align: start;
        scroll-snap-stop: normal;
      }
      
      .scroll-snap-center {
        scroll-snap-align: center;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 6px;
      }
      
      ::-webkit-scrollbar-track {
        background: hsl(var(--muted) / 0.3);
        border-radius: 3px;
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
        border-radius: 3px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, hsl(var(--primary-glow)), hsl(var(--secondary)));
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
}

export function useScrollToTop() {
  const scrollToTop = (smooth: boolean = true) => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  const scrollToSection = (id: string, offset: number = 80) => {
    const element = document.getElementById(id);
    if (element) {
      const targetPosition = element.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return { scrollToTop, scrollToSection };
}

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = React.useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    };

    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [lastScrollY]);

  return scrollDirection;
}

// Utility function for throttling
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}