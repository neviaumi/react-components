import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../Form/Label.tsx';
import { DateInput as DateInputComponent } from './DateInput.tsx';

const meta: Meta<typeof DateInputComponent> = {
  component: DateInputComponent,
  title: 'Component/Form/DateInput',
};

export default meta;

type Story = StoryObj<typeof DateInputComponent>;

export const DateInput: Story = {
  render: args => {
    return (
      <>
        <Label>Date Input</Label>
        <DateInputComponent {...args} />
      </>
    );
  },
};
