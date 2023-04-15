import type { ButtonUnstyledOwnerState } from '@mui/base/ButtonUnstyled';

import {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components';
import { assocDefaultStyle } from '../utils/assign-default-style';
import Button from './Button';

interface SlotProps {
  root: SlotComponentPropsWithoutOverride<'button', ButtonUnstyledOwnerState>;
}

export type IconButtonProps = ComponentProps<any>;

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
    <div className={'tw-inline-block'}>
      <Button
        data-testid={testId ?? 'busybox-icon-button'}
        role={'button'}
        slotProps={slotProps}
        {...rest}
      >
        {children}
      </Button>
    </div>
  );
}
