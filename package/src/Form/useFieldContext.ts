import {
  type FormControlState,
  useFormControlContext,
} from '@mui/base/FormControl';
import { useContext } from 'react';

import { FieldContext } from './Field.tsx';

type useFieldContextOptions = Partial<FormControlState>;

export function useFieldContext(opt?: useFieldContextOptions) {
  const formControlContext = useFormControlContext();
  const fieldContext = useContext(FieldContext);
  return {
    ...fieldContext,
    formControlContext: formControlContext ?? opt,
  };
}
