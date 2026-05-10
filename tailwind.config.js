/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 페이퍼 베이스 / 보조 / 카드
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        'bg-3': 'var(--bg-3)',
        paper: 'var(--paper)',
        // 텍스트
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        'ink-4': 'var(--ink-4)',
        // 보더
        rule: 'var(--rule)',
        'rule-light': 'var(--rule-light)',
        // 브랜드
        indigo: {
          DEFAULT: 'var(--indigo)',
          bg: 'var(--indigo-bg)',
          deep: 'var(--indigo-deep)',
        },
        pink: {
          DEFAULT: 'var(--pink)',
          bg: 'var(--pink-bg)',
          deep: 'var(--pink-deep)',
        },
        // Semantic
        success: {
          DEFAULT: 'var(--green)',
          bg: 'var(--green-bg)',
          deep: 'var(--green-deep)',
        },
        warning: {
          DEFAULT: 'var(--amber)',
          bg: 'var(--amber-bg)',
          deep: 'var(--amber-deep)',
        },
        danger: {
          DEFAULT: 'var(--red)',
          bg: 'var(--red-bg)',
          deep: 'var(--red-deep)',
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Pretendard', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        'display-xl': ['88px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['48px', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        h1: ['32px', { lineHeight: '1.2' }],
        h2: ['24px', { lineHeight: '1.3' }],
        h3: ['20px', { lineHeight: '1.4' }],
        'body-lg': ['17px', { lineHeight: '1.55' }],
        body: ['15px', { lineHeight: '1.6' }],
        'body-sm': ['13.5px', { lineHeight: '1.55' }],
        meta: ['12px', { lineHeight: '1.4' }],
        eyebrow: ['11px', { lineHeight: '1.4', letterSpacing: '0.16em' }],
        tiny: ['10px', { lineHeight: '1.3' }],
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        card: '0 8px 24px rgba(20,20,18,0.08)',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
