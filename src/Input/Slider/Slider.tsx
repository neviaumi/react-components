import SliderUnstyled, {
  SliderUnstyledOwnerState,
  SliderUnstyledOwnProps,
} from '@mui/base/SliderUnstyled';
import * as React from 'react';

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

export default function Slider({
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: SliderProps) {
  const { formControlContext, id } = useFieldContext();
  if (formControlContext === undefined) {
    return null;
  }
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        rail: 'tw-block tw-h-1 tw-w-full tw-absolute tw-rounded-sm tw-bg-current',
        root: 'tw-inline-block tw-h-1.5 tw-w-full tw-cursor-pointer tw-relative',
        thumb:
          'tw-w-2 tw-h-2 tw-absolute tw-bg-primary tw-bg-rose-300 tw--mt-[4px] tw--ml-[8px] tw-rounded-[50%] tw-border-2 tw-border-current',
        track:
          'tw-block tw-h-1 tw-w-full tw-absolute tw-bg-primary tw-rounded-sm tw-bg-current',
      },
    })(givenSlotProps);
  }
  return <SliderUnstyled id={id} slotProps={slotProps} {...rest} />;
}
