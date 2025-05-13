import React, { useEffect, useState } from 'react';
import { getAnimationClasses, prefersReducedMotion } from '../../lib/motion-preferences';

interface SuccessMessageProps {
  firstName: string;
  onReset: () => void;
}

export const SuccessMessage = ({ firstName, onReset }: SuccessMessageProps) => {
  // State for animation sequence
  const [showIcon, setShowIcon] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
  // Set up animation sequence
  useEffect(() => {
    // For reduced motion, show everything at once
    if (prefersReducedMotion()) {
      setShowIcon(true);
      setShowText(true);
      setShowButton(true);
      return;
    }
    
    // Staggered animation sequence
    const iconTimer = setTimeout(() => setShowIcon(true), 100);
    const textTimer = setTimeout(() => setShowText(true), 400);
    const buttonTimer = setTimeout(() => setShowButton(true), 700);
    
    return () => {
      clearTimeout(iconTimer);
      clearTimeout(textTimer);
      clearTimeout(buttonTimer);
    };
  }, []);
  
  return (
    <div 
      className="success-container text-center py-8 fade-in"
      role="status"
      aria-live="polite"
    >
      {/* Centered checkmark icon */}
      <div className={`success-icon flex justify-center mb-8 ${showIcon ? getAnimationClasses('slide-up', 'opacity-100') : 'opacity-0'} transition-opacity duration-300`}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#b77f0f" strokeWidth="2"/>
          <path d="M8 12L11 15L16 9" stroke="#b77f0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      <div className={`${showText ? getAnimationClasses('fade-in', 'opacity-100') : 'opacity-0'} transition-opacity duration-300`}>
        <h2 className="text-2xl font-manrope mb-4">Message Sent!</h2>
        <p className="mb-6">
          {firstName ? `Thanks for reaching out, ${firstName}. I'll get back to you soon.` : 
                    "Thanks for reaching out. I'll get back to you soon."}
        </p>
      </div>
      
      <div className={`${showButton ? getAnimationClasses('slide-up', 'opacity-100') : 'opacity-0 -translate-y-4'} transition-all duration-300`}>
        <button 
          onClick={onReset}
          className="border border-[#b77f0f] text-white py-2 px-6 hover:bg-[#b77f0f] transition-colors duration-300"
          autoFocus
        >
          Send another message
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
