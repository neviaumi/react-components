import InputUnstyled, {
  InputUnstyledOwnerState,
  InputUnstyledProps,
} from '@mui/base/InputUnstyled';

import {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../../components';
import { assocDefaultStyle } from '../../utils/assign-default-style';
import { useFieldContext } from '../Field.js';

interface SlotProps {
  input?: SlotComponentPropsWithoutOverride<'input', InputUnstyledOwnerState>;
  root?: SlotComponentPropsWithoutOverride<'div', InputUnstyledOwnerState>;
}

export type NumberInputProps = ComponentProps<SlotProps, InputUnstyledProps>;

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
    <InputUnstyled id={id} slotProps={slotProps} {...rest} type={'number'} />
  );
}
