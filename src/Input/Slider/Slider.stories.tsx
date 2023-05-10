import type { Meta, StoryObj } from '@storybook/react';

import { Field } from '../Field.jsx';
import Label from '../Label.jsx';
import SliderComponent from './Slider.jsx';

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
