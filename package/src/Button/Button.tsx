import ButtonUnstyled, {
  type ButtonOwnerState,
  type ButtonOwnProps,
} from '@mui/base/Button';
import clsx from 'clsx';

import {
  type ComponentProps,
  type SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';

interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'button', ButtonOwnerState>;
}

export type ButtonProps = ComponentProps<
  SlotProps,
  ButtonOwnProps & {
    onClick?: () => void;
  }
>;

export default function Button({
  children,
  'data-testid': testId,
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: ButtonProps) {
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        root: clsx(
          'tw-border',
          'tw-p-0.5',
          'tw-rounded-md',
          'tw-bg-primary',
          'tw-text-primary',
          'tw-border-primary',
          'hover:tw-border-primary-hover',
          'hover:tw-bg-primary-hover',
          'hover:tw-text-primary-hover',
        ),
      },
    })(givenSlotProps);
  }

  return (
    <ButtonUnstyled
      data-testid={testId ?? 'busybox-button'}
      slotProps={slotProps}
      {...rest}
    >
      {children}
    </ButtonUnstyled>
  );
}