# Thrive Digital Site Enhancements - Implementation Plan

This document outlines the implementation plan for enhancing the Thrive Digital site. These improvements focus on visual consistency, professionalism, and necessary legal elements.

## Task Sequence

### 1. LinkedIn Icon Fix
- Replace text link with icon in mobile navigation
- Ensure consistent styling between mobile and desktop
- Implementation: Modify `MobileNav.tsx` to include the LinkedIn icon
- Git commit message: "Fix LinkedIn icon consistency between mobile and desktop"

### 2. CTA Button Styling Consistency
- Update the "Get in touch" button on homepage to match "Send" button style on contact page
- Change from filled gold background to outlined style with gold border
- Implementation: Update button classes in `app/page.tsx`
- Git commit message: "Update homepage CTA button to match contact page styling"

### 3. Hover Transition Improvements
- Add smooth transitions to all interactive elements
- Ensure consistent transition timing (300ms recommended)
- Apply to navigation buttons, links, and form elements
- Implementation: Add `transition-colors duration-300` to interactive elements
- Git commit message: "Add consistent hover transitions to interactive elements"

### 4. Footer Redesign
- Increase padding for more depth
- Add subtle divider line below existing text
- Create new bottom row with copyright, design credit, privacy link, and LinkedIn icon
- Implementation: Restructure `Footer.tsx`
- Git commit message: "Redesign footer with additional information section"

### 5. Privacy/Cookie Policy Page
- Create combined policy page with professional copy
- Match existing site aesthetic and typography
- Make accessible via footer link
- Implementation: Create new file at `app/privacy/page.tsx` and link from footer
- Git commit message: "Add privacy policy page and link from footer"

### 6. Open Graph Tag Implementation
- Add metadata for social sharing
- Include title, description, and image tags
- Implementation: Update metadata in `app/layout.tsx`
- Git commit message: "Implement Open Graph tags for improved social sharing"

## Implementation Notes

- Each task will be completed sequentially and committed to git
- All changes will follow the project's design system and coding patterns
- Accessibility will be maintained throughout all implementations
