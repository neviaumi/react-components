import busyboxEslintConfig, { globals } from '@busybox/eslint-config';
import eslintPluginN from '@busybox/eslint-config/plugins/eslint-plugin-n';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  ...busyboxEslintConfig,
  {
    plugins: {
      n: eslintPluginN,
    },
    rules: {
      'n/no-extraneous-import': [
        'error',
        {
          allowModules: ['@busybox/react-components'],
        },
      ],
    },
  },
];
