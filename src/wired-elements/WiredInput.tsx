import type { InputHTMLAttributes, MutableRefObject } from 'react';
import { useEffect, useRef } from 'react';
import { WiredInput } from 'wired-elements/lib/wired-input.js';

import type { ComponentProps } from '../components';
import { generateTestIdWithPrefix } from '../test-helpers/test-id.js';
import { createReactComponentFromLitElement } from './wc-to-react.js';

export type InputProps = ComponentProps<InputHTMLAttributes<HTMLInputElement>>;
const ReactWiredInput = createReactComponentFromLitElement<
  { ref: MutableRefObject<unknown> } & InputProps
>('wired-input', WiredInput);

export default function Input({
  className,
  'data-testid': testId,
  id,
  onInvalid,
  pattern,
  style,
  title,
  ...rest
}: InputProps) {
  const inputRef = useRef<null | WiredInput>(null);
  useEffect(() => {
    if (!inputRef.current) return;
    const input = inputRef.current.input;
    if (id) input?.setAttribute('id', id);
    if (pattern) input?.setAttribute('pattern', pattern);
    if (title) input?.setAttribute('title', title);
    if (testId)
      input?.setAttribute(
        'data-testid',
        generateTestIdWithPrefix({
          id: 'raw-input',
          prefix: testId,
        }),
      );
  }, [inputRef, id, onInvalid, pattern, title, testId]);

  useEffect(() => {
    if (!inputRef.current) return;
    const wiredInput = inputRef.current;
    wiredInput.wiredRender(true); // class name has been updated
  }, [inputRef, className, style]);

  return (
    <ReactWiredInput
      {...rest}
      className={className}
      data-testid={testId}
      ref={inputRef}
      style={style}
    />
  );
}
