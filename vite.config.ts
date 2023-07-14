import { dirname, resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

// ESM import.meta.url is not supported in Node.js CommonJS modules
const rootDir = new URL(dirname(import.meta.url)).pathname;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(rootDir, 'src/index.tsx'),
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
