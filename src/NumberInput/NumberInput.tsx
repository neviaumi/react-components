import Input, { InputOwnerState, InputProps } from '@mui/base/Input/index.js';
import clsx from 'clsx';

import {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.d.js';
import { useFieldContext } from '../Form/Field.jsx';
import { assocDefaultStyle } from '../utils/assign-default-style.js';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.js';

interface SlotProps {
  input?: SlotComponentPropsWithoutOverride<'input', InputOwnerState>;
  root?: SlotComponentPropsWithoutOverride<'div', InputOwnerState>;
}

export type NumberInputProps = ComponentProps<SlotProps, InputProps>;

export default function NumberInput({
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: NumberInputProps) {
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
  return <Input id={id} slotProps={slotProps} {...rootProps} type={'number'} />;
}
