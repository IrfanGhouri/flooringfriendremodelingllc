/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./home2.html",
    "./home3.html",
    "./home4.html",
    "./home5.html",
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
        },
        // Theme 4: Japandi Zen Editorial
        japandi: {
          cream: '#F4F1EA',
          clay: '#C58F72',
          clayHover: '#B37D60',
          charcoal: '#1A1E1B',
          stone: '#E5E1D8',
          sand: '#D8D3C5',
        },
        // Theme 5: Industrial Matte Dark
        industrial: {
          black: '#0D0E11',
          gray: '#1B1D22',
          steel: '#353A45',
          orange: '#FF5722',
          orangeHover: '#E64A19',
          yellow: '#FFC107',
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
