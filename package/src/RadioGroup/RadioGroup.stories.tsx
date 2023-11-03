import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Label } from '../Form/Label.tsx';
import { Radio, RadioGroup as RadioGroupComponent } from './RadioGroup.tsx';

const meta: Meta<typeof RadioGroupComponent> = {
  component: RadioGroupComponent,
  title: 'Component/Form/RadioGroup',
};

export default meta;

type Story = StoryObj<typeof RadioGroupComponent>;

export const RadioGroup: Story = {
  render: () => {
    const [radioValue, setRadioSelectedValue] = useState('');
    return (
      <>
        <Label>RadioGroup Input</Label>
        <RadioGroupComponent
          name={'demo'}
          onChange={e => {
            setRadioSelectedValue(e.target.value);
          }}
          value={radioValue}
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
