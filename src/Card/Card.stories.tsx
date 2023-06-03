import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';

import CardComponent, { CardTitle } from './Card.jsx';

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
      <CardTitle slot={{ root: 'h1' }}>Card Header</CardTitle>
      <section>Card Body</section>
    </CardComponent>
  ),
};
