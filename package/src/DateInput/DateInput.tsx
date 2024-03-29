import { Input, type InputOwnerState, type InputProps } from '@mui/base/Input';
import clsx from 'clsx';
import { assocPath, pipe } from 'ramda';
import { forwardRef } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { useFieldContext } from '../Form/useFieldContext.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

interface SlotProps {
  input?: SlotComponentPropsWithoutOverride<'input', InputOwnerState>;
  root?: SlotComponentPropsWithoutOverride<'div', InputOwnerState>;
}

export type DateInputProps = ComponentProps<SlotProps, InputProps>;

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  function DateInput(
    { disableDefaultClasses, slotProps: givenSlotProps, ...rest },
    ref,
  ) {
    const { id, name } = useFieldContext();
    const slotProps = pipe(assocPath(['input', 'ref'], ref))(
      disableDefaultClasses
        ? givenSlotProps
        : assocDefaultStyle<SlotProps>({
            slotWithDefaultClasses: {
              input: clsx(
                'tw-form-input tw-w-full tw-border-primary focus:tw-border-primary-user-action focus:tw-text-primary focus:tw-ring-primary',
              ),
            },
          })(givenSlotProps),
    ) as SlotProps;
    const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);
    return (
      <Input
        id={id}
        slotProps={slotProps}
        {...rootProps}
        name={name || rootProps.name}
        type={'date'}
      />
    );
  },
);
