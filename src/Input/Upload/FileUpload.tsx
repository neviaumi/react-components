import { useCallback, useRef } from 'react';

import Button from '../../Button/Button';
import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../../components';
import { UploadIcon } from '../../icons/solid';
import { assocDefaultStyle } from '../../utils/assign-default-style';
import { useFieldContext } from '../Field';

export type UploadedFileLikeObject = {
  name: string;
  type: string;
  url: string;
};
interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'button', object>;
}

export default function FileUpload({
  children,
  'data-testid': testId,
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: ComponentProps<SlotProps>) {
  const { formControlContext, id } = useFieldContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const onUploadButtonClick = useCallback(() => {
    inputRef.current!.click();
  }, [inputRef]);
  if (formControlContext === undefined) {
    return null;
  }
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        root: 'tw-flex tw-flex-row tw-content-center tw-items-center tw-gap-0.5',
      },
    })(givenSlotProps);
  }

  return (
    <>
      <input
        className={'tw-hidden'}
        data-testid={testId && `${testId}-raw-upload-input`}
        id={id}
        onChange={formControlContext.onChange}
        ref={inputRef}
        type="file"
      />
      <Button
        data-testid={testId}
        slotProps={{
          root: { ...slotProps?.root, onClick: onUploadButtonClick },
        }}
        {...rest}
      >
        <UploadIcon />
        {children}
      </Button>
    </>
  );
}
