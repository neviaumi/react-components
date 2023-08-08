import type { Meta, StoryObj } from '@storybook/react';

import Label from '../Form/Label.tsx';
import SliderComponent from './Slider.tsx';

const meta: Meta<typeof SliderComponent> = {
  component: SliderComponent,
  title: 'Component/Form/Slider',
};

export default meta;

type Story = StoryObj<typeof SliderComponent>;

export const Slider: Story = {
  render: () => {
    return (
      <div className={'tw-w-[300px]'}>
        <Label>Slider</Label>
        <SliderComponent />
      </div>
    );
  },
};
