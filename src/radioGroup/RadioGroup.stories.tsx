import type { Meta, StoryObj } from '@storybook/react';

import { Field } from '../Form/Field.jsx';
import LabelWithFieldContext, { Label } from '../Form/Label.jsx';
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
      <Field>
        <LabelWithFieldContext>RadioGroup Input</LabelWithFieldContext>
        <RadioGroupComponent {...args} name={'demo'}>
          <Label htmlFor={'1'}>
            1
            <Radio id={'1'} value={'1'} />
          </Label>

          <Label htmlFor={'2'}>2</Label>
          <Radio id={'2'} value={'2'}>
            1
          </Radio>
          <Label htmlFor={'3'}>3</Label>
          <Radio id={'3'} value={'3'}>
            1
          </Radio>
        </RadioGroupComponent>
      </Field>
    );
  },
};
