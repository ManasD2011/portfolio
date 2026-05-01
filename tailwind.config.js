/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Syne"', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#080810',
          2: '#0d0d1a',
          3: '#111120',
        },
        surface: {
          DEFAULT: '#161628',
          2: '#1e1e38',
        },
        border: {
          DEFAULT: '#252540',
          2: '#353560',
        },
        green: {
          DEFAULT: '#00ff88',
          dim: 'rgba(0,255,136,0.1)',
          glow: 'rgba(0,255,136,0.2)',
        },
        muted: '#6b6b9a',
        subtle: '#3a3a5c',
        primary: '#e2e2f4',
      },
      animation: {
        'cursor-blink': 'blink 1.1s step-end infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        fadeUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        glowPulse: { '0%,100%': { boxShadow: '0 0 20px rgba(0,255,136,0.1)' }, '50%': { boxShadow: '0 0 40px rgba(0,255,136,0.25)' } },
        scan: { from: { transform: 'translateY(-100%)' }, to: { transform: 'translateY(100vh)' } },
      },
    },
  },
  plugins: [],
}
