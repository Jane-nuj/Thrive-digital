/**
 * Utility functions for handling motion preferences and animations
 */

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
