import type { ChangeEvent } from 'react';
import { useCallback, useRef } from 'react';

import Button from '../Button/Button.js';
import type { ComponentProps } from '../components.js';
import { UploadIcon } from '../icons/solid.js';

export default function FileUpload(
  props: ComponentProps<{
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }>,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onUploadButtonClick = useCallback(() => {
    inputRef.current!.click();
  }, [inputRef]);
  const testId = props['data-testid'];
  return (
    <>
      <input
        className={'tw-hidden'}
        data-testid={testId && `${testId}-raw-upload-input`}
        onChange={props.onChange}
        ref={inputRef}
        type="file"
      />
      <Button data-testid={testId} onClick={onUploadButtonClick}>
        <span className={'tw-flex tw-flex-row tw-content-center tw-gap-0.5'}>
          <UploadIcon />
          {props.children}
        </span>
      </Button>
    </>
  );
}
