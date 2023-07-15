import MuiSlider, {
  type SliderOwnerState,
  type SliderOwnProps,
} from '@mui/base/Slider';
import clsx from 'clsx';
import React from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.d.ts';
import useFieldContext from '../Form/useFieldContext.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';

interface SlotProps {
  input?: SlotComponentPropsWithoutOverride<'input', SliderOwnerState>;
  mark?: SlotComponentPropsWithoutOverride<'span', SliderOwnerState>;
  markLabel?: SlotComponentPropsWithoutOverride<'span', SliderOwnerState>;
  rail?: SlotComponentPropsWithoutOverride<'span', SliderOwnerState>;
  root?: SlotComponentPropsWithoutOverride<'span', SliderOwnerState>;
  thumb?: SlotComponentPropsWithoutOverride<'span', SliderOwnerState>;
  track?: SlotComponentPropsWithoutOverride<'span', SliderOwnerState>;
  valueLabel?: SlotComponentPropsWithoutOverride<
    React.ElementType,
    SliderOwnerState
  >;
}

export type SliderProps = ComponentProps<SlotProps, SliderOwnProps>;

export default function Slider({
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: SliderProps) {
  const { formControlContext, id } = useFieldContext({
    // @ts-expect-error TODO: fix this
    onChange: rest.onChange,
    value: rest.value,
  });

  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        rail: clsx(
          'tw-block tw-h-1 tw-w-full tw-rounded-sm tw-bg-secondary hover:tw-bg-secondary-hover',
        ),
        root: clsx(
          'tw-relative tw-flex tw-h-full tw-w-full tw-cursor-pointer tw-items-center',
        ),
        thumb: clsx(
          'tw-absolute tw--ml-1.5 tw--mt-[0.15rem] tw-h-2 tw-w-2 tw-rounded-[50%] tw-border-2 tw-border-primary tw-bg-primary hover:tw-border-primary-hover hover:tw-bg-primary-hover',
        ),
        track: clsx(
          'tw-absolute tw-block tw-h-1 tw-w-full tw-rounded-sm tw-bg-secondary hover:tw-bg-secondary-hover',
        ),
      },
    })(givenSlotProps);
  }
  return (
    <MuiSlider
      id={id}
      onBlur={formControlContext?.onBlur}
      onChange={e => {
        formControlContext?.onChange?.(
          e as unknown as React.ChangeEvent<HTMLInputElement>,
        );
      }}
      slotProps={slotProps}
      value={formControlContext?.value as number}
      {...rest}
    />
  );
}
