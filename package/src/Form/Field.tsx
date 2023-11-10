import { FormControl, type FormControlProps } from '@mui/base/FormControl';
import {
  createContext,
  forwardRef,
  type PropsWithChildren,
  type Ref,
  useId,
} from 'react';

export const FieldContext = createContext<{ id: string; name: string }>({
  id: '',
  name: '',
});

export const Field = forwardRef(function Field(
  {
    children,
    name,
    ...rest
  }: PropsWithChildren<FormControlProps & { name: string }>,
  ref: Ref<HTMLDivElement>,
) {
  const id = useId();
  const { value: defaultValue, ...formControlProps } = rest;
  const formControlDefaultValue = defaultValue ?? null;
  return (
    <FieldContext.Provider value={{ id: id, name }}>
      <FormControl
        {...formControlProps}
        ref={ref}
        slots={{ root: 'fieldset' }}
        value={formControlDefaultValue}
      >
        {children}
      </FormControl>
    </FieldContext.Provider>
  );
});
