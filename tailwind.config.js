/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./home2.html",
    "./home3.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme 1: Modern Luxury
        luxury: {
          dark: '#0B0F19',
          gold: '#C5A880',
          goldHover: '#B3946C',
          light: '#F4F4F9',
          card: '#131926',
        },
        // Theme 2: Bold Contemporary
        boldtheme: {
          navy: '#0A192F',
          amber: '#F59E0B',
          amberHover: '#D97706',
          slate: '#1E293B',
          accent: '#3B82F6',
        },
        // Theme 3: Minimalist Clean / Coastal
        minimal: {
          ivory: '#FAF9F6',
          sage: '#4A6B53',
          sageHover: '#395340',
          olive: '#8B9B7A',
          charcoal: '#2D3748',
          sand: '#EAE6DF',
        }
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
