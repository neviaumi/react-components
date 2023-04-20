import type { Meta, StoryObj } from '@storybook/react';

import { Field } from '../Field.js';
import Label from '../Label.js';
import SliderComponent from './Slider.js';

const meta: Meta<typeof SliderComponent> = {
  component: SliderComponent,
  title: 'Component/Input/Slider',
};

export default meta;

type Story = StoryObj<typeof SliderComponent>;

export const Slider: Story = {
  render: () => {
    return (
      <Field>
        <Label>Slider</Label>
        <SliderComponent />
      </Field>
    );
  },
};
