import type { Meta, StoryObj } from '@storybook/react';

import Label from '../Form/Label.tsx';
import TextInputComponent from './TextInput.tsx';

const meta: Meta<typeof TextInputComponent> = {
  component: TextInputComponent,
  title: 'Component/Form/TextInput',
};

export default meta;

type Story = StoryObj<typeof TextInputComponent>;

export const TextInput: Story = {
  render: args => {
    return (
      <>
        <Label>Text Input</Label>
        <TextInputComponent {...args} />
      </>
    );
  },
};
