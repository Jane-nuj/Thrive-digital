/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow-600': '#b77f0f', // Updated to new gold color
        'off-white': '#f2f2f2',
        'charcoal': '#2a2a2a',
        'black': '#000000', // Already default, but good to be explicit
        'white': '#ffffff', // Already default, but good to be explicit
        'gold': '#b77f0f', // Updated to new gold color for easier use
      },
      fontFamily: {
        // Use CSS variables defined in layout.tsx
        sans: ['var(--font-poppins)', 'sans-serif'],
        heading: ['var(--font-manrope)', 'sans-serif'],
      },
      fontSize: {
        // Heading sizes
        'h1': ['2.5rem', { lineHeight: '1.1em', letterSpacing: '-0.02em', fontWeight: '300' }],
        'h2': ['2.8rem', { lineHeight: '1.05em', letterSpacing: '-0.02em', fontWeight: '300' }],
        'h3': ['2.2rem', { lineHeight: '1em', letterSpacing: '-0.02em', fontWeight: '300' }],
        
        // Paragraph sizes
        'p1': ['1rem', { lineHeight: '1.2em', letterSpacing: '0.01em', fontWeight: '300' }],
        'p2': ['1.4rem', { lineHeight: '1.2em', letterSpacing: '0.01em', fontWeight: '300' }],
        'p3': ['0.9rem', { lineHeight: '1.2em', letterSpacing: '0.01em', fontWeight: '300' }],
        
        // Button size
        'btn': ['1rem', { lineHeight: '1.2em', letterSpacing: '0em', fontWeight: '400' }],
        
        // Site title size
        'site-title': ['1.5rem', { lineHeight: '0.7em', letterSpacing: '-0.02em', fontWeight: '300' }],
      },
    },
  },
  plugins: [],
}
