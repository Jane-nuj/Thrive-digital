# Thrive Digital Site - Development Context

## Project Overview
This is a portfolio/freelancer website for Jane Fletcher featuring a clean, minimal design with dark charcoal background and gold accents. The site uses Manrope for headings and Poppins for body text, and features a mobile-first responsive layout with a working contact form.

## Recent Updates (2025-05-13)
We recently fixed several layout and styling issues:

1. **Gold Color Consistency**: Standardized the gold color across the site to use #b77f0f
2. **Content Alignment**: Aligned content with the left hand side of the logo for visual consistency
3. **Sticky Navigation**: Made the menu bar persist on screen when scrolling with a subtle shadow
4. **Footer Consistency**: Standardized the footer to use white background with black text on all pages
5. **Navigation Color**: Ensured the navigation bar uses the same color across all pages
6. **Contact Page Color Alignment**: Fixed the Contact link in header and Send button text to display in white instead of gold
7. **Design Consistency**: Improved visual hierarchy by reserving gold color only for accent text like "help"
8. **Mobile Navigation Alignment**: Fixed hamburger menu icon position to align properly on the right side
9. **Responsive Typography**: Improved h1 heading display on mobile with responsive font sizes and better text wrapping

Documentation for these changes has been added to:
- `.cline/decisions/2025-05-13-layout-and-styling-fixes.md`
- `.cline/decisions/2025-05-13-contact-page-color-alignment.md`
- `.cline/decisions/2025-05-13-mobile-layout-improvements.md`

## Current Focus
- Improving form styling and user experience
- Ensuring consistent spacing and alignment
- Standardizing colors and visual elements

## Next Steps
- Refine mobile spacing, particularly in the hero section
- Add proper spacing between sections on smaller screens
- Fix LinkedIn icon size inconsistency between mobile and desktop
- Improve hover transitions on navigation and buttons
- Add subtle animations for page transitions

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Deployed on Vercel

## Project Structure
- `/app`: Main application pages using Next.js App Router
- `/components`: Reusable UI components
- `/public`: Static assets
- `tailwind.config.js`: Tailwind configuration including custom colors and typography

## Development Process
- **Server Management**: It's important to stop the Next.js development server (`npm run dev`) when not actively working. This helps prevent high CPU usage from lingering `next-router-worker` or `node` processes. If high CPU usage is observed after stopping the server, these processes may need to be manually terminated via Activity Monitor or the `kill <PID>` command.
