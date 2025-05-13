'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === '/contact';
  
  return (
    <footer className="bg-white text-black px-6 py-12 mt-16">
      <div className="layout-container">
        <p className="content-padding font-sans text-p1">
          {!isContactPage ? (
            <>
              If you think I'd be a good fit for your team,{' '}
              <Link href="/contact" className="text-gold underline hover:text-gold font-sans">
                drop me a line
              </Link>
              .
            </>
          ) : (
            <>
              Let me know how I can <Link href="/" className="text-gold underline hover:text-gold font-sans">help</Link>
            </>
          )}
        </p>
      </div>
    </footer>
  );
}
