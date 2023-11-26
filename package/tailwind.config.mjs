import tailwindConfig, {
  withColors,
  withSpacing,
} from '@busybox/tailwindcss-config';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './cypress/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './.storybook/**/*.{js,cjs}',
  ],
  presets: [withSpacing(withColors(tailwindConfig.default))],
};

export default config;
