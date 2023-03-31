import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Field } from '../Field.js';
import Label from '../Label.js';
import NumberInputComponent from './NumberInput.js';

export default {
  component: NumberInputComponent,
  subcomponents: { Field, Label },
  title: 'Component/Input/NumberInput',
} as ComponentMeta<typeof NumberInputComponent>;

const NumberInputTemplate: ComponentStory<
  typeof NumberInputComponent
> = args => {
  return (
    <Field>
      <Label>Number Input</Label>
      <NumberInputComponent {...args} />
    </Field>
  );
};

export const NumberInput = NumberInputTemplate.bind({});
NumberInput.args = {
  value: 10,
};
