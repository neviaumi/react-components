import type { Meta, StoryObj } from '@storybook/react';

import * as icons from '../icons/solid.tsx';
import IconButtonComponent from './IconButton.tsx';

const meta: Meta<typeof IconButtonComponent> = {
  component: IconButtonComponent,
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Component/Button/Icon Button',
};

export default meta;
type Story = StoryObj<typeof IconButtonComponent>;

// 👇 We create a “template” of how args map to rendering
export const IconButton: Story = {
  render: ({ ...rest }) => {
    return (
      <>
        {Object.entries(icons).map(([name, Icon]) => {
          return (
            <IconButtonComponent key={name} {...rest}>
              <Icon />
            </IconButtonComponent>
          );
        })}
      </>
    );
  },
};
