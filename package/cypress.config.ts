import { defineConfig } from 'cypress';
import { mergeConfig } from 'vite';

import appViteConfig from './vite.config.ts';

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
    viewportHeight: 960,
    viewportWidth: 1536,
  },
  screenshotOnRunFailure: false,
  video: false,
});
