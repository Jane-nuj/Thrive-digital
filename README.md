# Thrive Digital

A personal consultancy website for UI/UX design, content strategy, and digital product development.

## Project Overview

Thrive Digital is a lean, accessible, and performance-focused website built with modern web technologies. It showcases professional services while demonstrating best practices in frontend development.

## Technology Stack

- **Framework**: Next.js (App Router)
- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Email Service**: Resend
- **Deployment**: Vercel

## Key Features

- **Responsive Design**: Optimised for all device sizes
- **Accessibility Focus**: WCAG compliance with enhanced ARIA attributes and screen reader support
- **Motion Preferences**: Respects user motion preferences with reduced-motion alternatives
- **Contact Form**: Fully accessible with comprehensive validation, visual feedback, and security features
- **Performance Optimized**: Lightweight, fast-loading pages

## Development Phases

The project is being developed incrementally across several phases:

1. **Core Site Structure & Design**: Initial layout and responsive framework - done
2. **Form Validation**: Client-side form validation and error handling - done
3. **Visual Feedback**: Enhanced state transitions and animations - done
4. **Accessibility Enhancements**: ARIA implementation and screen reader support - done
5. **Security & Integration**: Email service integration with security measures - in progress

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourname/thrive-digital.git
cd thrive-digital

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local to add your Resend API key

# Run development server
npm run dev
```

Visit `http://localhost:3000` to view the site.

## Environment Variables

- `RESEND_API_KEY`: API key for Resend email service

## Deployment

The project is currently in development. A staging deployment can be viewed at [https://thrive-digital.vercel.app/](https://thrive-digital.vercel.app/).

See the [tasks.md](tasks.md) file for the current development backlog and upcoming features.

## Security Features

- CSRF protection
- Honeypot fields for bot detection
- Rate limiting (5 submissions per hour per IP)
- Input sanitization
- GDPR-compliant contact handling

## License

[MIT License](LICENSE)

## Contact

Contact Jane at [contact@we-thrive.digital](mailto:contact@we-thrive.digital) for any questions.
