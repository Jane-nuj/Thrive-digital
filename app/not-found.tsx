'use client';

import { useState, useEffect } from 'react';
import { useMotionPreference } from '../lib/motion-preferences';
import { motion } from 'framer-motion';

export default function NotFound() {
  const prefersReducedMotion = useMotionPreference();
  
  // Keyboard shortcut handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        window.location.href = '/';
      }
      // Add ESC key handling for "Back to Home"
      if (e.key === 'Escape') {
        e.preventDefault();
        window.location.href = '/';
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Animation variants with enhanced visual effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.25, 0.1, 0.25, 1.0] // Custom easing for smoother motion
      }
    }
  };
  
  // Background pattern element styles
  const patternStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'radial-gradient(#3a3a3a 1px, transparent 1px)',
    backgroundSize: '30px 30px',
    opacity: 0.15,
    pointerEvents: 'none',
    zIndex: 0
  } as React.CSSProperties;

  return (
    <motion.main 
      className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      role="main"
      aria-labelledby="error-title"
    >
      {/* Subtle background pattern - hidden from screen readers */}
      <div style={patternStyles} aria-hidden="true" />
      <section aria-labelledby="error-title">
        <motion.h1 
          id="error-title"
          className="text-5xl md:text-7xl font-bold mb-4 relative z-10" 
          variants={itemVariants}
        >
          <span className="relative inline-block">
            <span className="relative z-10">404</span>
            <motion.span 
              className="absolute -bottom-2 left-0 right-0 h-3 bg-[#b77f0f] opacity-20"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: prefersReducedMotion ? 0 : 0.8, 
                delay: prefersReducedMotion ? 0 : 0.5,
                ease: "easeOut"
              }}
              aria-hidden="true"
            />
          </span>
        </motion.h1>
        <motion.h2 
          id="error-description"
          className="text-2xl md:text-3xl mb-6" 
          variants={itemVariants}
        >
          Page Not Found
        </motion.h2>
        <motion.div 
          aria-live="polite" 
          role="status" 
          className="mb-8"
          variants={itemVariants}
        >
          <p className="max-w-md mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="max-w-md text-sm text-gray-400 mb-4">
            Please check the URL or navigate to another section using the menu above.
          </p>
          <div className="sr-only">
            Error code: 404. This means the requested page could not be found on the server.
          </div>
        </motion.div>
      </section>
      
      <motion.div variants={itemVariants}>
        <a 
          href="/" 
          className="bg-transparent border border-[#b77f0f] hover:bg-[#b77f0f] text-white py-2 px-6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#b77f0f] focus:ring-offset-2 focus:ring-offset-[#2a2a2a] relative z-10 overflow-hidden group"
          aria-label="Return to homepage"
          role="button"
          tabIndex={0}
          autoFocus
          onFocus={(e) => e.currentTarget.classList.add('ring-2', 'ring-[#b77f0f]', 'ring-offset-2', 'ring-offset-[#2a2a2a]')}
          onBlur={(e) => e.currentTarget.classList.remove('ring-2', 'ring-[#b77f0f]', 'ring-offset-2', 'ring-offset-[#2a2a2a]')}
        >
          <span className="relative z-10">Back to Homepage</span>
          <motion.span 
            className="absolute inset-0 bg-[#b77f0f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          />
          <span className="ml-2 opacity-60 text-sm">(Ctrl+H or ESC)</span>
        </a>
        <div className="sr-only" aria-live="polite">
          Press Control plus H or the Escape key to return to the homepage
        </div>
      </motion.div>
    </motion.main>
  );
}
