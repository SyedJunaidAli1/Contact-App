/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gray:"#323334",
        yellow:"#FFEAAE",
        "darl-yellow":"#FCCA3F",
        orange:"#F6820C"
      }
    },
  },
  plugins: [],
  
}
