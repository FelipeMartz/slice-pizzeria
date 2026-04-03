/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'slice-black': '#0a0a0a',
        'slice-wine': '#1a0a0a',
        'slice-cream': '#f5f5f0',
        'slice-gold': '#c9a959',
        'slice-burgundy': '#6b0f1a',
      },
      fontFamily: {
        'sans': ['Inter', 'Geist', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'pizza': '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 100px rgba(201, 169, 89, 0.1)',
        'card-3d': '0 20px 40px -8px rgba(0, 0, 0, 0.7), 0 8px 16px -4px rgba(0, 0, 0, 0.5)',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
