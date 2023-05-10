import type { ButtonOwnerState as ButtonUnstyledOwnerState } from '@mui/base/Button/index.js';

import {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.d.js';
import { assocDefaultStyle } from '../utils/assign-default-style.js';
import Button from './Button.jsx';

interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'button', ButtonUnstyledOwnerState>;
}

export type IconButtonProps = ComponentProps<SlotProps>;

export default function IconButton({
  children,
  'data-testid': testId,
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: IconButtonProps) {
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        root: 'tw-rounded-3xl',
      },
    })(givenSlotProps);
  }

  return (
    <Button
      data-testid={testId ?? 'busybox-icon-button'}
      slotProps={slotProps}
      {...rest}
    >
      {children}
    </Button>
  );
}
