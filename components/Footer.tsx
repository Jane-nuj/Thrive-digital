'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === '/contact';
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white text-black px-6 mt-16">
      {/* Upper Section - Existing Content */}
      <div className="layout-container pt-20 pb-8">
        <p className="content-padding font-sans text-p1">
          {!isContactPage ? (
            <>
              If you think I'd be a good fit for your team,{' '}
              <Link href="/contact" className="text-gold underline hover:text-gold font-sans transition-colors duration-300">
                drop me a line
              </Link>
              .
            </>
          ) : (
            <>
              Let me know how I can <Link href="/" className="text-gold underline hover:text-gold font-sans transition-colors duration-300">help</Link>
            </>
          )}
        </p>
      </div>
      
      {/* Lower Section - New Content */}
      <div className="layout-container pb-12">
        <div className="content-padding flex flex-col md:flex-row md:items-center md:justify-between text-sm text-gray-700">
          {/* Copyright & Design Credit */}
          <div className="flex flex-col sm:flex-row sm:items-center mb-6 md:mb-0">
            <span className="mr-6 mb-2 sm:mb-0">© {currentYear} Thrive Digital</span>
            <span>Design and development by Jane Fletcher</span>
          </div>
          
          {/* Navigation & Social */}
          <div className="flex items-center">
            <Link 
              href="/privacy" 
              className="text-gray-700 hover:text-gold underline mr-8 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gold border border-gold hover:bg-transparent hover:border-gold hover:text-gold p-2 flex items-center justify-center transition-colors duration-300"
              aria-label="LinkedIn profile"
            >
              <Image 
                src="/images/linkedinv2-fill.svg" 
                alt="LinkedIn" 
                width={18} 
                height={18} 
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
