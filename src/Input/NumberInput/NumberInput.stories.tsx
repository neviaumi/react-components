import type { Meta, StoryObj } from '@storybook/react';

import { Field } from '../Field.jsx';
import Label from '../Label.jsx';
import NumberInputComponent from './NumberInput.jsx';

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
