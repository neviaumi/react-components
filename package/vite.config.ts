import { dirname, resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

// ESM import.meta.url is not supported in Node.js CommonJS modules
const rootDir = new URL(dirname(import.meta.url)).pathname;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: [
        resolve(rootDir, 'src/Button/Button.tsx'),
        resolve(rootDir, 'src/Button/IconButton.tsx'),
        resolve(rootDir, 'src/Card/Card.tsx'),
        resolve(rootDir, 'src/FileUploadInput/FileUploadInput.tsx'),
        resolve(rootDir, 'src/Form/Field.tsx'),
        resolve(rootDir, 'src/Form/Label.tsx'),
        resolve(rootDir, 'src/icons/solid.tsx'),
        resolve(rootDir, 'src/Layout/Layout.tsx'),
        resolve(rootDir, 'src/Link/Link.tsx'),
        resolve(rootDir, 'src/List/List.tsx'),
        resolve(rootDir, 'src/MediaRecorder/AudioRecorder.tsx'),
        resolve(rootDir, 'src/AudioPlayer/AudioPlayer.tsx'),
        resolve(rootDir, 'src/Image/Image.tsx'),
        resolve(rootDir, 'src/Modal/Modal.tsx'),
        resolve(rootDir, 'src/NumberInput/NumberInput.tsx'),
        resolve(rootDir, 'src/RadioGroup/RadioGroup.tsx'),
        resolve(rootDir, 'src/Select/Select.tsx'),
        resolve(rootDir, 'src/Slider/Slider.tsx'),
        resolve(rootDir, 'src/TextInput/TextInput.tsx'),
        resolve(rootDir, 'src/Tab/Tab.tsx'),
        resolve(rootDir, 'src/DateInput/DateInput.tsx'),
        resolve(rootDir, 'src/utils/with-check-new-value-is-not-equal.ts'),
        resolve(rootDir, 'src/Form/FieldErrorMessage.tsx'),
        resolve(rootDir, 'src/Snackbar/Snackbar.tsx'),
        resolve(rootDir, 'src/Snackbar/SnackbarProvider.tsx'),
        resolve(rootDir, 'src/Snackbar/useSnackbar.ts'),
        resolve(rootDir, 'src/Skeleton/Skeleton.tsx'),
        resolve(rootDir, 'src/Form/useFieldContext.ts'),
        resolve(rootDir, 'src/Table/TablePagination.tsx'),
        resolve(rootDir, 'src/base/use-auto-complete.ts'),
        resolve(rootDir, 'src/base/no-ssr.ts'),
        resolve(rootDir, 'src/utils/create-component-with-omitted-props.tsx'),
        resolve(rootDir, 'src/utils/create-empty-component.tsx'),
        resolve(rootDir, 'src/Table/withHiddenInput.tsx'),
      ],
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
