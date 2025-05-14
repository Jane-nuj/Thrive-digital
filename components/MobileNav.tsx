'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Handle ESC key to close menu
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div 
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="absolute right-0 h-full w-64 bg-charcoal shadow-xl flex flex-col">
        {/* Close button */}
        <div className="px-6 py-4 flex justify-end">
          <button 
            onClick={onClose}
            className="text-white hover:text-gold focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="px-6 py-8 flex-1">
          <ul className="space-y-6">
            <li>
              <Link 
                href="/" 
                className="text-white hover:text-gold font-heading text-h3"
                onClick={onClose}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="text-white hover:text-gold font-heading text-h3"
                onClick={onClose}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link 
                href="https://linkedin.com" 
                className="inline-flex border border-white hover:border-gold hover:text-gold p-2 items-center justify-center transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                aria-label="LinkedIn profile"
              >
                <Image 
                  src="/images/linkedinv2-fill.svg" 
                  alt="LinkedIn" 
                  width={20} 
                  height={20} 
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
