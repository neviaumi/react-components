import clsx from 'clsx';
import { type ComponentPropsWithRef } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

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
  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);
  return (
    <a
      data-testid={testId ?? 'busybox-link'}
      {...slotProps?.root}
      {...rootProps}
    />
  );
}
export default Link;
