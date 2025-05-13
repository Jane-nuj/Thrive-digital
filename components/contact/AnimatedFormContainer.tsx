import React, { ReactNode } from 'react';
import { useAnimationClasses, useTransitionStyle } from '../../lib/motion-preferences';

type FormState = 'idle' | 'validating' | 'submitting' | 'success' | 'error';

interface AnimatedFormContainerProps {
  children: ReactNode;
  formState: FormState;
  className?: string;
}

const AnimatedFormContainer: React.FC<AnimatedFormContainerProps> = ({
  children,
  formState,
  className = ''
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

  return (
    <div 
      className={`relative ${getStateClasses()} ${className}`}
      style={{ transition: transitionStyle }}
      aria-busy={formState === 'submitting' || formState === 'validating'}
    >
      {children}
    </div>
  );
};

export default AnimatedFormContainer;
