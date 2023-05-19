import Input, { InputOwnerState, InputProps } from '@mui/base/Input/index.js';

import {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.d.js';
import { useFieldContext } from '../Form/Field.jsx';
import { assocDefaultStyle } from '../utils/assign-default-style.js';

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
      slotWithDefaultClasses: {},
    })(givenSlotProps);
  }
  return (
    // @ts-expect-error TODO: fix this
    <Input id={id} slotProps={slotProps} {...rest} type={'number'} />
  );
}
