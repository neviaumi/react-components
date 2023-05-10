import FormControlUnstyled, {
  FormControlUnstyledProps,
  useFormControlUnstyledContext,
} from '@mui/base/FormControlUnstyled';
import { createContext, PropsWithChildren, useContext, useId } from 'react';

const FieldContext = createContext<{ id?: string }>({});

export function Field({
  children,
  ...rest
}: PropsWithChildren<FormControlUnstyledProps>) {
  const id = useId();
  return (
    <FieldContext.Provider value={{ id: id }}>
      <FormControlUnstyled {...rest}>{children}</FormControlUnstyled>
    </FieldContext.Provider>
  );
}

export function useFieldContext() {
  const formControlContext = useFormControlUnstyledContext();
  const fieldContext = useContext(FieldContext);
  return {
    ...fieldContext,
    formControlContext: formControlContext,
  };
}
