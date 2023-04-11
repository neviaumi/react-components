import type { Meta, StoryObj } from '@storybook/react';

import { Field } from '../Field.js';
import Label from '../Label.js';
import NumberInputComponent from './NumberInput.js';

export default {
  component: NumberInputComponent,
  subcomponents: { Field, Label },
  title: 'Component/Input/NumberInput',
} as Meta<typeof NumberInputComponent>;

export const NumberInput: StoryObj<typeof NumberInputComponent> = {
  args: {
    value: 10,
  },
  render: args => {
    return (
      <Field>
        <Label>Number Input</Label>
        <NumberInputComponent {...args} />
      </Field>
    );
  },
};
