/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Archivo Black"', 'system-ui', 'sans-serif'],
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        lime: '#CCFF00',
        ink: '#0A0A0A',
        paper: '#ECE8DD',
      },
      boxShadow: {
        'brutal': '5px 5px 0 0 currentColor',
        'brutal-sm': '3px 3px 0 0 currentColor',
        'brutal-lime': '6px 6px 0 0 #CCFF00',
        'brutal-lime-lg': '10px 10px 0 0 #CCFF00',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-rev': 'marquee-rev 22s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
