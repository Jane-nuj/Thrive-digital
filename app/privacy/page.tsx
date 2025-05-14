import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="py-12 md:py-20">
      <div className="layout-container">
        <div className="content-padding">
          
          {/* Skip to content link (visually hidden until focused) */}
          <a 
            href="#content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#b77f0f] px-4 py-2 text-white"
          >
            Skip to content
          </a>
          
          {/* Title section */}
          <div id="content" className="mb-16">
            <h1 className="font-heading text-2xl sm:text-3xl md:text-h1 mb-8 leading-relaxed">
              Privacy & Cookie <span className="text-gold">Policy</span>
            </h1>
          </div>
          
          {/* Overview section */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl mb-6">Overview</h2>
            <p className="font-sans text-p1 mb-7">
              This Privacy & Cookie Policy explains how Thrive Digital (operated by Jane Fletcher) collects, uses, and protects your information when you use this website. I'm committed to protecting your privacy while providing a professional service.
            </p>
          </section>
          
          {/* Information Collection */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl mb-6">Information Collection</h2>
            
            <div className="mb-8">
              <h3 className="font-heading text-lg mb-5 text-gold">Contact Form</h3>
              <p className="font-sans text-p1 mb-4">
                When you submit the contact form on this site, I collect:
              </p>
              <ul className="font-sans text-p1 mb-7 list-disc pl-8 space-y-2">
                <li>Your first and last name</li>
                <li>Your email address</li>
                <li>The subject of your inquiry</li>
                <li>Your message content</li>
              </ul>
              <p className="font-sans text-p1 mb-4">
                This information is provided voluntarily when you choose to contact me.
              </p>
            </div>
            
            <div>
              <h3 className="font-heading text-lg mb-5 text-gold">Automated Collection</h3>
              <p className="font-sans text-p1 mb-4">
                My site automatically collects:
              </p>
              <ul className="font-sans text-p1 mb-7 list-disc pl-8 space-y-2">
                <li>Technical information about your device (browser type, operating system)</li>
                <li>Your IP address</li>
                <li>Pages you visit on this site</li>
                <li>Referral source (how you found this site)</li>
              </ul>
            </div>
          </section>
          
          {/* How Your Information Is Used */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl mb-6">How Your Information Is Used</h2>
            <p className="font-sans text-p1 mb-4">
              Information submitted through the contact form is used solely to:
            </p>
            <ul className="font-sans text-p1 mb-7 list-disc pl-8 space-y-2">
              <li>Respond to your inquiry</li>
              <li>Communicate about potential projects or collaborations</li>
              <li>Maintain a record of our correspondence</li>
            </ul>
            
            <p className="font-sans text-p1 mb-4">
              I will never:
            </p>
            <ul className="font-sans text-p1 mb-7 list-disc pl-8 space-y-2">
              <li>Sell or rent your personal information</li>
              <li>Use your data for marketing purposes without explicit consent</li>
              <li>Share your information with third parties except as necessary to provide services (see "Third-Party Services" below)</li>
            </ul>
          </section>
          
          {/* Data Storage and Protection */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl mb-6">Data Storage and Protection</h2>
            <p className="font-sans text-p1 mb-4">
              Your contact information is stored securely for a maximum of 24 months after our last communication. After this period, your data is deleted unless there is a legitimate business reason to retain it (such as an ongoing project).
            </p>
            <p className="font-sans text-p1 mb-7">
              I implement appropriate security measures to protect your information from unauthorized access, alteration, or disclosure.
            </p>
          </section>
          
          {/* Third-Party Services */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl mb-6">Third-Party Services</h2>
            <p className="font-sans text-p1 mb-7">
              This site uses Resend as an email delivery service to process contact form submissions. When you submit the contact form, your information is processed by Resend in accordance with their privacy policy.
            </p>
          </section>
          
          {/* Cookies */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl mb-6">Cookies</h2>
            <p className="font-sans text-p1 mb-4">
              This site uses only essential cookies necessary for the website to function properly. These cookies:
            </p>
            <ul className="font-sans text-p1 mb-7 list-disc pl-8 space-y-2">
              <li>Are required for core functionality</li>
              <li>Do not track personal information</li>
              <li>Are automatically deleted when you close your browser</li>
              <li>Cannot be disabled without affecting site functionality</li>
            </ul>
            <p className="font-sans text-p1 mb-7">
              No third-party analytics, advertising, or tracking cookies are used on this site.
            </p>
          </section>
          
          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl mb-6">Your Rights</h2>
            <p className="font-sans text-p1 mb-4">
              You have the right to:
            </p>
            <ul className="font-sans text-p1 mb-7 list-disc pl-8 space-y-2">
              <li>Request access to the personal information I hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to my use of your information</li>
              <li>Request a copy of your information in a machine-readable format</li>
            </ul>
            <p className="font-sans text-p1 mb-7">
              To exercise any of these rights, please contact me using the information below.
            </p>
          </section>
          
          {/* Changes to This Policy */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl mb-6">Changes to This Policy</h2>
            <p className="font-sans text-p1 mb-7">
              This policy may be updated occasionally to reflect changes in practices or legal requirements. Significant changes will be communicated via the website.
            </p>
          </section>
          
          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="font-heading text-2xl mb-6">Contact Information</h2>
            <p className="font-sans text-p1 mb-4">
              If you have any questions about this Privacy & Cookie Policy, please:
            </p>
            <p className="font-sans text-p1 mb-7">
              Visit the{' '}
              <Link href="/contact" className="text-gold underline hover:text-gold font-sans transition-colors duration-300">
                contact page
              </Link>{' '}
              to get in touch with Jane Fletcher.
            </p>
          </section>
          
          {/* Last Updated */}
          <section className="mb-12">
            <p className="font-sans text-sm text-gray-500">
              Last updated: May 15, 2025
            </p>
          </section>
          
        </div>
      </div>
    </main>
  );
}
