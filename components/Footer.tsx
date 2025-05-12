'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === '/contact';
  
  return (
    <footer className={`${isContactPage ? 'bg-charcoal text-white' : 'bg-white text-black'} px-6 py-12 mt-16`}>
      <div className="container mx-auto">
        {!isContactPage && (
          <p className="font-sans text-p1">
            If you think I'd be a good fit for your team,{' '}
            <Link href="/contact" className="text-gold underline hover:text-yellow-700 font-sans">
              drop me a line
            </Link>
            .
          </p>
        )}
      </div>
    </footer>
  );
}
