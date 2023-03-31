import type { ComponentMeta, ComponentStory } from '@storybook/react';

import CardComponent from './Card.js';
import ReactWiredDivider from './wired-elements/WiredDivider.js';

export default {
  component: CardComponent,
  title: 'Component/Card',
} as ComponentMeta<typeof CardComponent>;

export const CardWithHeader: ComponentStory<typeof CardComponent> = () => (
  <CardComponent className={'tw-w-20'} fill={'#F00'}>
    <h1>
      Card Header
      <ReactWiredDivider />
    </h1>
    <section>Card Body</section>
  </CardComponent>
);
