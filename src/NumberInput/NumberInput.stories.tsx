import type { Meta, StoryObj } from '@storybook/react';

import Label from '../Form/Label.jsx';
import NumberInputComponent from './NumberInput.jsx';

const meta: Meta<typeof NumberInputComponent> = {
  component: NumberInputComponent,
  title: 'Component/Form/NumberInput',
};

export default meta;

type Story = StoryObj<typeof NumberInputComponent>;

export const NumberInput: Story = {
  render: args => {
    return (
      <>
        <Label>Number Input</Label>
        <NumberInputComponent {...args} />
      </>
    );
  },
};
