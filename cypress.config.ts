import { defineConfig } from 'cypress';

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  component: {
    devServer: {
      bundler: 'vite',
      framework: 'react',
    },
    viewportHeight: 1024,
    viewportWidth: 768,
  },
  screenshotOnRunFailure: false,
  video: false,
});
