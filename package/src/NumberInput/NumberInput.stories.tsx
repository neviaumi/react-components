import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../Form/Label.tsx';
import { NumberInput as NumberInputComponent } from './NumberInput.tsx';

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
