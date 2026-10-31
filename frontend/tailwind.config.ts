import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: '#0E2A20',
        leaf: '#14503A',
        emerald: '#1E7F55',
        lime: '#B6D94A',
        mint: {
          DEFAULT: '#CFE6B5',
          light: '#E4F2CF',
        },
        cream: '#F2F6EA',
        coral: '#FF6B3D',
        sun: '#FFB627',
        muted: '#4F6358',
      },
      fontFamily: {
        display: ['var(--font-bricolage-grotesque)', 'sans-serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
      },
      fontSize: {
        'h2-desktop': ['52px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h2-mobile': ['36px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h3': ['28px', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      borderRadius: {
        'pill': '9999px',
        'card': '24px',
        'card-lg': '32px',
        'arch': '2.5rem 2.5rem 0 0',
        'leaf': '0 2.75rem 0 2.75rem', // 44px
      },
      boxShadow: {
        'soft': '0 4px 24px -4px rgb(14 42 32 / 0.12)',
        'card': '0 8px 32px -8px rgb(14 42 32 / 0.15)',
        'halo': '0 0 0 1px rgb(182 217 74 / 0.3), 0 0 60px -20px rgb(182 217 74 / 0.4)',
      },
      spacing: {
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
        '26': '6.5rem',  // 104px
        '30': '7.5rem',  // 120px
      },
      screens: {
        'xs': '420px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      transitionDuration: {
        '400': '400ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;