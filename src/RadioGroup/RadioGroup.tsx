import clsx from 'clsx';
import React, { createContext, useContext } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.d.ts';
import { useFieldContext } from '../Form/Field.tsx';
import { Label } from '../Form/Label.tsx';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

export type RadioGroupProps = React.PropsWithChildren<{
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}>;

const RadioGroupContext = createContext<{
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}>({});

export default function RadioGroup({
  children,
  name,
  onChange,
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ name, onChange }}>
      {children}
    </RadioGroupContext.Provider>
  );
}

interface RadioSlotProps {
  label?: SlotComponentPropsWithoutOverride<'label'>;
  root?: SlotComponentPropsWithoutOverride<'input'>;
}

export type RadioProps = ComponentProps<
  RadioSlotProps,
  {
    id: string;
    value: string;
  }
>;
export function Radio({
  children,
  'data-testid': testId,
  disableDefaultClasses,
  id,
  slotProps: givenSlotProps,
  value,
  ...rest
}: RadioProps) {
  const radioGroupContext = useContext(RadioGroupContext);
  const fieldContext = useFieldContext({
    onChange: radioGroupContext.onChange,
  });
  const formControlContext = fieldContext.formControlContext;
  if (!radioGroupContext || !formControlContext) {
    return null;
  }
  const { onBlur, onChange, onFocus, value: currentValue } = formControlContext;
  const isChecked = currentValue === value;
  let slotProps = givenSlotProps;
  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<RadioSlotProps>({
      slotWithDefaultClasses: {
        label: isChecked
          ? clsx(
              'tw-flex tw-cursor-pointer tw-bg-primary tw-font-bold hover:tw-bg-primary-hover',
            )
          : clsx('tw-flex tw-cursor-pointer hover:tw-bg-primary-hover'),
        root: clsx(
          'tw-form-radio tw-h-0 tw-w-0 tw-border-0 focus:tw-shadow-none focus:tw-ring-0',
        ),
      },
    })(givenSlotProps);
  }
  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);
  const { name } = radioGroupContext;
  return (
    <Label
      htmlFor={id}
      {...slotProps?.label}
      data-testid={testId ?? 'busybox-radio'}
    >
      <input
        {...rootProps}
        checked={currentValue === value}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        type="radio"
        value={value}
      />
      {children}
    </Label>
  );
}
