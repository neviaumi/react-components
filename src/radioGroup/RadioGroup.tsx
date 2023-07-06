import { InputOwnerState } from '@mui/base/Input/index.js';
import React, { createContext, useContext } from 'react';

import {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.d.js';
import { useFieldContext } from '../Form/Field.jsx';

export type RadioGroupProps = React.PropsWithChildren<{
  name: string;
}>;

const RadioGroupContext = createContext<{ name?: string }>({});

export default function RadioGroup({ children, name }: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name }}>
      {children}
    </RadioGroupContext.Provider>
  );
}

interface RadioSlotProps {
  root?: SlotComponentPropsWithoutOverride<'input', InputOwnerState>;
}

export type RadioProps = ComponentProps<
  RadioSlotProps,
  {
    id: string;
    value: string;
  }
>;
export function Radio(props: RadioProps) {
  const fieldContext = useFieldContext();
  const radioGroupContext = useContext(RadioGroupContext);
  const formControlContext = fieldContext.formControlContext;
  if (!radioGroupContext || !formControlContext) {
    return null;
  }
  const { name } = radioGroupContext;
  const { onBlur, onChange, onFocus, value: currentValue } = formControlContext;
  return (
    <input
      {...props.slotProps?.root}
      checked={currentValue === props.value}
      id={props.id}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      type="radio"
      value={props.value}
    />
  );
}
