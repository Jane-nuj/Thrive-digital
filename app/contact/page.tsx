'use client';

import { useState, useEffect, useRef } from "react";

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

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  // Handle form submission with API route
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({});
    
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
    <div className="bg-charcoal text-white py-12 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="px-5 md:px-8">
          {/* Form status message */}
          {submitStatus.message && (
            <div className={`mb-8 p-4 rounded ${submitStatus.success ? 'bg-green-900 text-white' : 'bg-red-900 text-white'}`}>
              {submitStatus.message}
            </div>
          )}
          
          {/* Two-column layout for desktop */}
          <div className="flex flex-col md:flex-row md:space-x-16 lg:space-x-24">
            {/* Left column with heading */}
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="font-heading text-h1 mb-10 md:mb-12">
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
                        required 
                        className="w-full py-[8px] px-0 bg-transparent border-b border-[rgba(255,255,255,0.3)] focus:outline-none focus:border-gold transition-colors font-sans text-white" 
                        onChange={handleChange} 
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="lastName" className="block text-[14px] text-white opacity-80 mb-1">Last Name</label>
                      <input 
                        id="lastName"
                        name="lastName" 
                        value={form.lastName}
                        required 
                        className="w-full py-[8px] px-0 bg-transparent border-b border-[rgba(255,255,255,0.3)] focus:outline-none focus:border-gold transition-colors font-sans text-white" 
                        onChange={handleChange} 
                      />
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
                    required 
                    className="w-full py-[8px] px-0 bg-transparent border-b border-[rgba(255,255,255,0.3)] focus:outline-none focus:border-gold transition-colors font-sans text-white" 
                    onChange={handleChange} 
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-[18px] tracking-[0.5px] text-white mb-2">Subject <span className="text-[13px] text-white opacity-65">(required)</span></label>
                  <input 
                    id="subject" 
                    name="subject" 
                    value={form.subject}
                    required 
                    className="w-full py-[8px] px-0 bg-transparent border-b border-[rgba(255,255,255,0.3)] focus:outline-none focus:border-gold transition-colors font-sans text-white" 
                    onChange={handleChange} 
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-[18px] tracking-[0.5px] text-white mb-2">Message <span className="text-[13px] text-white opacity-65">(required)</span></label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={form.message}
                    required 
                    style={{ minHeight: '120px' }}
                    className="w-full py-[8px] px-0 bg-transparent border-b border-[rgba(255,255,255,0.3)] focus:outline-none focus:border-gold transition-colors font-sans text-white resize-y" 
                    onChange={handleChange}
                  ></textarea>
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
