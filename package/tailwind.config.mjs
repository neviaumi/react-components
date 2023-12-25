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
  theme: {
    extend: {
      keyframes: {
        hide: {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(0)' },
        },
        show: {
          from: { transform: 'scale(0)' },
          to: { transform: 'scale(1)' },
        },
      },
    },
  },
};

export default config;
