import React, { ReactNode, useEffect } from 'react';
import { useAnimationClasses, useTransitionStyle, useMotionPreference } from '../../lib/motion-preferences';

type FormState = 'idle' | 'validating' | 'submitting' | 'success' | 'error';

interface AnimatedFormContainerProps {
  children: ReactNode;
  formState: FormState;
  className?: string;
  ariaLabelledBy?: string;
}

const AnimatedFormContainer: React.FC<AnimatedFormContainerProps> = ({
  children,
  formState,
  className = '',
  ariaLabelledBy
}) => {
  // Get appropriate transition style based on motion preferences
  const transitionStyle = useTransitionStyle('all', 300, 'ease-out');
  
  // Call hooks at the top level to comply with React's Rules of Hooks
  const validatingClasses = useAnimationClasses('scale-[0.995] opacity-90', 'opacity-90');
  const submittingClasses = useAnimationClasses('scale-[0.99] opacity-75', 'opacity-75');
  const resultClasses = useAnimationClasses('scale-100 opacity-100', 'opacity-100');
  
  // Get animation classes based on form state
  const getStateClasses = () => {
    switch (formState) {
      case 'validating':
        return validatingClasses;
      case 'submitting':
        return submittingClasses;
      case 'success':
      case 'error':
        return resultClasses;
      default: // 'idle'
        return 'scale-100 opacity-100';
    }
  };

  // Get reduced motion preference
  const reducedMotion = useMotionPreference();
  
  // Announce state changes to screen readers
  useEffect(() => {
    // Only announce significant state changes
    if (formState === 'submitting' || formState === 'success' || formState === 'error') {
      const announceStateChange = () => {
        const messages = {
          submitting: 'Submitting form, please wait.',
          success: 'Your message was successfully sent.',
          error: 'There was a problem with your form submission.'
        };
        
        // Create announcement element
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', formState === 'error' ? 'assertive' : 'polite');
        liveRegion.setAttribute('class', 'sr-only');
        document.body.appendChild(liveRegion);
        
        // Add slight delay to ensure it's announced properly
        setTimeout(() => {
          liveRegion.textContent = messages[formState as keyof typeof messages];
          
          // Clean up after announcement
          setTimeout(() => {
            document.body.removeChild(liveRegion);
          }, 3000);
        }, reducedMotion ? 0 : 200);
      };
      
      announceStateChange();
    }
  }, [formState, reducedMotion]);

  return (
    <div 
      className={`relative ${getStateClasses()} ${className}`}
      style={{ transition: transitionStyle }}
      aria-busy={formState === 'submitting' || formState === 'validating'}
      role={
        formState === 'idle' ? 'form' : 
        formState === 'validating' ? 'form' :
        formState === 'submitting' ? 'form' :
        formState === 'success' ? 'region' :
        formState === 'error' ? 'region' : undefined
      }
      aria-labelledby={ariaLabelledBy}
      aria-atomic={formState === 'success' || formState === 'error' ? 'true' : undefined}
    >
      {/* Status announcements for screen readers */}
      {formState === 'validating' && (
        <div className="sr-only" aria-live="polite">
          Validating form fields, please wait.
        </div>
      )}
      
      {children}
    </div>
  );
};

export default AnimatedFormContainer;
