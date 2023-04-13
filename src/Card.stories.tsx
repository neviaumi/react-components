import type { Meta, StoryObj } from '@storybook/react';

import CardComponent from './Card.js';
import ReactWiredDivider from './wired-elements/WiredDivider.js';

const meta: Meta<typeof CardComponent> = {
  component: CardComponent,
  title: 'Component/Card',
};

export default meta;
type Story = StoryObj<typeof CardComponent>;
export const CardWithHeader: Story = {
  render: () => (
    <CardComponent className={'tw-w-20'} fill={'#F00'}>
      <h1>
        Card Header
        <ReactWiredDivider />
      </h1>
      <section>Card Body</section>
    </CardComponent>
  ),
};
