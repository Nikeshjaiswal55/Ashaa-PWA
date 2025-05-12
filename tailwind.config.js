/** @type {import('tailwindcss').Config} */
export default {
  // content: ["./src/**/*.{js,ts,jsx,tsx,html}"], 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        goldenbrown: "#9F4522",
        cardpart: "#FFFBDC",
        commonwhite: "#FFFFFF",
        highlightgray: "#9D9D9D",
        shadowhighlight: "#858585",
        blacktext: "#1F1F1F",
        successgreen: "#189547",
        dangerred: "#E50000",
        linkblue: "#4557FF",
      },
      boxShadow: {
        'custom-blur': '0px 0px 22.1px 1px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        lexend: ['"Lexend"', 'sans-serif'],
        lexendDeca: ['"Lexend Deca"', 'sans-serif'],
      },
      fontSize: {
        'heading-1': ['28px', { lineHeight: '100%', letterSpacing: '0%' }],
        'heading-2': ['22px', { lineHeight: '100%', letterSpacing: '0%' }],
        'heading-3': ['20px', { lineHeight: '100%', letterSpacing: '0%' }],
        'heading-4': ['18px', { lineHeight: '100%', letterSpacing: '0%' }],
        'heading-5': ['16px', { lineHeight: '100%', letterSpacing: '0%' }],
        'subheading-2': ['14px', { lineHeight: '100%', letterSpacing: '0%' }],
        'subheading-3': ['12px', { lineHeight: '100%', letterSpacing: '0%' }],
        'body': ['16px', { lineHeight: '100%', letterSpacing: '0%' }],
      },
      fontWeight: {
        regular: "400",
        semibold: "600",
      },
    },
  },
  plugins: [],
};