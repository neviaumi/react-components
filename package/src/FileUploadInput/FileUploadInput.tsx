import { useCallback, useRef } from 'react';

import { Button } from '../Button/Button.tsx';
import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { useFieldContext } from '../Form/useFieldContext.ts';
import { UploadIcon } from '../icons/solid.tsx';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';
import { NO_OP } from '../utils/no-op.ts';

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

export function FileUploadInput({
  children,
  'data-testid': testId,
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: FileUploadProps) {
  const { formControlContext, id } = useFieldContext({
    onChange: rest.onChange || NO_OP,
  });
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
  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);

  return (
    <>
      <input
        className={'tw-hidden'}
        data-testid={testId && `${testId}-raw-upload-input`}
        id={id}
        onChange={formControlContext?.onChange}
        ref={inputRef}
        type="file"
      />
      <Button
        data-testid={testId}
        disableDefaultClasses={disableDefaultClasses}
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
