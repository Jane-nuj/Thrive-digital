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
  // New props for enhanced accessibility
  fieldHint?: string; // Custom field description/hint for screen readers
  ariaLabel?: string; // Custom aria-label if needed
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
  fieldHint,
  ariaLabel,
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
  
  // Enhanced focus handling with accessibility announcements
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFocused(true);
    
    // Add slight delay to make animation noticeable
    if (!reducedMotion) {
      setTimeout(() => setAnimateIn(true), 5);
    } else {
      setAnimateIn(true);
    }
    
    // Announce specific guidance for different field types
    if (type === 'email' && !value) {
      // Announce format guidance without disrupting the experience
      const announceGuidance = () => {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('class', 'sr-only');
        document.body.appendChild(liveRegion);
        
        setTimeout(() => {
          liveRegion.textContent = 'Enter email in format name@example.com';
          
          setTimeout(() => {
            document.body.removeChild(liveRegion);
          }, 3000);
        }, 500); // Delay to not interrupt other announcements
      };
      
      announceGuidance();
    }
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
      // Enhanced ARIA attributes
      'aria-invalid': error && touched ? true : false,
      'aria-describedby': `${id}-description ${error && touched ? `${id}-error` : ''}`.trim(),
      'aria-required': required ? true : undefined,
      'aria-disabled': disabled ? true : undefined,
      'aria-label': ariaLabel,
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
    
    // For email fields, add specific ARIA attributes
    if (type === 'email') {
      return (
        <input
          type="email"
          {...commonProps}
          // Email-specific ARIA attributes
          aria-autocomplete="both"
          autoComplete="email"
          inputMode="email"
          spellCheck="false"
          ref={setRef as React.RefCallback<HTMLInputElement>}
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
      
      {/* Field description for screen readers */}
      <div id={`${id}-description`} className="sr-only">
        {fieldHint || 
          (type === 'email' 
            ? 'Enter email in format name@example.com' 
            : `Enter ${label.toLowerCase()} information`
          )
        }
      </div>
      
      {renderInput()}
      
      {/* Error message with enhanced ARIA */}
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
            aria-atomic="true"
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
