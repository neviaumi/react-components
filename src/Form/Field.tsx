import FormControl, {
  FormControlProps,
  FormControlState,
  useFormControlContext,
} from '@mui/base/FormControl/index.js';
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

type useFieldContextOptions = Partial<FormControlState>;

export function useFieldContext(opt?: useFieldContextOptions) {
  const formControlContext = useFormControlContext();
  const fieldContext = useContext(FieldContext);
  return {
    ...fieldContext,
    formControlContext: formControlContext ?? opt,
  };
}
