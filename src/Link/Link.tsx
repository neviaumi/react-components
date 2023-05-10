import clsx from 'clsx';
import { ComponentPropsWithRef } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.d.js';
import { assocDefaultStyle } from '../utils/assign-default-style.js';

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
          'tw-bg-primary-bg',
          'tw-text-primary-text',
          'hover:tw-bg-primary-bg-hover',
          'hover:tw-text-primary-text-hover',
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
