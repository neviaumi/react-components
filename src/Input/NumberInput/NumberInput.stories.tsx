import type { Meta, StoryObj } from '@storybook/react';

import { Field } from '../Field.js';
import Label from '../Label.js';
import NumberInputComponent from './NumberInput.js';

const meta: Meta<typeof NumberInputComponent> = {
  component: NumberInputComponent,
  title: 'Component/Input/NumberInput',
};

export default meta;

type Story = StoryObj<typeof NumberInputComponent>;

export const NumberInput: Story = {
  render: args => {
    return (
      <Field>
        <Label>Number Input</Label>
        <NumberInputComponent {...args} />
      </Field>
    );
  },
};
