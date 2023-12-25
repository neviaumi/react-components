import './preview.css';

// Known issue here: https://github.com/storybookjs/storybook-addon-console/issues/80
// import { withConsole } from '@storybook/addon-console';
import { type Preview } from '@storybook/react';

const preview: Preview = {
  // decorators: [(storyFn, context) => withConsole()(storyFn)(context)],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered',
    source: {
      language: 'tsx',
    },
  },
};

export default preview;
