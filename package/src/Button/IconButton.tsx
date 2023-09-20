import type { ButtonOwnerState as ButtonUnstyledOwnerState } from '@mui/base/Button';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { Button } from './Button.tsx';

interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'button', ButtonUnstyledOwnerState>;
}

export type IconButtonProps = ComponentProps<SlotProps>;

export function IconButton({
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
      disableDefaultClasses={disableDefaultClasses}
      slotProps={slotProps}
      {...rest}
    >
      {children}
    </Button>
  );
}
