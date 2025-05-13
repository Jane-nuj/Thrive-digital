import React from 'react';

interface SuccessMessageProps {
  firstName: string;
  onReset: () => void;
}

export const SuccessMessage = ({ firstName, onReset }: SuccessMessageProps) => (
  <div 
    className="success-container text-center py-8 fade-in"
    role="status"
    aria-live="polite"
  >
    <div className="success-icon mb-6">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#b77f0f" strokeWidth="2"/>
        <path d="M8 12L11 15L16 9" stroke="#b77f0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <h2 className="text-2xl font-manrope mb-4">Message Sent!</h2>
    <p className="mb-6">
      {firstName ? `Thanks for reaching out, ${firstName}. I'll get back to you soon.` : 
                "Thanks for reaching out. I'll get back to you soon."}
    </p>
    <button 
      onClick={onReset}
      className="border border-[#b77f0f] text-white py-2 px-6 hover:bg-[#b77f0f] transition-colors duration-300"
      autoFocus
    >
      Send another message
    </button>
  </div>
);

export default SuccessMessage;
