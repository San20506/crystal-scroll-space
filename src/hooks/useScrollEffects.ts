import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    // Add smooth scrolling behavior
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-snap-type: y mandatory;
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
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: hsl(var(--muted));
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
        border-radius: 4px;
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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return { scrollToTop, scrollToSection };
}