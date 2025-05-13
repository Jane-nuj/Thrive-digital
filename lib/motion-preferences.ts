/**
 * Utility functions for handling motion preferences and animations
 */
import { useEffect, useState, useMemo } from 'react';


// Check if the user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return false;
  
  // Check for the prefers-reduced-motion media query
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Animation classes based on motion preference
export const getAnimationClasses = (
  animatedClass: string, 
  fallbackClass: string = ''
): string => {
  // If in a non-browser environment, return the fallback
  if (typeof window === 'undefined') return fallbackClass;
  
  return prefersReducedMotion() ? fallbackClass : animatedClass;
};

// Duration values based on motion preference
export const getAnimationDuration = (
  defaultDuration: number,
  reducedDuration: number = 0
): number => {
  // If in a non-browser environment, return the reduced duration
  if (typeof window === 'undefined') return reducedDuration;
  
  return prefersReducedMotion() ? reducedDuration : defaultDuration;
};

// Create CSS transition string with motion preference handling
export const getTransitionStyle = (
  property: string = 'all',
  duration: number = 300,
  timingFunction: string = 'ease',
  delay: number = 0
): string => {
  if (prefersReducedMotion()) {
    return property === 'transform' ? `${property} 0.01ms ${timingFunction}` : 'none';
  }
  
  return `${property} ${duration}ms ${timingFunction} ${delay}ms`;
};

// React hook to check and monitor reduced motion preference
export function useMotionPreference(): boolean {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => prefersReducedMotion());
  
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    // Get initial value
    setReducedMotion(prefersReducedMotion());
    
    // Listen for changes to the prefers-reduced-motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    // Add event listener with modern API if available
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);
  
  return reducedMotion;
}

// Hook version of getAnimationClasses
export function useAnimationClasses(
  animatedClass: string, 
  fallbackClass: string = ''
): string {
  const reducedMotion = useMotionPreference();
  return reducedMotion ? fallbackClass : animatedClass;
}

// Hook for creating transition styles
export function useTransitionStyle(
  property: string = 'all',
  duration: number = 300,
  timingFunction: string = 'ease',
  delay: number = 0
): string {
  const reducedMotion = useMotionPreference();
  
  return useMemo(() => {
    if (reducedMotion) {
      return property === 'transform' ? `${property} 0.01ms ${timingFunction}` : 'none';
    }
    
    return `${property} ${duration}ms ${timingFunction} ${delay}ms`;
  }, [reducedMotion, property, duration, timingFunction, delay]);
}
