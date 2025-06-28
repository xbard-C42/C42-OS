/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // C42 OS Brand Colors
      colors: {
        'c42': {
          'primary': '#8B5CF6', // Purple
          'secondary': '#06B6D4', // Cyan
          'accent': '#10B981', // Emerald
          'warning': '#F59E0B', // Amber
          'danger': '#EF4444', // Red
        },
        // Neurodivergent-friendly color palette
        'neuro': {
          'calm': '#F0F9FF', // Light blue
          'focus': '#EDE9FE', // Light purple
          'success': '#ECFDF5', // Light green
          'warning': '#FFFBEB', // Light yellow
          'muted': '#F9FAFB', // Light gray
        }
      },
      // Accessibility-focused typography
      fontFamily: {
        'mono': ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      // Neurodivergent-friendly spacing
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      // Focus states for accessibility
      ringWidth: {
        'focus': '3px',
      },
      // Animation preferences
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
    },
  },
  plugins: [
    // Accessibility plugin
    require('@tailwindcss/forms'),
    // Custom C42 OS plugin
    function({ addUtilities }) {
      addUtilities({
        '.focus-visible-only': {
          '&:focus:not(:focus-visible)': {
            outline: 'none',
            'box-shadow': 'none',
          },
          '&:focus-visible': {
            outline: '3px solid #8B5CF6',
            'outline-offset': '2px',
          },
        },
        '.neuro-friendly': {
          'transition': 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
      });
    },
  ],
};