import type { LabelHTMLAttributes } from 'react';

import { useFieldContext } from '../Form/useFieldContext.ts';

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const { id } = useFieldContext();

  return <label htmlFor={id} {...props} />;
}
