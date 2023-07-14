import type { LabelHTMLAttributes } from 'react';

import { useFieldContext } from './Field.tsx';

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label {...props} />;
}

function withFieldContext(Component: typeof Label) {
  return function WithFieldContextComponent(
    props: LabelHTMLAttributes<HTMLLabelElement>,
  ) {
    const { id } = useFieldContext();
    return <Component htmlFor={id} {...props} />;
  };
}

const LabelWithFieldContext = withFieldContext(Label);

export default LabelWithFieldContext;
