import clsx from 'clsx';
import { ComponentPropsWithRef } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.d.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';

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
          'tw-bg-primary',
          'tw-text-primary',
          'hover:tw-bg-primary-hover',
          'hover:tw-text-primary-hover',
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
