# Mobile Layout Improvements

## Date
2025-05-13
(Updated: 2025-05-13)

## Decision
We've made several improvements to enhance the mobile experience:

1. Fixed the hamburger menu icon positioning in the mobile header
2. Improved the responsive typography for headings, particularly the h1 on the homepage
3. Fixed contact page spacing issues - increased vertical spacing between navbar and title
4. Made the contact page h1 sizing consistent with the homepage h1 on mobile views

## Implementation Details

### Hamburger Menu Positioning
The hamburger menu icon was previously pushed up against the logo instead of being properly aligned to the right side of the header. We fixed this by adding the `ml-auto` class to the mobile navigation toggle container:

```tsx
{/* Mobile Navigation Toggle */}
<div className="md:hidden ml-auto">
  <button 
    className="text-white hover:text-gold focus:outline-none transition-colors"
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    aria-label="Toggle mobile menu"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
  </button>
</div>
```

### Responsive Typography
The homepage hero heading (h1) was not scaling properly on smaller screens, which affected the layout. We implemented two key improvements:

1. Added responsive font sizing using Tailwind's responsive modifiers:
   ```tsx
   <h1 className="font-heading text-2xl sm:text-3xl md:text-h1 mb-10 leading-tight">
   ```

2. Replaced `<br>` tags with `<span className="block">` elements for better layout control:
   ```tsx
   <h1 className="font-heading text-2xl sm:text-3xl md:text-h1 mb-10 leading-tight">
     <span className="block">Need a freelancer who has</span>
     <span className="block">designed it,</span>
     <span className="block">built it,</span>
     <span className="block">and <span className="text-gold">delivered it?</span></span>
   </h1>
   ```

### Contact Page Heading Consistency
We noticed an inconsistency where the contact page h1 appeared larger than the homepage h1 on mobile devices. We addressed this by applying the same responsive text sizing approach from the homepage to the contact page heading:

From:
```tsx
<h1 className="font-heading text-h1 mb-10 md:mb-12">
  Let me know how I can <span className="text-gold">help</span>.
</h1>
```

To:
```tsx
<h1 className="font-heading text-2xl sm:text-3xl md:text-h1 mb-10 md:mb-12 leading-relaxed">
  Let me know how I can <span className="text-gold">help</span>.
</h1>
```

This change:
1. Uses the same responsive text sizing approach (`text-2xl sm:text-3xl md:text-h1`) as the homepage
2. Maintains the smaller, more restrained typography on mobile screens
3. Preserves the gold accent on the word "help"
4. Adds `leading-relaxed` for consistent line height

### Contact Page Spacing
The contact page title was positioned too close to the navigation bar and needed additional vertical spacing. We addressed this by adding specific top padding values:

```tsx
<div className="bg-charcoal text-white py-12 pt-16 md:py-20 md:pt-24">
```

This approach:
1. Maintains the base vertical padding (`py-12 md:py-20`) that's consistent across the site
2. Adds targeted top padding (`pt-16 md:pt-24`) specifically for the contact page
3. Uses different values for mobile and desktop to ensure proper spacing across all viewport sizes

This approach provides better control over text wrapping and ensures consistent spacing between lines across all viewport sizes.

## Rationale

### Hamburger Menu
Proper positioning of navigation elements is essential for mobile usability. The hamburger menu should be positioned in a consistent location (typically top-right) where users expect to find navigation controls on mobile devices.

### Responsive Typography
1. Mobile-first design principles require text to be properly sized for all screen sizes
2. Using responsive typography ensures text remains readable without breaking layouts
3. Using `<span className="block">` instead of `<br>` tags provides better control over text wrapping and spacing
4. The `leading-tight` class ensures appropriate line spacing on smaller screens
5. This approach maintains the visual impact of the stacked text design while ensuring it works properly across all devices

## Alternatives Considered
1. Using media queries in CSS to adjust text size and line breaks
2. Using a different layout for mobile (non-stacked text)
3. Using viewport units (vw) for responsive sizing

## Accessibility Impact
These changes improve accessibility by:
1. Ensuring text remains legible at all screen sizes
2. Maintaining proper spacing for readability
3. Preserving the semantic structure of headings
4. Keeping the menu icon in an expected location for users of screen readers and other assistive technologies
