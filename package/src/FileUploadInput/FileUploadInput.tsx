import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

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
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
>;

export const FileUploadInput = forwardRef<HTMLInputElement, FileUploadProps>(
  function FileUploadInput(
    {
      children,
      'data-testid': testId,
      disableDefaultClasses,
      slotProps: givenSlotProps,
      ...rest
    },
    ref,
  ) {
    const { formControlContext, id, name } = useFieldContext({
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
    useImperativeHandle(ref, () => inputRef.current!);
    return (
      <div className={'tw-grid tw-grid-rows-[1fr_0px]'}>
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
        <input
          className={
            'tw-form-input tw-h-px tw-w-px tw-justify-self-center tw-border-none tw-p-0 focus:tw-border-none focus:tw-shadow-none focus:tw-ring-0'
          }
          data-testid={testId && `${testId}-raw-upload-input`}
          id={id}
          name={name || rootProps.name}
          onChange={formControlContext?.onChange}
          required={formControlContext?.required}
          ref={inputRef}
          type="file"
        />
      </div>
    );
  },
);
