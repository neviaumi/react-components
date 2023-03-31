import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      // the proper extensions will be added
      fileName: 'react-components',
      name: '@busybox/react-components',
    },
    minify: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'react',
          'react-dom': 'reactDOM',
        },
      },
    },
    sourcemap: true,
  },
  plugins: [react()],
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd())],
    },
  },
});
