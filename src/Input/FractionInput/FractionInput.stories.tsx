import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { FormEvent, useId, useState } from 'react';

import Button from '../../Button/Button.js';
import FractionNumberDisplayComponent from '../../NumberFormat/FractionNumberDisplay/FractionNumberDisplay.js';
import { generateTestIdWithPrefix } from '../../test-helpers/test-id.js';
import { palette } from '../../theme.js';
import { Field } from '../Field.js';
import Label from '../Label.js';
import FractionInputComponent from './FractionInput.js';

const meta: Meta<typeof FractionInputComponent> = {
  argTypes: {
    onChange: { action: 'value change' },
    onSubmit: { action: 'value submit' },
  },
  component: FractionInputComponent,
  title: 'Component/Input/FractionNumber',
};

export default meta;

type Story = StoryObj<typeof FractionInputComponent>;

export const FractionInput: Story = {
  args: {
    'data-testid': 'test-fraction-input',
  },
  render: ({ 'data-testid': testId, onChange, onSubmit, ...rest }) => {
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
  },
};

export const FractionInputWithDisplay: Story = {
  args: {
    'data-testid': 'test-fraction',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('test-fraction-display'));
    await canvas.findByTestId('test-fraction-input');
  },
  render: ({ 'data-testid': testId }) => {
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
  },
};
