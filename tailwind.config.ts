import type { Config } from 'tailwindcss'
const { nextui } = require('@nextui-org/react')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      minHeight: {
        vh: 'calc(100vh - 60px - 44px)',
      },
      height: {
        header: 'var(--header-height)',
      },
      width: {
        sidebar: 'var(--sidebar-width)',
      },
      boxShadow: {
        card: '0px 0px 31px rgba(44, 50, 63, 0.02)',
        medium: '0 0 10px rgba(0, 0, 0, 0.1)',
        auth: '0 0 10px rgba(0, 0, 0, 0.1)',
        header: '0px 1px 10px 0px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        'border-200': 'var(--border-200)',
      },
      backgroundColor: {
        main: '#f7f7fa',
      },
      margin: {
        auth: '1.875rem auto',
        main: 'var(--sidebar-width)',
      },
      padding: {
        main: 'var(--header-height)',
        'sub-menu': '7px 10px 7px 30px',
      },
      borderRadius: {
        auth: '8px 20px 20px 8px',
      },
      inset: {
        sidebar: 'var(--header-height)',
      },
    },
    container: {
      center: true,
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {},
        dark: {
          layout: {},
          colors: {},
        },
      },
    }),
  ],
}
export default config
