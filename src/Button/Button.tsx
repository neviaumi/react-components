import ButtonUnstyled, {
  ButtonUnstyledOwnerState,
  ButtonUnstyledOwnProps,
} from '@mui/base/ButtonUnstyled';
import clsx from 'clsx';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components';
import { palette } from '../theme.js';
import { assocDefaultStyle } from '../utils/assign-default-style';

interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'button', ButtonUnstyledOwnerState>;
}

export type ButtonProps = ComponentProps<SlotProps, ButtonUnstyledOwnProps>;

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
          palette.primary.main,
          palette.primary.contrastText,
          palette.primary.hover.main,
          palette.primary.hover.contrastText,
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
