import type { Meta, StoryObj } from '@storybook/react';

import LinkComponent from './Link.js';

const meta: Meta<typeof LinkComponent> = {
  component: LinkComponent,
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Component/Link',
};

export default meta;
type Story = StoryObj<typeof LinkComponent>;

// 👇 We create a “template” of how args map to rendering
export const Link: Story = {
  render: () => {
    return (
      <>
        <LinkComponent href={'https://www.google.com'}>Google</LinkComponent>
      </>
    );
  },
};
