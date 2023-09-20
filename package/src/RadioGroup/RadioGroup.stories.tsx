import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../Form/Label.tsx';
import { Radio, RadioGroup as RadioGroupComponent } from './RadioGroup.tsx';

const meta: Meta<typeof RadioGroupComponent> = {
  component: RadioGroupComponent,
  title: 'Component/Form/RadioGroup',
};

export default meta;

type Story = StoryObj<typeof RadioGroupComponent>;

export const RadioGroup: Story = {
  render: args => {
    return (
      <>
        <Label>RadioGroup Input</Label>
        <RadioGroupComponent
          {...args}
          name={'demo'}
          onChange={() => {
            return;
          }}
        >
          <Radio id={'1'} value={'1'}>
            Item 1
          </Radio>
          <Radio id={'2'} value={'2'}>
            Item 2
          </Radio>
          <Radio id={'3'} value={'3'}>
            Item 3
          </Radio>
        </RadioGroupComponent>
      </>
    );
  },
};
