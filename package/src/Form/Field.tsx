import { FormControl, type FormControlProps } from '@mui/base/FormControl';
import {
  createContext,
  forwardRef,
  type PropsWithChildren,
  type Ref,
  useId,
} from 'react';

export const FieldContext = createContext<{ id?: string }>({});

const Field = forwardRef(function Field(
  { children, ...rest }: PropsWithChildren<FormControlProps>,
  ref: Ref<HTMLDivElement>,
) {
  const id = useId();
  const { value: defaultValue, ...formControlProps } = rest;
  const formControlDefaultValue = defaultValue ?? null;
  return (
    <FieldContext.Provider value={{ id: id }}>
      <FormControl
        {...formControlProps}
        ref={ref}
        value={formControlDefaultValue}
      >
        {children}
      </FormControl>
    </FieldContext.Provider>
  );
});

export default Field;
