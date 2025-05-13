'use client';

import { useState, useEffect, useRef } from "react";

// Validation helper types
type ValidationErrors = {
  [key: string]: string;
};

type TouchedFields = {
  [key: string]: boolean;
};

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

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
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

  // Handle form submission with API route
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields before submission
    if (!validateForm()) {
      return; // Stop submission if validation fails
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: data.message || 'Your message has been sent successfully. Thank you for reaching out!',
        });
        // Reset form
        setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || 'An error occurred while sending your message. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-charcoal text-white py-12 pt-16 md:py-20 md:pt-24">
      <div className="layout-container">
        <div className="content-padding">
          {/* Form status message */}
          {submitStatus && (
            <div className={`mb-8 p-4 rounded ${submitStatus.success ? 'bg-green-900 text-white' : 'bg-red-900 text-white'}`}>
              {submitStatus.message}
            </div>
          )}
          
          {/* Two-column layout for desktop */}
          <div className="flex flex-col md:flex-row md:space-x-16 lg:space-x-24">
            {/* Left column with heading */}
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="font-heading text-2xl sm:text-3xl md:text-h1 mb-10 md:mb-12 leading-relaxed">
                Let me know how I can <span className="text-gold">help</span>.
              </h1>
            </div>
            
            {/* Right column with form */}
            <div className="md:w-1/2">
              <form onSubmit={handleSubmit} className="space-y-[30px] max-w-[800px]">
                {/* Name Fields */}
                <div>
                  <label htmlFor="firstName" className="block text-[18px] tracking-[0.5px] text-white mb-2">Name <span className="text-[13px] text-white opacity-65">(required)</span></label>
                  <div className="flex flex-col md:flex-row gap-6 md:gap-[30px]">
                    <div className="flex-1">
                      <label htmlFor="firstName" className="block text-[14px] text-white opacity-80 mb-1">First Name</label>
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
                      <label htmlFor="lastName" className="block text-[14px] text-white opacity-80 mb-1">Last Name</label>
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
                </div>

                {/* Email Field */}
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

                {/* Subject Field */}
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

                {/* Message Field */}
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
                  <WhiteTextButton
                    isSubmitting={isSubmitting}
                    text={isSubmitting ? 'Sending...' : 'Send'}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
