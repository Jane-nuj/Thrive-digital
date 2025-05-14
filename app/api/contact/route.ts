import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * Contact Form API Route
 * 
 * This route handles the contact form submissions, including:
 * - Email delivery via Resend
 * - Security features (CSRF, rate limiting, honeypot)
 * - Input validation and sanitization
 * - GDPR compliance
 */

// Memory-based rate limiting storage
// Note: This will reset on server restarts, which is acceptable for our low-traffic site
// For production sites with higher traffic, consider using a persistent store like Redis
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitStore: Record<string, RateLimitRecord> = {};

// Configuration constants
const RATE_LIMIT = 5; // 5 submissions per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

export async function POST(request: Request) {
  try {
    // CSRF protection
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');

    // Allow list of trusted domains
    const allowedDomains = [
      'https://we-thrive.digital',
      'https://www.we-thrive.digital',
      'https://thrive-digital.vercel.app'
    ];

    // In development, also allow localhost
    if (process.env.NODE_ENV === 'development') {
      allowedDomains.push('http://localhost:3000');
    }

    // Verify request origin is from our website
    const isValidOrigin = origin && allowedDomains.some(domain => origin.startsWith(domain));
    const isValidReferer = referer && allowedDomains.some(domain => referer.startsWith(domain));

    if (!isValidOrigin && !isValidReferer) {
      return NextResponse.json(
        { error: 'Invalid request origin' },
        { status: 403 }
      );
    }

    // Get client IP address for rate limiting
    // Note: In production with Vercel, use x-forwarded-for header
    const clientIp = request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown';

    // Check rate limit
    const now = Date.now();
    const rateLimitRecord = rateLimitStore[clientIp] || { count: 0, resetTime: now + RATE_LIMIT_WINDOW };

    // Reset counter if the window has expired
    if (now > rateLimitRecord.resetTime) {
      rateLimitRecord.count = 0;
      rateLimitRecord.resetTime = now + RATE_LIMIT_WINDOW;
    }

    // Check if rate limit exceeded
    if (rateLimitRecord.count >= RATE_LIMIT) {
      const retryAfterSeconds = Math.ceil((rateLimitRecord.resetTime - now) / 1000);
      
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': retryAfterSeconds.toString()
          }
        }
      );
    }

    // Extract form data
    const formData = await request.json();
    const { firstName, lastName, email, subject, message, honeypot } = formData;
    
    // Honeypot check - if the honeypot field contains data, it's likely a bot
    if (honeypot) {
      // Return a fake success response to fool bots
      // but don't actually process the submission
      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully. Thank you for reaching out!'
      });
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sanitize inputs to prevent email header injection
    const sanitizeField = (input: string): string => {
      if (!input) return '';
      // Remove line breaks which could be used for header injection
      return input
        .replace(/(\r\n|\n|\r)/gm, ' ')
        .trim();
    }

    // More permissive sanitization for names and subject
    const sanitizedFirstName = sanitizeField(firstName);
    const sanitizedLastName = sanitizeField(lastName);
    const sanitizedSubject = sanitizeField(subject);
    
    // For message, allow more special characters but still prevent injection
    // Convert line breaks to spaces for safety while preserving other characters
    const sanitizedMessage = message
      .replace(/(\r\n|\n|\r)/gm, '\n')  // Normalize line breaks
      .trim();

    // Validate email format again server-side
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Initialize Resend with API key
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'Email service configuration error' },
        { status: 500 }
      );
    }
    const resend = new Resend(resendApiKey);

    // Prepare email content with GDPR notice
    const emailText = `
Name: ${sanitizedFirstName} ${sanitizedLastName}
Email: ${email}
Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}

---
GDPR Notice: This information will only be used to respond to this inquiry and will not be used for marketing purposes or shared with third parties.
    `;

    const emailHtml = `
<p><strong>Name:</strong> ${sanitizedFirstName} ${sanitizedLastName}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${sanitizedSubject}</p>
<p><strong>Message:</strong><br>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
<hr>
<p><small>GDPR Notice: This information will only be used to respond to this inquiry and will not be used for marketing purposes or shared with third parties.</small></p>
    `;

    // Send email via Resend
    const data = await resend.emails.send({
      from: 'Contact Form <contact@we-thrive.digital>',
      to: ['contact@we-thrive.digital'],
      subject: `New contact form submission: ${sanitizedSubject}`,
      text: emailText,
      html: emailHtml,
      replyTo: email
    });

    // If we get here, increment the rate limit counter
    rateLimitRecord.count++;
    rateLimitStore[clientIp] = rateLimitRecord;

    // Log the email sending result in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Email sending result:', data);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. Thank you for reaching out!'
    });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json(
      { error: 'An error occurred while sending the message. Please try again later.' },
      { status: 500 }
    );
  }
}
