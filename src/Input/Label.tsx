import type { LabelHTMLAttributes } from 'react';

import { useFieldContext } from './Field.js';

export default function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const { id } = useFieldContext();
  return <label htmlFor={id} {...props} />;
}
