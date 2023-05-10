import { defineConfig } from 'cypress';
import { mergeConfig } from 'vite';

import appViteConfig from './vite.config.js';

export default defineConfig({
  component: {
    devServer: {
      bundler: 'vite',
      framework: 'react',
      viteConfig: mergeConfig(appViteConfig, {
        define: {
          module: {},
        },
      }),
    },
    viewportHeight: 1024,
    viewportWidth: 768,
  },
  screenshotOnRunFailure: false,
  video: false,
});
