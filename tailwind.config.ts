import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // M&K brand colors from actual Figma screens
        primary: {
          DEFAULT: '#4B6AAF', // Main blue from hero
          light: '#5574B3', // Lighter blue
          dark: '#2B4170', // Dark blue gradient end
          darker: '#193976', // Darkest blue
          50: '#F0F4FB',
          100: '#E1E9F7',
          200: '#C3D3EF',
          300: '#A5BDE7',
          400: '#6991D7',
          500: '#4B6AAF',
          600: '#3A5490',
          700: '#2B4170',
          800: '#1F2F52',
          900: '#141E34',
        },
        secondary: {
          DEFAULT: '#EB434D', // Brand red accent
          light: '#FF6B74',
          dark: '#D63440',
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          300: '#FDA4AF',
          400: '#FB7185',
          500: '#EB434D',
          600: '#D63440',
          700: '#BE2A36',
          800: '#A61E2B',
          900: '#8B1A25',
        },
        accent: {
          DEFAULT: '#38c448', // Green accent
          light: '#4ed45e',
          dark: '#2ca33a',
          50: '#f0fdf2',
          100: '#dcfce0',
          200: '#bbf7c3',
          300: '#86efac',
          400: '#4ed45e',
          500: '#38c448',
          600: '#2ca33a',
          700: '#228831',
          800: '#1c6b28',
          900: '#155320',
        },
        neutral: {
          50: '#fefefe',
          100: '#f9f9f9',
          200: '#E4E4E7',
          300: '#bcd5ff',
          400: '#8994a6',
          500: '#757d89',
          600: '#52525B',
          700: '#3f3f3f',
          800: '#23252b',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-soyuz)', 'Soyuz Grotesk', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        // M&K brand font sizes from Figma
        'xs': ['14px', { lineHeight: '18px' }],
        'sm': ['16px', { lineHeight: '20px' }],
        'base': ['18px', { lineHeight: '24px' }], // Inter body text
        'lg': ['20px', { lineHeight: '28px' }],
        'xl': ['24px', { lineHeight: '32px' }],
        '2xl': ['32px', { lineHeight: '40px' }], // Soyuz subheadings
        '3xl': ['40px', { lineHeight: '48px' }],
        '4xl': ['50px', { lineHeight: '60px' }], // Soyuz section headers
        '5xl': ['60px', { lineHeight: '72px' }], // Soyuz hero text
        '6xl': ['72px', { lineHeight: '86px' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'wave': 'wave 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        wave: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;