import Input, { InputOwnerState, InputProps } from '@mui/base/Input/index.js';

import {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../../components.d.js';
import { assocDefaultStyle } from '../../utils/assign-default-style.js';
import { useFieldContext } from '../Field.jsx';

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
  const { formControlContext, id } = useFieldContext();
  if (formControlContext === undefined) {
    return null;
  }
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
