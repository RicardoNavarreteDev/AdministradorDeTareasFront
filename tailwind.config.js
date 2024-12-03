/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue-logo': '#0d72ff',
        'custom-blue-logo2': '#0c3e8c', // Tu color personalizado
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

