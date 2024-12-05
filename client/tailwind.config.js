/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Existing colors
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        boxdark: {
          DEFAULT: '#1A222C',
          2: '#1A222C',
        },
        bodydark: {
          DEFAULT: '#AEB7C0',
          1: '#DEE4EE',
          2: '#8A99AF',
        },
        // New colors needed by your CSS
        primary: {
          DEFAULT: '#3B82F6', // You can adjust this color value
        },
        strokedark: {
          DEFAULT: '#2E3A47', // You can adjust this color value
        },
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
