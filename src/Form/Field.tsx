import FormControl, {
  FormControlProps,
  FormControlState,
  useFormControlContext,
} from '@mui/base/FormControl';
import {
  createContext,
  forwardRef,
  PropsWithChildren,
  Ref,
  useContext,
  useId,
} from 'react';

const FieldContext = createContext<{ id?: string }>({});

export const Field = forwardRef(function Field(
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

type useFieldContextOptions = Partial<FormControlState>;

export function useFieldContext(opt?: useFieldContextOptions) {
  const formControlContext = useFormControlContext();
  const fieldContext = useContext(FieldContext);
  return {
    ...fieldContext,
    formControlContext: formControlContext ?? opt,
  };
}
