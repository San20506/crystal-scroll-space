import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Sparkles, MousePointer2 } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { ScrollRevealSection, ScrollRevealContent } from '@/components/ScrollRevealSection';

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      const targetPosition = nextSection.offsetTop - 80;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <ScrollRevealSection
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      fadeDirection="fade"
      enableScrollProgress={true}
    >
      <div ref={ref} className="absolute inset-0">
        {/* Interactive Background */}
        <motion.div
          className="absolute inset-0 parallax-bg"
          style={{ 
            y, 
            opacity,
            scale,
            x: mousePosition.x * 0.1,
            rotateY: mousePosition.x * 0.1
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" />
          
          {/* Interactive particles */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary/30 rounded-full"
                style={{
                  left: `${10 + i * 8}%`,
                  top: `${20 + (i % 3) * 20}%`,
                  x: mousePosition.x * (0.1 + i * 0.02),
                  y: mousePosition.y * (0.1 + i * 0.02),
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <ScrollRevealContent className="space-y-8" delay={0.2} stagger={0.15}>
          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05, y: -2 }}
            style={{ 
              x: mousePosition.x * 0.02,
              y: mousePosition.y * 0.02 
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-sm text-muted-foreground">Welcome to Innovation</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-outfit"
            style={{ 
              x: mousePosition.x * 0.01,
              y: mousePosition.y * 0.01 
            }}
          >
            <motion.span 
              className="block"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              FDCI
            </motion.span>
            <motion.span 
              className="block text-gradient glow-text"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              CLUB
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            whileHover={{ scale: 1.02 }}
          >
            Where <span className="text-primary font-semibold">Design</span> meets{' '}
            <span className="text-secondary font-semibold">Creativity</span> through{' '}
            <span className="text-accent font-semibold">Innovation</span>
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            whileHover={{ scale: 1.01 }}
          >
            Join our community of forward-thinking designers, creative minds, and tech innovators 
            shaping the future of digital experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
            style={{ 
              x: mousePosition.x * 0.005,
              y: mousePosition.y * 0.005 
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-primary btn-glow text-lg px-8 py-6 h-auto group"
                onClick={() => {
                  const contact = document.getElementById('contact');
                  if (contact) {
                    const targetPosition = contact.offsetTop - 80;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                  }
                }}
              >
                <span className="mr-2">Join Our Community</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <MousePointer2 className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="border-primary/50 hover:bg-primary/10 text-lg px-8 py-6 h-auto"
                onClick={() => {
                  const projects = document.getElementById('projects');
                  if (projects) {
                    const targetPosition = projects.offsetTop - 80;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                  }
                }}
              >
                View Projects
              </Button>
            </motion.div>
          </motion.div>
        </ScrollRevealContent>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToNext}
            className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
            whileHover={{ y: -4 }}
          >
            <span className="text-sm group-hover:text-primary">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative"
            >
              <ArrowDown className="w-5 h-5" />
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-full blur-sm"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Interactive Floating Elements with Mouse Tracking */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-br from-primary to-secondary rounded-full opacity-60"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 4) * 15}%`,
              x: mousePosition.x * (0.05 + i * 0.01),
              y: mousePosition.y * (0.05 + i * 0.01),
            }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
            whileHover={{ scale: 2 }}
          />
        ))}
      </div>
    </ScrollRevealSection>
  );
}