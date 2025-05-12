'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Logo from './Logo';
import MobileNav from './MobileNav';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-charcoal text-white px-6 py-6 pt-8">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Logo width={180} height={40} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            href="/contact" 
            className={`${pathname === '/contact' ? 'border-b-2 border-gold text-gold' : 'hover:text-gold'} font-sans text-p1 flex items-center`}
          >
            Contact
          </Link>
          <Link 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="border border-white hover:border-gold hover:text-gold p-2 flex items-center justify-center transition-colors"
            aria-label="LinkedIn profile"
          >
            <Image 
              src="/images/linkedinv2-fill.svg" 
              alt="LinkedIn" 
              width={20} 
              height={20} 
            />
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button 
            className="text-white hover:text-gold focus:outline-none transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </nav>
    </header>
  );
}
