import Input, { InputOwnerState, InputProps } from '@mui/base/Input/index.js';
import clsx from 'clsx';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.d.ts';
import { useFieldContext } from '../Form/Field.tsx';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

interface SlotProps {
  input?: SlotComponentPropsWithoutOverride<'input', InputOwnerState>;
  root?: SlotComponentPropsWithoutOverride<'div', InputOwnerState>;
}

export type TextInputProps = ComponentProps<SlotProps, InputProps>;

export default function TextInput({
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: TextInputProps) {
  const { id } = useFieldContext();
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        input: clsx(
          'tw-form-input tw-w-full tw-border-primary focus:tw-border-none focus:tw-shadow-none focus:tw-ring-0',
        ),
      },
    })(givenSlotProps);
  }
  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);
  return <Input id={id} slotProps={slotProps} {...rootProps} type={'text'} />;
}
