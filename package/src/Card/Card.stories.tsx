import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';

import { Card as CardComponent, CardTitle } from './Card.tsx';

const meta: Meta<typeof CardComponent> = {
  component: CardComponent,
  title: 'Component/Card',
};

export default meta;
type Story = StoryObj<typeof CardComponent>;
export const Card: Story = {
  render: () => (
    <CardComponent
      slotProps={{
        root: {
          className: clsx('tw-w-20', 'tw-border-primary', 'tw-border'),
        },
      }}
    >
      <CardTitle slot={{ root: 'h1' }}>Card Header</CardTitle>
      <section>Card Body</section>
    </CardComponent>
  ),
};
