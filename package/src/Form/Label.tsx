import type { LabelHTMLAttributes } from 'react';

import { useFieldContext } from '../Form/useFieldContext.ts';

export function FieldSetLabel(props: React.PropsWithChildren) {
  return (
    <legend className={'tw-h-0 tw-w-0 tw-overflow-hidden'}>
      {props.children}
    </legend>
  );
}

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const { id } = useFieldContext();
  if (Object.hasOwn(props, 'htmlFor') && !props.htmlFor) {
    return (
      <>
        <legend className={'tw-h-0 tw-w-0 tw-overflow-hidden'}>
          {props.children}
        </legend>
        {id && <span {...props} />}
      </>
    );
  }
  return (
    <>
      <legend className={'tw-h-0 tw-w-0 tw-overflow-hidden'}>
        {props.children}
      </legend>
      {id && <label htmlFor={id} {...props} />}
    </>
  );
}
