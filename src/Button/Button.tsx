import ButtonUnstyled, {
  ButtonUnstyledOwnerState,
} from '@mui/base/ButtonUnstyled';
import clsx from 'clsx';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components';
import { palette } from '../theme.js';

interface SlotProps {
  root: SlotComponentPropsWithoutOverride<'button', ButtonUnstyledOwnerState>;
}

export default function Button({
  children,
  'data-testid': testId,
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: ComponentProps<SlotProps>) {
  const defaultClasses = clsx(
    palette.primary.main,
    palette.primary.contrastText,
    palette.primary.hover.main,
    palette.primary.hover.contrastText,
  );

  const slotProps: SlotProps = givenSlotProps
    ? givenSlotProps
    : {
        root: {},
      };

  if (!disableDefaultClasses) {
    slotProps.root.className = clsx(defaultClasses, slotProps.root.className);
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
