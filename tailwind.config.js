/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './cypress/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{.js, cjs}',
  ],
  presets: [require('@busybox/tailwindcss-config')],
};
