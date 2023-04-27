import SliderUnstyled, {
  SliderUnstyledOwnerState,
  SliderUnstyledOwnProps,
} from '@mui/base/SliderUnstyled';
import clsx from 'clsx';
import React, { forwardRef } from 'react';

import {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../../components';
import { assocDefaultStyle } from '../../utils/assign-default-style';
import { useFieldContext } from '../Field.js';

interface SlotProps {
  input?: SlotComponentPropsWithoutOverride<'input', SliderUnstyledOwnerState>;
  mark?: SlotComponentPropsWithoutOverride<'span', SliderUnstyledOwnerState>;
  markLabel?: SlotComponentPropsWithoutOverride<
    'span',
    SliderUnstyledOwnerState
  >;
  rail?: SlotComponentPropsWithoutOverride<'span', SliderUnstyledOwnerState>;
  root?: SlotComponentPropsWithoutOverride<'span', SliderUnstyledOwnerState>;
  thumb?: SlotComponentPropsWithoutOverride<'span', SliderUnstyledOwnerState>;
  track?: SlotComponentPropsWithoutOverride<'span', SliderUnstyledOwnerState>;
  valueLabel?: SlotComponentPropsWithoutOverride<
    React.ElementType,
    SliderUnstyledOwnerState
  >;
}

export type SliderProps = ComponentProps<SlotProps, SliderUnstyledOwnProps>;

export default forwardRef<HTMLSpanElement>(function Slider(
  { disableDefaultClasses, slotProps: givenSlotProps, ...rest }: SliderProps,
  ref,
) {
  const { formControlContext, id } = useFieldContext();
  if (formControlContext === undefined) {
    return null;
  }
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        rail: clsx(
          'tw-block tw-h-1 tw-w-full tw-rounded-sm tw-bg-secondary-bg hover:tw-bg-secondary-bg-hover',
        ),
        root: clsx(
          'tw-relative tw-flex tw-h-full tw-w-full tw-cursor-pointer tw-items-center',
        ),
        thumb: clsx(
          'tw-absolute tw--ml-1.5 tw--mt-[0.15rem] tw-h-2 tw-w-2 tw-rounded-[50%] tw-border-2 tw-border-primary-border tw-bg-primary-bg hover:tw-border-primary-border-hover hover:tw-bg-primary-bg-hover',
        ),
        track: clsx(
          'tw-absolute tw-block tw-h-1 tw-w-full tw-rounded-sm tw-bg-secondary-bg hover:tw-bg-secondary-bg-hover',
        ),
      },
    })(givenSlotProps);
  }
  return (
    <SliderUnstyled
      id={id}
      onBlur={formControlContext.onBlur}
      onChange={e => {
        console.log('Hello ! Called?');
        formControlContext.onChange?.(
          e as unknown as React.ChangeEvent<HTMLInputElement>,
        );
      }}
      ref={ref}
      slotProps={slotProps}
      value={formControlContext.value as number}
      {...rest}
    />
  );
});
