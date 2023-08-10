import { Input } from '@mui/base/Input';
import { useCallback, useRef } from 'react';

import Button from '../Button/Button.tsx';
import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import useFieldContext from '../Form/useFieldContext.ts';
import { UploadIcon } from '../icons/solid.tsx';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

export type UploadedFileLikeObject = {
  name: string;
  type: string;
  url: string;
};
interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'button', object>;
}

type FileUploadProps = ComponentProps<
  SlotProps,
  {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
>;

export default function FileUploadInput({
  children,
  'data-testid': testId,
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: FileUploadProps) {
  const { id } = useFieldContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const onUploadButtonClick = useCallback(() => {
    inputRef.current!.click();
  }, [inputRef]);

  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        root: 'tw-flex tw-flex-row tw-gap-0.5',
      },
    })(givenSlotProps);
  }
  const { onChange, ...rootProps } = mergeRootSlotPropsToComponentProps()(
    slotProps,
    rest,
  );

  return (
    <>
      <Input
        className={'tw-hidden'}
        data-testid={testId && `${testId}-raw-upload-input`}
        id={id}
        onChange={onChange}
        slotProps={{
          input: {
            ref: inputRef,
          },
        }}
        type="file"
      />
      <Button
        data-testid={testId}
        slotProps={{
          root: { ...slotProps?.root, onClick: onUploadButtonClick },
        }}
        {...rootProps}
      >
        <UploadIcon />
        {children}
      </Button>
    </>
  );
}
