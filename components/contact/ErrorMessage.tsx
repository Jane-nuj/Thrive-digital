import React from 'react';

interface ErrorMessageProps {
  errorType?: 'validation' | 'server' | 'network' | 'general';
  message: string;
  onRetry: () => void;
}

export const ErrorMessage = ({ 
  errorType = 'general',
  message, 
  onRetry 
}: ErrorMessageProps) => {
  // Determine heading based on error type
  const getErrorHeading = () => {
    switch(errorType) {
      case 'validation': return 'Please check your information';
      case 'server': return 'Server error';
      case 'network': return 'Connection problem';
      default: return 'Error sending message';
    }
  };
  
  // Get default message based on error type
  const getDefaultMessage = () => {
    switch(errorType) {
      case 'validation': return 'There are issues with your form submission. Please check the fields above.';
      case 'server': return 'There was a problem on our end. Please try again later or contact directly via email.';
      case 'network': return 'Please check your internet connection and try again.';
      default: return 'There was a problem sending your message. Please try again or contact directly via email.';
    }
  };

  return (
    <div 
      className="bg-red-900/20 border border-red-700 p-4 mb-6 rounded fade-in"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
            <path d="M12 8V12M12 16H12.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-400">{getErrorHeading()}</h3>
          <p className="text-sm text-red-300 mt-1">
            {message || getDefaultMessage()}
          </p>
          <div className="mt-3">
            <button 
              onClick={onRetry} 
              className="bg-red-900/40 px-4 py-1.5 rounded text-sm text-red-100 hover:bg-red-900/60 transition-colors"
              autoFocus
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
