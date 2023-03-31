import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { FormEvent, useId, useState } from 'react';

import Button from '../../Button/Button.js';
import FractionNumberDisplayComponent from '../../NumberFormat/FractionNumberDisplay/FractionNumberDisplay.js';
import { generateTestIdWithPrefix } from '../../test-helpers/test-id.js';
import { palette } from '../../theme.js';
import { Field } from '../Field.js';
import Label from '../Label.js';
import FractionInputComponent from './FractionInput.js';

export default {
  argTypes: {
    onChange: { action: 'value change' },
    onSubmit: { action: 'value submit' },
  },
  component: FractionInputComponent,
  subcomponents: {
    Field,
    FractionNumberDisplay: FractionNumberDisplayComponent,
    Label,
  },
  title: 'Component/Input/FractionNumber',
} as ComponentMeta<typeof FractionInputComponent>;

const FractionInputTemplate: ComponentStory<typeof FractionInputComponent> = ({
  'data-testid': testId,
  onChange,
  onSubmit,
  ...rest
}) => {
  const [isInValid, setIsInValid] = useState(false);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit?.(e as unknown as FormEvent<HTMLInputElement>);
      }}
    >
      <Field>
        <Label>Fraction Input</Label>
        <FractionInputComponent
          {...rest}
          className={isInValid ? palette.error.text : ''}
          data-testid={testId}
          onChange={event => {
            const { denominator, numerator } = event.detail.value;
            setIsInValid(denominator === null && numerator === null);
            onChange(event);
          }}
        />
      </Field>
      <Button
        data-testid={generateTestIdWithPrefix({
          id: 'submit-button',
          prefix: testId,
        })}
        type={'submit'}
      >
        Submit
      </Button>
    </form>
  );
};

export const FractionInput = FractionInputTemplate.bind({});
FractionInput.args = {
  'data-testid': 'test-fraction-input',
};

export const FractionInputWithDisplay: ComponentStory<
  typeof FractionInputComponent
> = ({ 'data-testid': testId }) => {
  const id = useId();
  const [isEditing, setIsEditing] = useState(false);
  const [fractionString, setFractionString] = useState<string | null>(null);
  return (
    <div className={'tw-flex tw-flex-col tw-justify-center'}>
      <Label htmlFor={id}>FractionInput</Label>
      {isEditing ? (
        <FractionInputComponent
          data-testid={generateTestIdWithPrefix({
            id: 'input',
            prefix: testId,
          })}
          id={id}
          onBlur={() => setIsEditing(false)}
          onChange={e => setFractionString(e.detail.value.raw)}
        />
      ) : (
        <FractionNumberDisplayComponent
          data-testid={generateTestIdWithPrefix({
            id: 'display',
            prefix: testId,
          })}
          id={id}
          onClick={() => setIsEditing(true)}
          value={fractionString}
        />
      )}
    </div>
  );
};

FractionInputWithDisplay.args = {
  'data-testid': 'test-fraction',
};

FractionInputWithDisplay.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByTestId('test-fraction-display'));
  await canvas.findByTestId('test-fraction-input');
};
