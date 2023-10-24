/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        loginPage: '29px 29px 45px -49px rgba(0,0,0,0.45);'
      },
      backgroundColor: {
        shadeClr: '#f1f3f6',
        primary: '#5193f2'
      },
      colors: {
        primary: '#5193f2'
      }
    },
  },
  plugins: [],
}

