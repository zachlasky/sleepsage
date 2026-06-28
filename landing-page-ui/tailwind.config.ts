import type { Config } from 'tailwindcss';

const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@sleep-sage/header-footer/dist/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        'darkest-gray': '#111827',
        'dark-gray': '#2d2b3e',
        'default-gray': '#3e3c52',
        'lightest-gray': '#e8e8ea',

        'darkest-purple': '#5c3cab',
        'dark-purple': '#7955d4',
        'default-purple': '#907bd2',
        'light-purple': '#c4a9f9',
        'lightest-purple': '#f6f3fb',

        'default-blue': '#155e75'
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif']
      },
      plugins: ['@tailwindcss/forms']
    }
  },
  plugins: [flowbite.plugin()],
  darkMode: 'class'
} satisfies Config;
