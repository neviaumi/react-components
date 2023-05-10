import ButtonUnstyled, {
  ButtonOwnerState,
  ButtonOwnProps,
} from '@mui/base/Button';
import clsx from 'clsx';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components';
import { assocDefaultStyle } from '../utils/assign-default-style';

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
          'tw-border-2',
          'tw-p-0.5',
          'tw-rounded-md',
          'tw-bg-primary-bg',
          'tw-text-primary-text',
          'tw-border-primary-border',
          'hover:tw-border-primary-border-hover',
          'hover:tw-bg-primary-bg-hover',
          'hover:tw-text-primary-text-hover',
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
