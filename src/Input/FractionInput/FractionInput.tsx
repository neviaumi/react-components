import type { ChangeEventHandler } from 'react';

import {
  Fraction,
  parseFraction,
} from '../../NumberFormat/FractionNumberDisplay/parse-fraction.js';
import ReactWiredInput, {
  InputProps,
} from '../../wired-elements/WiredInput.js';
import { useFieldContext } from '../Field.js';

export type FractionInputProps = Omit<InputProps, 'type' | 'onChange'> & {
  onChange: (
    e: CustomEvent<{
      value: Fraction;
    }>,
  ) => void;
};

export default function FractionInput(props: FractionInputProps) {
  const { id } = useFieldContext();
  const { onChange, ...rest } = props;
  const onChangeWithValidation: ChangeEventHandler<
    HTMLInputElement
  > = event => {
    const value = event.target?.value;
    const { denominator, numerator } = parseFraction(value);

    onChange?.(
      new CustomEvent('change', {
        detail: {
          value: {
            denominator: denominator,
            numerator: numerator,
            raw: value,
          },
        },
      }),
    );
  };
  return (
    <ReactWiredInput
      id={id}
      placeholder={'Use / as separator for denominator and numerator'}
      title={
        'Use / as separator for denominator and numerator like 4/4, 2/2 ...etc.'
      }
      {...rest}
      aria-label={rest.name}
      onChange={onChangeWithValidation}
      pattern={'\\d+\\/\\d+'}
      role={'input'}
      type={'text'}
    />
  );
}
