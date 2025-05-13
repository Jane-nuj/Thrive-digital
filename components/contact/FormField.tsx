import React, { useState, useRef, forwardRef } from 'react';
import { useMotionPreference, useTransitionStyle } from '../../lib/motion-preferences';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'textarea';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  sublabel?: string;
  disabled?: boolean;
}

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched = false,
  required = false,
  className = '',
  labelClassName = '',
  sublabel,
  disabled = false,
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const reducedMotion = useMotionPreference();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  
  // Get appropriate transition styles based on motion preferences
  const borderTransition = useTransitionStyle('border-color', 250, 'ease');
  const shadowTransition = useTransitionStyle('box-shadow', 300, 'ease-out');
  const transformTransition = useTransitionStyle('transform', 200, 'ease-out');
  const opacityTransition = useTransitionStyle('opacity', 250, 'ease-out');
  
  // Handle focus state with animation
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(true);
    // Add slight delay to make animation noticeable
    setTimeout(() => setAnimateIn(true), 5);
  };
  
  // Handle blur state with animation
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnimateIn(false);
    // Delay the focus state change to allow for animation
    setTimeout(() => setFocused(false), reducedMotion ? 0 : 200);
    onBlur(e);
  };
  
  // Calculate styles
  const inputClasses = `
    w-full py-[8px] px-0 bg-transparent border-b 
    ${error && touched ? 'border-red-500' : focused ? 'border-gold' : 'border-[rgba(255,255,255,0.3)]'}
    focus:outline-none font-sans text-white
  `;
  
  // Generate animation classes
  const focusAnimationClass = focused 
    ? animateIn ? 'field-focus' : ''
    : animateIn === false ? 'field-blur' : '';
  
  // Add dynamic styles based on focus state (for browsers not supporting animations)
  const focusStyle = focused && !focusAnimationClass
    ? { 
        boxShadow: !reducedMotion ? '0 2px 4px rgba(183, 127, 15, 0.25)' : 'none',
        transform: !reducedMotion && animateIn ? 'translateY(-2px)' : 'translateY(0)',
      } 
    : {};
  
  // Element to render based on type
  const renderInput = () => {
    const commonProps = {
      id,
      name,
      value,
      required,
      disabled,
      className: `${inputClasses} ${focusAnimationClass} ${className}`,
      onChange,
      onFocus: handleFocus,
      onBlur: handleBlur,
      style: { transition: `${borderTransition}, ${shadowTransition}`, ...focusStyle },
      'aria-invalid': error && touched ? true : false,
      'aria-describedby': error && touched ? `${id}-error` : undefined,
    };
    
    // Forward ref to input element
    const setRef = (element: HTMLInputElement | HTMLTextAreaElement | null) => {
      inputRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>).current = element;
      }
    };
    
    if (type === 'textarea') {
      return (
        <textarea
          {...commonProps}
          style={{ 
            ...commonProps.style,
            minHeight: '120px',
            resize: 'vertical'
          }}
          ref={setRef as React.RefCallback<HTMLTextAreaElement>}
        />
      );
    }
    
    return (
      <input
        type={type}
        {...commonProps}
        ref={setRef as React.RefCallback<HTMLInputElement>}
      />
    );
  };
  
  return (
    <div className="form-field mb-1">
      <label htmlFor={id} className={`block text-[18px] tracking-[0.5px] text-white mb-2 ${labelClassName}`}>
        {label} {required && <span className="text-[13px] text-white opacity-65">(required)</span>}
      </label>
      
      {sublabel && (
        <label htmlFor={id} className="block text-[14px] text-white opacity-80 mb-1">
          {sublabel}
        </label>
      )}
      
      {renderInput()}
      
      {/* Error message with min-height to prevent layout shifts */}
      <div 
        style={{ 
          minHeight: '24px', 
          transition: reducedMotion ? 'none' : 'opacity 300ms ease-out'
        }}
        aria-live="polite"
      >
        {error && touched ? (
          <p 
            id={`${id}-error`} 
            className="text-red-400 text-[14px] mt-1 error-fade-in"
            role="alert"
          >
            {error}
          </p>
        ) : (
          // Invisible placeholder to maintain layout consistency
          <p className="text-[14px] mt-1 opacity-0 h-[24px]">&nbsp;</p>
        )}
      </div>
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;
