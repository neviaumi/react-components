import FormControl, {
  FormControlProps,
  useFormControlContext,
} from '@mui/base/FormControl';
import { createContext, PropsWithChildren, useContext, useId } from 'react';

const FieldContext = createContext<{ id?: string }>({});

export function Field({
  children,
  ...rest
}: PropsWithChildren<FormControlProps>) {
  const id = useId();
  return (
    <FieldContext.Provider value={{ id: id }}>
      <FormControl {...rest}>{children}</FormControl>
    </FieldContext.Provider>
  );
}

export function useFieldContext() {
  const formControlContext = useFormControlContext();
  const fieldContext = useContext(FieldContext);
  return {
    ...fieldContext,
    formControlContext: formControlContext,
  };
}
