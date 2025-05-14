'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Note: We can't use the hook inside global-error.tsx as it's outside the app layout
// So we'll implement a simpler version directly

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Check for reduced motion preference directly
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const errorDigest = error.digest ? error.digest.substring(0, 6) : 'unknown';
  
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Add listener for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    
    // Log the error
    console.error(error);
    
    // Delay showing the reset button
    const timer = setTimeout(() => {
      setShowReset(true);
    }, 1500);
    
    // Keyboard shortcut handling
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        reset();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        reset();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [error, reset]);

  // Animation properties based on motion preferences
  const animationDuration = prefersReducedMotion ? 0 : 0.5;
  
  // Background pattern element styles
  const patternStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
    backgroundSize: '30px 30px',
    opacity: 0.15,
    pointerEvents: 'none',
    zIndex: 0
  } as React.CSSProperties;

  return (
    <html lang="en">
      <head>
        <title>Critical Error - Thrive Digital</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <motion.main 
          className="min-h-screen bg-[#2a2a2a] text-white flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: animationDuration }}
          role="main"
          aria-labelledby="critical-error-title"
        >
          {/* Subtle background pattern - hidden from screen readers */}
          <div style={patternStyles} aria-hidden="true" />
          <section aria-labelledby="critical-error-title">
            <motion.h1 
              id="critical-error-title"
              className="text-5xl md:text-7xl font-bold mb-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animationDuration, delay: prefersReducedMotion ? 0 : 0.2 }}
            >
              <span className="relative inline-block">
                <span className="relative z-10">Critical Error</span>
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
            
            <motion.div
              aria-live="assertive"
              role="alert"
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animationDuration, delay: prefersReducedMotion ? 0 : 0.4 }}
            >
              <p className="max-w-md mb-2">
                Something went seriously wrong. Please try reloading the page.
              </p>
              <p className="max-w-md text-sm text-gray-400 mb-4">
                A critical error has occurred. If this problem persists after retrying, 
                please contact support or return later.
              </p>
              <div className="sr-only">
                A critical application error has occurred with reference code: {errorDigest}.
                This is a severe error that prevented the application from loading properly.
              </div>
            </motion.div>
          </section>
          
          {showReset && (
            <motion.button
              onClick={reset}
              className="bg-[#b77f0f] hover:bg-[#936708] text-white py-2 px-6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#b77f0f] focus:ring-offset-2 focus:ring-offset-[#2a2a2a] relative z-10 overflow-hidden group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: animationDuration }}
              aria-label="Reload the application to resolve the critical error"
              autoFocus
              onFocus={(e) => e.currentTarget.classList.add('ring-2', 'ring-[#b77f0f]', 'ring-offset-2', 'ring-offset-[#2a2a2a]')}
              onBlur={(e) => e.currentTarget.classList.remove('ring-2', 'ring-[#b77f0f]', 'ring-offset-2', 'ring-offset-[#2a2a2a]')}
            >
              <span className="relative z-10">Reload Application</span>
              <motion.span 
                className="absolute inset-0 bg-[#936708] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
              <span className="ml-2 opacity-60 text-sm relative z-10">(Ctrl+R or ESC)</span>
            </motion.button>
          )}
          <div className="sr-only" aria-live="polite">
            Press Control plus R or the Escape key to reload the application and resolve the critical error
          </div>
          <p className="mt-8 text-xs text-gray-500">
            Reference code: {errorDigest}
          </p>
        </motion.main>
      </body>
    </html>
  );
}
