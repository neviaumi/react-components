import tailwindConfig, { withColors } from '@busybox/tailwindcss-config';

/** @type {import('tailwindcss').Config} */
const config = withColors({
  content: [
    './cypress/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{js,cjs}',
  ],
  presets: [tailwindConfig.default],
});

export default config;
