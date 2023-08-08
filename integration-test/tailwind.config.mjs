import tailwindConfig from '@busybox/react-components/tailwind-config';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    '../node_modules/@busybox/react-components/dist/*.{js,jsx}',
    './.storybook/**/*.{.js,cjs}',
  ],
  presets: [tailwindConfig.default],
};

export default config;
