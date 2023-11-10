import type { LabelHTMLAttributes } from 'react';

import { useFieldContext } from '../Form/useFieldContext.ts';

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const { id } = useFieldContext();

  return (
    <>
      <legend className={'tw-h-0 tw-w-0 tw-overflow-hidden'}>
        {props.children}
      </legend>
      {id && <label htmlFor={id} {...props} />}
    </>
  );
}
