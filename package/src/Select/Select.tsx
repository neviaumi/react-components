import {
  Option as MuiOption,
  type OptionOwnerState,
  type OptionOwnProps,
} from '@mui/base/Option';
import {
  Select as MuiSelect,
  type SelectOwnerState,
  type SelectOwnProps,
} from '@mui/base/Select';
import clsx from 'clsx';
import React, { useCallback, useMemo } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import useFieldContext from '../Form/useFieldContext.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

interface SlotProps {
  listbox?: SlotComponentPropsWithoutOverride<
    'ul',
    SelectOwnerState<string, false>
  >;
  popper?: SlotComponentPropsWithoutOverride<
    'div',
    SelectOwnerState<string, false>
  >;
  root?: SlotComponentPropsWithoutOverride<
    'button',
    SelectOwnerState<string, false>
  >;
}

export type SelectProps = ComponentProps<
  SlotProps,
  SelectOwnProps<string, false>
>;

export function Select({
  disableDefaultClasses,
  slotProps,
  ...rest
}: SelectProps) {
  const { formControlContext, id } = useFieldContext({
    // @ts-expect-error TODO: fix this
    onChange: rest.onChange,
    value: rest.value,
  });
  const slotPropsWithDefaultStyle = useMemo<SlotProps | undefined>(
    () =>
      disableDefaultClasses
        ? slotProps
        : assocDefaultStyle<SlotProps>({
            slotWithDefaultClasses: {
              listbox: clsx(
                'tw-m-0 tw-mt-1 tw-flex tw-flex-col tw-border-2 tw-border-primary tw-pt-0.5',
              ),
              popper: clsx('tw-z-10'),
              root: (state: SelectOwnerState<string, false>) => {
                if (state.open)
                  return clsx(
                    "tw-cursor-default tw-border-0 tw-bg-disabled tw-px-2 tw-py-1 tw-text-disabled after:tw-float-right after:tw-content-['▴']",
                  );
                return clsx(
                  "tw-border tw-border-primary tw-bg-white tw-px-2 tw-py-1 tw-text-primary after:tw-float-right after:tw-content-['▾']",
                );
              },
            },
          })(slotProps),
    [disableDefaultClasses, slotProps],
  );
  const rootProps = mergeRootSlotPropsToComponentProps()(
    slotPropsWithDefaultStyle,
    rest,
  );
  const connectMuiSelectToFormContext = useCallback(
    (_: unknown, value: string | null) => {
      if (!formControlContext?.onChange) return;
      formControlContext.onChange({
        target: { value },
      } as any);
    },
    [formControlContext],
  );
  return (
    <MuiSelect
      id={id}
      onChange={connectMuiSelectToFormContext}
      slotProps={slotPropsWithDefaultStyle}
      {...rootProps}
    />
  );
}
interface SelectOptionSlotProps {
  root?: SlotComponentPropsWithoutOverride<'li', OptionOwnerState<string>>;
}

export type SelectOptionProps = ComponentProps<
  SelectOptionSlotProps,
  OptionOwnProps<string>
>;
export function SelectOption({
  disableDefaultClasses,
  slotProps,
  value,
  ...rest
}: SelectOptionProps) {
  const slotPropsWithDefaultStyle = useMemo<SelectOptionSlotProps | undefined>(
    () =>
      disableDefaultClasses
        ? slotProps
        : assocDefaultStyle<SelectOptionSlotProps>({
            slotWithDefaultClasses: {
              root: (state: OptionOwnerState<string>) => {
                if (state.disabled)
                  return clsx(
                    'tw-cursor-default tw-bg-disabled tw-text-center tw-text-disabled',
                  );
                if (state.selected)
                  return clsx(
                    'tw-cursor-default tw-bg-primary tw-text-center tw-font-bold tw-text-primary',
                  );
                return clsx(
                  'tw-cursor-default tw-bg-white tw-px-1 tw-text-center tw-text-primary hover:tw-cursor-pointer hover:tw-bg-primary hover:tw-text-primary',
                );
              },
            },
          })(slotProps),
    [disableDefaultClasses, slotProps],
  );
  const rootProps = mergeRootSlotPropsToComponentProps()(
    slotPropsWithDefaultStyle,
    rest,
  );

  return (
    <MuiOption
      {...rootProps}
      data-value={value}
      slotProps={slotPropsWithDefaultStyle}
      value={value}
    />
  );
}
