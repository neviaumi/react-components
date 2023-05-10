import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';

import CardComponent, { CardHeader } from './Card.js';

const meta: Meta<typeof CardComponent> = {
  component: CardComponent,
  title: 'Component/Card',
};

export default meta;
type Story = StoryObj<typeof CardComponent>;
export const CardWithHeader: Story = {
  render: () => (
    <CardComponent
      slotProps={{
        root: {
          className: clsx('tw-w-20'),
        },
      }}
    >
      <CardHeader component={'h1'}>Card Header</CardHeader>
      <section>Card Body</section>
    </CardComponent>
  ),
};
