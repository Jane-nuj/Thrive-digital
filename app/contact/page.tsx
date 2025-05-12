'use client';

import { useState } from "react";

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
    <div className="bg-charcoal text-white">
      <div className="container mx-auto px-6 py-12 md:py-20">
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
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name Fields */}
              <div>
                <label htmlFor="firstName" className="block text-p3 text-gray-300 mb-2">Name <span className="text-xs text-gray-400">(required)</span></label>
                <div className="flex flex-col md:flex-row gap-6 md:gap-4">
                  <input 
                    id="firstName" 
                    name="firstName" 
                    placeholder="First Name" 
                    value={form.firstName}
                    required 
                    className="flex-1 py-2 px-0 bg-transparent border-b border-gray-600 focus:outline-none focus:border-gold transition-colors font-sans text-p1" 
                    onChange={handleChange} 
                  />
                  <input 
                    name="lastName" 
                    placeholder="Last Name" 
                    value={form.lastName}
                    required 
                    className="flex-1 py-2 px-0 bg-transparent border-b border-gray-600 focus:outline-none focus:border-gold transition-colors font-sans text-p1" 
                    onChange={handleChange} 
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-p3 text-gray-300 mb-2">Email <span className="text-xs text-gray-400">(required)</span></label>
                <input 
                  id="email" 
                  name="email" 
                  placeholder="your.email@example.com" 
                  type="email" 
                  value={form.email}
                  required 
                  className="w-full py-2 px-0 bg-transparent border-b border-gray-600 focus:outline-none focus:border-gold transition-colors font-sans text-p1" 
                  onChange={handleChange} 
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-p3 text-gray-300 mb-2">Subject <span className="text-xs text-gray-400">(required)</span></label>
                <input 
                  id="subject" 
                  name="subject" 
                  placeholder="What can I help you with?" 
                  value={form.subject}
                  required 
                  className="w-full py-2 px-0 bg-transparent border-b border-gray-600 focus:outline-none focus:border-gold transition-colors font-sans text-p1" 
                  onChange={handleChange} 
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-p3 text-gray-300 mb-2">Message <span className="text-xs text-gray-400">(required)</span></label>
                <textarea 
                  id="message" 
                  name="message" 
                  placeholder="Your message here..." 
                  value={form.message}
                  required 
                  rows={6} 
                  className="w-full py-2 px-0 bg-transparent border-b border-gray-600 focus:outline-none focus:border-gold transition-colors font-sans text-p1" 
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button 
                  type="submit" 
                  className="border border-gold text-gold px-8 py-2 hover:bg-gold hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-charcoal disabled:opacity-50 disabled:cursor-not-allowed font-sans text-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
