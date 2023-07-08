import type { Meta, StoryObj } from '@storybook/react';

import LabelWithFieldContext from '../Form/Label.jsx';
import RadioGroupComponent, { Radio } from './RadioGroup.jsx';

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
        <LabelWithFieldContext>RadioGroup Input</LabelWithFieldContext>
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
