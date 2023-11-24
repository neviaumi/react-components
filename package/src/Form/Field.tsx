import { FormControl, type FormControlProps } from '@mui/base/FormControl';
import clsx from 'clsx';
import {
  createContext,
  forwardRef,
  type PropsWithChildren,
  type Ref,
  useId,
} from 'react';

import type { SlotComponentPropsWithoutOverride } from '../components.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';

export const FieldContext = createContext<{ id: string; name: string }>({
  id: '',
  name: '',
});

interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'fieldset'>;
}

export const Field = forwardRef(function Field(
  {
    children,
    disableDefaultClasses,
    name,
    slotProps: givenSlotProps,
    ...rest
  }: PropsWithChildren<
    FormControlProps & {
      disableDefaultClasses?: boolean;
      name: string;
      slotProps?: SlotProps;
    }
  >,
  ref: Ref<HTMLInputElement>,
) {
  const id = useId();
  const { value: fieldValue, ...formControlProps } = rest;
  const formControlDefaultValue = fieldValue ?? null;
  const slotProps = disableDefaultClasses
    ? givenSlotProps
    : (assocDefaultStyle<SlotProps>({
        slotWithDefaultClasses: {
          root: clsx('tw-group'),
        },
      })(givenSlotProps) as any);
  return (
    <FieldContext.Provider value={{ id: id, name }}>
      <FormControl
        {...formControlProps}
        ref={ref}
        slotProps={slotProps}
        slots={{ root: 'fieldset' }}
        value={formControlDefaultValue}
      >
        {children}
      </FormControl>
    </FieldContext.Provider>
  );
});
