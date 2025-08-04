import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/sections/Footer';
import { Scene3D } from '@/components/Scene3D';
import { ScrollProgress } from '@/components/ScrollProgress';
import { useScrollBehavior } from '@/hooks/useScrollEffects';

// Loading component for 3D scene
const SceneLoader = () => (
  <div className="fixed inset-0 -z-10 flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
    />
  </div>
);

const Index = () => {
  // Initialize enhanced scroll behavior
  useScrollBehavior();

  return (
    <div className="min-h-screen relative">
      {/* Scroll Progress Indicators */}
      <ScrollProgress />
      
      {/* 3D Background Scene */}
      <Suspense fallback={<SceneLoader />}>
        <Scene3D />
      </Suspense>

      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10 space-y-0">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
