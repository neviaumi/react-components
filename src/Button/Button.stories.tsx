import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import ButtonComponent from './Button.js';

export default {
  component: ButtonComponent,
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Component/Button',
} as Meta<typeof ButtonComponent>;

// 👇 We create a “template” of how args map to rendering
export const Primary: StoryObj<typeof ButtonComponent> = {
  args: {
    children: 'Primary button',
    /* 👇 The args you need here will depend on your component */
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', {
        name: 'Primary button',
      }),
    );
  },
  render: ({ children, ...rest }) => (
    <ButtonComponent {...rest}>{children}</ButtonComponent>
  ),
};
