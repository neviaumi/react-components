import FormControlUnstyled, {
  useFormControlUnstyledContext,
} from '@mui/base/FormControlUnstyled';
import { createContext, PropsWithChildren, useContext, useId } from 'react';

const FieldContext = createContext<{ id?: string }>({});

export function Field(props: PropsWithChildren) {
  const id = useId();
  return (
    <FieldContext.Provider value={{ id: id }}>
      <FormControlUnstyled>{props.children}</FormControlUnstyled>
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
