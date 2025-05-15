
'use client';

import { useState, useEffect, useRef } from "react";
import SuccessMessage from "../../components/contact/SuccessMessage";
import ErrorMessage from "../../components/contact/ErrorMessage";
import SubmitButton from "../../components/contact/SubmitButton";
import AnimatedFormContainer from "../../components/contact/AnimatedFormContainer";
import FormField from "../../components/contact/FormField";

// Form state type
type FormState = 'idle' | 'validating' | 'submitting' | 'success' | 'error';

// Validation helper types
type ValidationErrors = {
  [key: string]: string;
};

type TouchedFields = {
  [key: string]: boolean;
};

// Error type for better error handling
type ErrorType = 'validation' | 'server' | 'network' | 'general';

// Custom button component that ensures white text
const WhiteTextButton = ({ isSubmitting, text }: { isSubmitting: boolean, text: string }) => {
  return (
    <div 
      className="relative inline-block"
      style={{
        minWidth: "100px", 
        height: "42px"
      }}
    >
      {/* Hidden button with original styling for positioning and hover effects */}
      <button 
        type="submit"
        className="absolute inset-0 bg-transparent border border-[#b77f0f] px-[32px] py-[12px] text-[16px] hover:bg-[#b77f0f] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans transition-colors duration-300"
        disabled={isSubmitting}
        style={{
          color: "transparent", // Hide the text color
          width: "100%",
          height: "100%"
        }}
      >
        {text}
      </button>
      
      {/* White text overlay that stays white */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ color: isSubmitting ? "#ffffff" : "#ffffff" }}
      >
        {text}
      </div>
    </div>
  );
};

// Validation helper functions
const validateName = (value: string): string => {
  if (!value.trim()) return "Name is required";
  if (value.trim().length < 2) return "Name must be at least 2 characters";
  if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(value)) return "Name cannot contain numbers or special characters";
  return "";
};

const validateEmail = (value: string): string => {
  if (!value.trim()) return "Email is required";
  // Simple regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "Please enter a valid email address";
  return "";
};

const validateSubject = (value: string): string => {
  if (!value.trim()) return "Subject is required";
  if (value.trim().length < 3) return "Subject must be at least 3 characters";
  if (value.length > 100) return "Subject cannot exceed 100 characters";
  return "";
};

const validateMessage = (value: string): string => {
  if (!value.trim()) return "Message is required";
  if (value.trim().length < 10) return "Message must be at least 10 characters";
  return "";
};

// Helper to detect if we're in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

