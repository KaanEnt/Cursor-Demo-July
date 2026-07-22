import type { Config } from 'tailwindcss';

// All colors resolve to CSS variables defined in src/design-system/tokens.css.
// Edit that file to rebrand the site; never hardcode brand hex in components.
export default {
  content: ['./*.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        foreground: 'var(--color-foreground)',
        surface: 'var(--color-surface)',
        muted: 'var(--color-muted)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          foreground: 'var(--color-primary-foreground)',
          faint: 'var(--color-primary-faint)',
          soft: 'var(--color-primary-soft)',
          strong: 'var(--color-primary-strong)',
          band: 'var(--color-primary-band)',
        },
        border: 'var(--color-border)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        display: 'var(--font-display)',
      },
    },
  },
  plugins: [],
} satisfies Config;
