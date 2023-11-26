import clsx from 'clsx';
import React, { createContext, forwardRef, useContext } from 'react';

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

export const RadioGroup = function RadioGroup({
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
};

interface RadioSlotProps {
  input?: SlotComponentPropsWithoutOverride<'input'>;
  label?: SlotComponentPropsWithoutOverride<'label'>;
  root?: SlotComponentPropsWithoutOverride<'div'>;
}

export type RadioProps = ComponentProps<
  RadioSlotProps,
  {
    id: string;
    value: string;
  }
>;
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    children,
    'data-testid': testId,
    disableDefaultClasses,
    id,
    slotProps: givenSlotProps,
    value,
    ...rest
  }: RadioProps,
  ref,
) {
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
        input: clsx(
          'tw-form-radio tw-h-px tw-w-px tw-border-0 focus:tw-shadow-none focus:tw-ring-0',
        ),
        label: isChecked
          ? clsx(
              'tw-cursor-pointer tw-bg-primary tw-font-bold hover:tw-bg-primary-user-action',
            )
          : clsx('tw-cursor-pointer hover:tw-bg-primary-user-action'),
        root: clsx('tw-grid tw-grid-cols-[0px_1fr]'),
      },
    })(givenSlotProps);
  }
  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);
  return (
    <div {...rootProps}>
      <input
        {...slotProps?.input}
        checked={currentValue === value}
        data-testid={`${testIdPrefix}-input`}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        ref={ref}
        type="radio"
        value={value}
      />
      <label htmlFor={id} {...slotProps?.label} data-testid={testIdPrefix}>
        {' '}
        {children}
      </label>
    </div>
  );
});
