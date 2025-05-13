import React, { useEffect, useState } from 'react';
import { getAnimationClasses, getTransitionStyle, prefersReducedMotion } from '../../lib/motion-preferences';

interface SubmitButtonProps {
  isSubmitting: boolean;
  disabled?: boolean;
}

export const SubmitButton = ({ 
  isSubmitting, 
  disabled = false 
}: SubmitButtonProps) => {
  // State for button animation
  const [animationState, setAnimationState] = useState({
    glow: false,
    hover: false
  });
  
  // Add subtle animation effect when not disabled
  useEffect(() => {
    // Skip animation for reduced motion or when button is disabled
    if (prefersReducedMotion() || isSubmitting || disabled) return;
    
    // Subtle glow effect that pulses every 3 seconds
    const glowInterval = setInterval(() => {
      setAnimationState(prev => ({ ...prev, glow: true }));
      
      // Turn off glow after 700ms
      setTimeout(() => {
        setAnimationState(prev => ({ ...prev, glow: false }));
      }, 700);
    }, 3000);
    
    return () => {
      clearInterval(glowInterval);
    };
  }, [isSubmitting, disabled]);
  
  // Button transition style based on motion preference
  const buttonTransition = `border-color ${prefersReducedMotion() ? 0 : 300}ms ease, 
                           background-color ${prefersReducedMotion() ? 0 : 300}ms ease, 
                           opacity ${prefersReducedMotion() ? 0 : 200}ms ease`;
  
  // Calculate animation effects
  const glowEffect = animationState.glow ? 'box-shadow: 0 0 8px rgba(183, 127, 15, 0.5);' : '';
  const hoverOrGlowClass = (animationState.hover || animationState.glow) && !isSubmitting && !disabled 
    ? 'bg-[#b77f0f]/10' 
    : '';
  
  return (
    <button 
      type="submit"
      disabled={isSubmitting || disabled}
      className={`
        w-full sm:w-auto py-3 px-8 border border-[#b77f0f] text-white
        ${isSubmitting || disabled ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#b77f0f]/90'} 
        ${hoverOrGlowClass}
        relative
      `}
      style={{ transition: buttonTransition, ...animationState.glow && { boxShadow: '0 0 8px rgba(183, 127, 15, 0.5)' } }}
      aria-busy={isSubmitting}
      onMouseEnter={() => setAnimationState(prev => ({ ...prev, hover: true }))}
      onMouseLeave={() => setAnimationState(prev => ({ ...prev, hover: false }))}
    >
      <span 
        className={`
          flex items-center justify-center 
          ${isSubmitting ? 'opacity-0' : 'opacity-100'} 
          transition-opacity duration-300
        `}
      >
        Send
      </span>
      
      {isSubmitting && (
        <span 
          className={`
            absolute inset-0 flex items-center justify-center
            ${getAnimationClasses('fade-in', 'opacity-100')}
          `}
        >
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        </span>
      )}
    </button>
  );
};

export default SubmitButton;
