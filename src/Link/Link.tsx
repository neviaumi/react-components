import clsx from 'clsx';
import { ComponentPropsWithRef } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components';
import { palette } from '../theme';
import { assocDefaultStyle } from '../utils/assign-default-style';

interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'a', object>;
}

export type LinkProps = ComponentProps<SlotProps, ComponentPropsWithRef<'a'>>;

function Link({
  'data-testid': testId,
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: LinkProps) {
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        root: clsx(
          palette.primary.main,
          palette.primary.contrastText,
          palette.primary.hover.main,
          palette.primary.hover.contrastText,
          'tw-block',
        ),
      },
    })(givenSlotProps);
  }
  return (
    <a
      className={slotProps?.root.className}
      data-testid={testId ?? 'busybox-link'}
      {...rest}
    />
  );
}
export default Link;