export default function ContactPage() {
  // Add honeypot field to form state
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "", honeypot: "" });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  
  // Enhanced state management
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorType, setErrorType] = useState<ErrorType>('general');
  
  // Development-only state for API simulation
  const [devSimulateSuccess, setDevSimulateSuccess] = useState<boolean>(true);
  const [devErrorType, setDevErrorType] = useState<ErrorType>('server');
  
  // References to form fields for focus management
  const fieldRefs = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    subject: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // If the field has been touched, validate on change as well
    if (touched[name]) {
      validateField(name, value);
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };
  
  const validateField = (name: string, value: string) => {
    let error = "";
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'subject':
        error = validateSubject(value);
        break;
      case 'message':
        error = validateMessage(value);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    return error === "";
  };
  
  const validateForm = (): boolean => {
    const fieldValidations = {
      firstName: validateField('firstName', form.firstName),
      lastName: validateField('lastName', form.lastName),
      email: validateField('email', form.email),
      subject: validateField('subject', form.subject),
      message: validateField('message', form.message)
    };
    
    // Mark all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      subject: true,
      message: true
    });
    
    // Focus the first field with an error
    const fieldsWithOrder = ['firstName', 'lastName', 'email', 'subject', 'message'];
    for (const field of fieldsWithOrder) {
      if (!fieldValidations[field as keyof typeof fieldValidations]) {
        fieldRefs[field as keyof typeof fieldRefs].current?.focus();
        return false;
      }
    }
    
    return Object.values(fieldValidations).every(isValid => isValid);
  };

  // Reset form function 
  const resetForm = () => {
    setForm({ firstName: "", lastName: "", email: "", subject: "", message: "", honeypot: "" });
    setErrors({});
    setTouched({});
    setFormState('idle');
    setErrorMessage("");
    setErrorType('general');
    
    // Focus on first field after reset
    setTimeout(() => {
      fieldRefs.firstName.current?.focus();
    }, 100);
  };

  // Retry submission function
  const handleRetry = () => {
    setFormState('idle');
    setErrorMessage("");
  };

  // Handle form submission with API route
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Set to validating state
    setFormState('validating');
    
    // Validate all fields before submission
    if (!validateForm()) {
      setFormState('error');
      setErrorMessage("Please correct the errors in the form.");
      setErrorType('validation');
      return;
    }
    
    // Set to submitting state
    setFormState('submitting');
    
    // Simulate processing time for better UX testing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // In development, simulate API based on settings
      if (isDevelopment && devSimulateSuccess === false) {
        // Simulate an error response based on selected error type
        const errorMessages = {
          validation: "Validation failed on the server.",
          server: "The server encountered an error while processing your request.",
          network: "Network error. Please check your connection and try again.",
          general: "An unknown error occurred. Please try again later."
        };
        
        setFormState('error');
        setErrorMessage(errorMessages[devErrorType]);
        setErrorType(devErrorType);
        return;
      }
      
      // In production or if simulation is set to success, proceed with real request
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormState('success');
        // Don't reset form immediately since we'll show the success message
      } else {
        setFormState('error');
        setErrorMessage(data.error || 'An error occurred while sending your message. Please try again.');
        setErrorType('server');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState('error');
      setErrorMessage('Network error. Please check your connection and try again.');
      setErrorType('network');
    }
  };

  // Helper to determine if a button should show spinner state
  const isButtonSubmitting = (state: FormState): boolean => {
    return state === 'validating' || state === 'submitting';
  };

  // Render different content based on form state
  const renderFormContent = () => {
    switch (formState) {
      case 'success':
        return (
          <AnimatedFormContainer formState={formState}>
            <SuccessMessage 
              firstName={form.firstName} 
              onReset={resetForm} 
            />
          </AnimatedFormContainer>
        );
      
      case 'error':
        return (
          <AnimatedFormContainer formState={formState}>
            <ErrorMessage 
              errorType={errorType}
              message={errorMessage} 
              onRetry={handleRetry} 
            />
            
            <form onSubmit={handleSubmit} className="space-y-[30px] max-w-[800px] mt-6">
                {/* Name Fields */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-[30px]">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-[18px] tracking-[0.5px] text-white mb-2">First Name <span className="text-[13px] text-white opacity-65">(required)</span></label>
                  <input 
                    id="firstName" 
                    name="firstName" 
                    value={form.firstName}
                    ref={fieldRefs.firstName}
                    required 
                    className={`w-full py-[8px] px-0 bg-transparent border-b ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-[rgba(255,255,255,0.3)]'} focus:outline-none focus:border-gold transition-colors font-sans text-white`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.firstName && touched.firstName ? "true" : "false"}
                    aria-describedby={errors.firstName && touched.firstName ? "firstName-error" : undefined}
                  />
                  {errors.firstName && touched.firstName && (
                    <p id="firstName-error" className="text-red-400 text-[14px] mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-[18px] tracking-[0.5px] text-white mb-2">Last Name <span className="text-[13px] text-white opacity-65">(required)</span></label>
                  <input 
                    id="lastName"
                    name="lastName" 
                    value={form.lastName}
                    ref={fieldRefs.lastName}
                    required 
                    className={`w-full py-[8px] px-0 bg-transparent border-b ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-[rgba(255,255,255,0.3)]'} focus:outline-none focus:border-gold transition-colors font-sans text-white`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={errors.lastName && touched.lastName ? "true" : "false"}
                    aria-describedby={errors.lastName && touched.lastName ? "lastName-error" : undefined}
                  />
                  {errors.lastName && touched.lastName && (
                    <p id="lastName-error" className="text-red-400 text-[14px] mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Rest of form fields */}
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-[18px] tracking-[0.5px] text-white mb-2">Email <span className="text-[13px] text-white opacity-65">(required)</span></label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={form.email}
                  ref={fieldRefs.email}
                  required 
                  className={`w-full py-[8px] px-0 bg-transparent border-b ${errors.email && touched.email ? 'border-red-500' : 'border-[rgba(255,255,255,0.3)]'} focus:outline-none focus:border-gold transition-colors font-sans text-white`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.email && touched.email ? "true" : "false"}
                  aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                />
                {errors.email && touched.email && (
                  <p id="email-error" className="text-red-400 text-[14px] mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-[18px] tracking-[0.5px] text-white mb-2">Subject <span className="text-[13px] text-white opacity-65">(required)</span></label>
                <input 
                  id="subject" 
                  name="subject" 
                  value={form.subject}
                  ref={fieldRefs.subject}
                  required 
                  className={`w-full py-[8px] px-0 bg-transparent border-b ${errors.subject && touched.subject ? 'border-red-500' : 'border-[rgba(255,255,255,0.3)]'} focus:outline-none focus:border-gold transition-colors font-sans text-white`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.subject && touched.subject ? "true" : "false"}
                  aria-describedby={errors.subject && touched.subject ? "subject-error" : undefined}
                />
                {errors.subject && touched.subject && (
                  <p id="subject-error" className="text-red-400 text-[14px] mt-1">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[18px] tracking-[0.5px] text-white mb-2">Message <span className="text-[13px] text-white opacity-65">(required)</span></label>
                <textarea 
                  id="message" 
                  name="message" 
                  value={form.message}
                  ref={fieldRefs.message}
                  required 
                  style={{ minHeight: '120px' }}
                  className={`w-full py-[8px] px-0 bg-transparent border-b ${errors.message && touched.message ? 'border-red-500' : 'border-[rgba(255,255,255,0.3)]'} focus:outline-none focus:border-gold transition-colors font-sans text-white resize-y`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={errors.message && touched.message ? "true" : "false"}
                  aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                ></textarea>
                {errors.message && touched.message && (
                  <p id="message-error" className="text-red-400 text-[14px] mt-1">
                    {errors.message}
                  </p>
                )}
              </div>

            {/* Submit Button */}
            <div className="mt-[30px]">
              <SubmitButton 
                isSubmitting={true} // Always show spinner in error state retry form
                disabled={false}
              />
            </div>
            </form>
          </AnimatedFormContainer>
        );
      
      case 'submitting':
        // Show form with disabled fields during submission
        return (
          <AnimatedFormContainer formState={formState} className="relative">
            <form className="space-y-[30px] max-w-[800px] form-submitting">
              {/* Form fields with the same structure but all disabled */}
              {/* Name Fields */}
              <div className="flex flex-col md:flex-row gap-6 md:gap-[30px]">
                <div className="flex-1">
                  <FormField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={form.firstName}
                    onChange={() => {}}
                    onBlur={() => {}}
                    error=""
                    touched={false}
                    required={true}
                    labelClassName="text-[18px] tracking-[0.5px] text-white"
                    className="cursor-not-allowed"
                    disabled
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={form.lastName}
                    onChange={() => {}}
                    onBlur={() => {}}
                    error=""
                    touched={false}
                    required={true}
                    labelClassName="text-[18px] tracking-[0.5px] text-white"
                    className="cursor-not-allowed"
                    disabled
                  />
                </div>
              </div>

              {/* Email Field */}
              <FormField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={() => {}}
                onBlur={() => {}}
                error=""
                touched={false}
                required={true}
                className="cursor-not-allowed"
                disabled
              />

              {/* Subject Field */}
              <FormField
                id="subject"
                name="subject"
                label="Subject"
                value={form.subject}
                onChange={() => {}}
                onBlur={() => {}}
                error=""
                touched={false}
                required={true}
                className="cursor-not-allowed"
                disabled
              />

              {/* Message Field */}
              <FormField
                id="message"
                name="message"
                label="Message"
                type="textarea"
                value={form.message}
                onChange={() => {}}
                onBlur={() => {}}
                error=""
                touched={false}
                required={true}
                className="cursor-not-allowed resize-none"
                disabled
              />

              {/* Submit Button */}
              <div className="mt-[30px]">
                <SubmitButton isSubmitting={true} disabled={true} />
              </div>
            </form>
            
            {/* Screen reader announcement */}
            <div className="sr-only" aria-live="polite">
              Sending your message, please wait...
            </div>
          </AnimatedFormContainer>
        );
      
      default: // 'idle' or 'validating'
        return (
          <AnimatedFormContainer formState={formState}>
            <form 
              onSubmit={handleSubmit} 
              className="space-y-[30px] max-w-[800px]" 
              aria-busy={formState === 'validating'}
              aria-describedby="form-description"
              role="form"
            >
              {/* Form description for screen readers */}
              <div id="form-description" className="sr-only">
                Contact form with fields for name, email, subject, and message. All fields are required.
              </div>
              
              {/* Honeypot field - hidden from users but accessible to bots */}
              <input
                type="text"
                name="honeypot"
                id="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  width: '1px',
                  height: '1px',
                  padding: '0',
                  margin: '-1px',
                  overflow: 'hidden',
                  clip: 'rect(0, 0, 0, 0)',
                  whiteSpace: 'nowrap',
                  border: '0'
                }}
                autoComplete="off"
              />
            {/* Name Fields */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-[30px]">
              <div className="flex-1">
                <FormField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.firstName}
                  touched={touched.firstName}
                  required={true}
                  labelClassName="text-[18px] tracking-[0.5px] text-white"
                  ref={fieldRefs.firstName}
                />
              </div>
              <div className="flex-1">
                <FormField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.lastName}
                  touched={touched.lastName}
                  required={true}
                  labelClassName="text-[18px] tracking-[0.5px] text-white"
                  ref={fieldRefs.lastName}
                />
              </div>
            </div>

            {/* Email Field - Enhanced with accessibility */}
            <FormField
              id="email"
              name="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              required={true}
              ref={fieldRefs.email}
              fieldHint="Enter email address in the format name@example.com. This will be used to contact you."
              ariaLabel="Email address field"
            />

            {/* Subject Field */}
            <FormField
              id="subject"
              name="subject"
              label="Subject"
              value={form.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.subject}
              touched={touched.subject}
              required={true}
              ref={fieldRefs.subject}
            />

            {/* Message Field */}
            <FormField
              id="message"
              name="message"
              label="Message"
              type="textarea"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.message}
              touched={touched.message}
              required={true}
              ref={fieldRefs.message}
            />

            {/* Submit Button */}
            <div className="mt-[30px]">
              <SubmitButton
                isSubmitting={isButtonSubmitting(formState)}
                disabled={false}
              />
            </div>
            
            {/* Development testing controls */}
            {isDevelopment && (
              <div className="bg-gray-800 p-4 mt-8 border border-gray-700 rounded text-sm">
                <h3 className="font-medium mb-2 text-white">Development Testing Controls</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={devSimulateSuccess}
                        onChange={() => setDevSimulateSuccess(!devSimulateSuccess)}
                        className="rounded border-gray-600 text-gold focus:ring-gold"
                      />
                      <span className="ml-2">Simulate Success</span>
                    </label>
                  </div>
                  
                  {!devSimulateSuccess && (
                    <div className="flex flex-col space-y-2">
                      <label className="text-sm text-gray-300">Error Type:</label>
                      <select
                        value={devErrorType}
                        onChange={(e) => setDevErrorType(e.target.value as ErrorType)}
                        className="bg-gray-700 border border-gray-600 rounded py-1 px-2 text-white text-sm focus:outline-none focus:border-gold"
                      >
                        <option value="server">Server Error</option>
                        <option value="network">Network Error</option>
                        <option value="validation">Validation Error</option>
                        <option value="general">General Error</option>
                      </select>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  These controls only appear in development mode
                </p>
              </div>
            )}
          </form>
          </AnimatedFormContainer>
        );
    }
  };

  // Add focus management effect
  useEffect(() => {
    // When form state changes, manage focus appropriately
    if (formState === 'success' || formState === 'error') {
      // Focus management is handled by autoFocus in the components
      
      // Announce state change to screen readers
      const message = formState === 'success' 
        ? 'Your message was sent successfully.' 
        : 'There was a problem sending your message.';
        
      // Create and use a live region for announcements
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'assertive');
      liveRegion.setAttribute('role', 'status');
      liveRegion.classList.add('sr-only');
      document.body.appendChild(liveRegion);
      
      // Delay the announcement slightly to ensure it's read after the component mounts
      setTimeout(() => {
        liveRegion.textContent = message;
        
        // Clean up after announcement
        setTimeout(() => {
          document.body.removeChild(liveRegion);
        }, 1000);
      }, 100);
    }
  }, [formState]);

  return (
    <main id="main-content" tabIndex={-1} className="bg-charcoal text-white pb-12 mt-20 md:pb-20 md:mt-24">
      <div className="layout-container">
        <div className="content-padding">
          {/* Skip to content link (visually hidden until focused) */}
          <a 
            href="#contact-form" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#b77f0f] px-4 py-2 text-white"
          >
            Skip to contact form
          </a>
          
          {/* Two-column layout for desktop */}
          <div className="flex flex-col md:flex-row md:space-x-16 lg:space-x-24">
            {/* Left column with heading */}
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-h1 mb-10 md:mb-12 leading-relaxed">
                Let me know how I can <span className="text-gold">help</span>.
              </h1>
            </div>
            
            {/* Right column with form */}
            <div id="contact-form" className="md:w-1/2">
              {renderFormContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
