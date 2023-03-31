import type { ButtonHTMLAttributes } from 'react';
import { useCallback, useRef } from 'react';
import { WiredButton } from 'wired-elements/lib/wired-button.js';

import type { ComponentProps } from '../components.js';
import { createReactComponentFromLitElement } from './wc-to-react.js';

export type ButtonProps = ComponentProps<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

const ReactWiredButton = createReactComponentFromLitElement<ButtonProps>(
  'wired-button',
  WiredButton,
);

export default function Button({ onClick, type, ...rest }: ButtonProps) {
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const onWiredButtonClick = useCallback(() => {
    if (!buttonRef.current) return;
    const button = buttonRef.current;
    button?.click();
  }, [buttonRef]);
  return (
    <>
      <button
        className={'tw-hidden'}
        onClick={onClick}
        ref={buttonRef}
        type={type}
      />
      <ReactWiredButton {...rest} onClick={onWiredButtonClick} />
    </>
  );
}
