import { NextResponse } from 'next/server';

// This would normally use the Resend SDK 
// npm install resend
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { firstName, lastName, email, subject, message } = formData;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Uncomment to use with your Resend API key
    /* 
    const data = await resend.emails.send({
      from: 'Contact Form <contact@your-domain.com>',
      to: ['contact@we-thrive.digital'],
      subject: `New contact form submission: ${subject}`,
      text: `
        Name: ${firstName} ${lastName}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
    });
    */

    // For development, just simulate a successful response
    console.log('Contact form submission:', { firstName, lastName, email, subject, message });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been sent successfully. Thank you for reaching out!' 
      }
    );
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json(
      { error: 'An error occurred while sending the message. Please try again later.' },
      { status: 500 }
    );
  }
}
