import {
  Slider as MuiSlider,
  type SliderOwnerState,
  type SliderOwnProps,
} from '@mui/base/Slider';
import clsx from 'clsx';
import { assocPath, identity, pipe } from 'ramda';
import React, { type ComponentPropsWithRef, forwardRef } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { useFieldContext } from '../Form/useFieldContext.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

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

const SliderInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithRef<'input'> & {
    ownerState: ComponentPropsWithRef<'input'>;
  }
>(function SliderInput(props, ref) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ownerState, value: _, ...inputProps } = props;
  return (
    <input
      {...inputProps}
      ref={ref}
      value={ownerState?.value === 0 ? undefined : ownerState?.value}
    />
  );
});

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { disableDefaultClasses, slotProps: givenSlotProps, ...rest },
  ref,
) {
  const { formControlContext, id, name } = useFieldContext({
    // @ts-expect-error TODO: fix this
    onChange: rest.onChange,
    value: rest.value,
  });

  const slotProps = pipe(
    id ? assocPath(['input', 'id'], id) : identity,
    ref ? assocPath(['input', 'ref'], ref) : identity,
    formControlContext?.required
      ? assocPath(['input', 'required'], true)
      : identity,
  )(
    disableDefaultClasses
      ? givenSlotProps
      : assocDefaultStyle<SlotProps>({
          slotWithDefaultClasses: {
            rail: clsx(
              'tw-block tw-h-1 tw-w-full tw-rounded-sm tw-bg-secondary hover:tw-bg-secondary-user-action',
            ),
            root: clsx(
              'tw-relative tw-flex tw-h-full tw-w-full tw-cursor-pointer tw-items-center',
            ),
            thumb: clsx(
              'tw-absolute tw--ml-1.5 tw--mt-[0.15rem] tw-h-2 tw-w-2 tw-rounded-[50%] tw-border-2 tw-border-primary tw-bg-primary hover:tw-border-primary-user-action hover:tw-bg-primary-user-action',
            ),
            track: clsx(
              'tw-absolute tw-block tw-h-1 tw-w-full tw-rounded-sm tw-bg-secondary hover:tw-bg-secondary-user-action',
            ),
          },
        })(givenSlotProps),
  ) as SlotProps;

  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);
  const sliderValue = Number(formControlContext?.value);

  return (
    <MuiSlider
      onBlur={formControlContext?.onBlur}
      onChange={e => {
        formControlContext?.onChange?.(
          e as unknown as React.ChangeEvent<HTMLInputElement>,
        );
      }}
      slotProps={slotProps}
      slots={{
        input: SliderInput,
      }}
      value={sliderValue}
      {...rootProps}
      name={name || rootProps.name}
    />
  );
});
