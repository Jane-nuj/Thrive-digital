# Error Pages Documentation

## Overview

This document outlines the implementation details of the custom error pages for Thrive Digital site. The site has three types of error pages:

1. **404 Not Found** (`app/not-found.tsx`) - Displayed when a user navigates to a non-existent URL
2. **Component Error** (`app/error.tsx`) - Shown when a component encounters an error during rendering
3. **Global Error** (`app/global-error.tsx`) - Displayed for critical application failures

## Key Features

### Visual Design
- Dark background with subtle dot pattern
- Gold accent elements (underlines, button hover states)
- Animated transitions for improved user experience
- Responsive layout for all device sizes
- Visual consistency with the main Thrive Digital branding

### Accessibility Features
- Semantic HTML structure
- Proper heading hierarchy
- ARIA attributes for improved screen reader navigation
- Keyboard navigation support
- Screen reader text for additional context
- Support for reduced motion preferences
- Focus management with autoFocus on primary actions
- Focus indication styles

### User Experience Enhancements
- Clear, concise error messaging
- Helpful supplementary text explaining possible causes
- Multiple recovery options (retry, return home)
- Keyboard shortcuts with visible indicators:
  - `Ctrl+R` or `⌘+R` for retry actions
  - `Ctrl+H` or `⌘+H` for returning to home
  - `ESC` for returning to home
- Error reference codes for debugging purposes

## Implementation Details

### Motion Preferences
All animations respect the user's motion preferences using the `useMotionPreference` hook from `lib/motion-preferences.ts`. When a user has the "reduce motion" setting enabled in their operating system, animations are minimized or disabled.

### Framer Motion Integration
The error pages use Framer Motion for smooth animations:
- Staggered entrance animations
- Underline animations
- Hover state transitions
- Opacity and position transitions

### Error Recovery
- The 404 page provides a link back to the homepage
- The Component Error page provides a retry button and a link to the homepage
- The Global Error page provides a reload application button

## Testing
To test the different error pages:
- 404: Navigate to any non-existent URL
- Component Error: Visit `/test-error` (a test route set up to intentionally throw an error)
- Global Error: This would only appear for critical application failures and cannot be easily tested in normal conditions

## Future Enhancements
- Consider integrating error logging to a monitoring service
- Implement more specific error messages based on error types
- Add language localization for error messages
