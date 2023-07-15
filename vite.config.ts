import { dirname, join, resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

// ESM import.meta.url is not supported in Node.js CommonJS modules
const rootDir = new URL(dirname(import.meta.url)).pathname;

function getEntryPointFromSource(filePath: string) {
  return resolve(rootDir, join('src', filePath));
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: [
        'Button/Button.tsx',
        'Button/IconButton.tsx',
        'Card/Card.tsx',
        'FileUploadInput/FileUploadInput.tsx',
        'Form/Field.tsx',
        'Form/Label.tsx',
        'icons/solid.tsx',
        'Layout/Layout.tsx',
        'Link/Link.tsx',
        'List/List.tsx',
        'MediaRecorder/AudioRecorder.tsx',
        'MediaViewer/Audio.tsx',
        'MediaViewer/Image.tsx',
        'Modal/Modal.tsx',
        'NumberInput/NumberInput.tsx',
        'RadioGroup/RadioGroup.tsx',
        'Select/Select.tsx',
        'Slider/Slider.tsx',
        'TextInput/TextInput.tsx',
      ].map(sourcePath => getEntryPointFromSource(sourcePath)),
      name: '@busybox/react-components',
    },
    minify: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        exports: 'named',
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
