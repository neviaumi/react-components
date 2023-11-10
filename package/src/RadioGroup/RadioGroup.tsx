import clsx from 'clsx';
import React, { createContext, useContext } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { useFieldContext } from '../Form/useFieldContext.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

export type RadioGroupProps = React.PropsWithChildren<{
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}>;

const RadioGroupContext = createContext<{
  name?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
}>({});

export function RadioGroup({
  children,
  name,
  onChange,
  value,
}: RadioGroupProps) {
  const fieldContext = useFieldContext({
    onChange: onChange,
    value: value,
  });
  const { formControlContext } = fieldContext;
  const { onBlur, onFocus, value: currentValue } = formControlContext!;
  return (
    <RadioGroupContext.Provider
      value={{
        name: fieldContext?.name || name,
        onBlur,
        onChange: formControlContext?.onChange,
        onFocus,
        value: currentValue as string,
      }}
    >
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
  const testIdPrefix = testId ?? 'busybox-radio';
  const radioGroupContext = useContext(RadioGroupContext);
  if (!radioGroupContext) {
    return null;
  }
  const {
    name,
    onBlur,
    onChange,
    onFocus,
    value: currentValue,
  } = radioGroupContext;
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
  return (
    <label htmlFor={id} {...slotProps?.label} data-testid={testIdPrefix}>
      <input
        {...rootProps}
        checked={currentValue === value}
        data-testid={`${testIdPrefix}-input`}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        type="radio"
        value={value}
      />
      {children}
    </label>
  );
}
