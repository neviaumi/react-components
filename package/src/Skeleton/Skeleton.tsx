import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import React, { createElement } from 'react';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import clsx from 'clsx';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

interface SkeletonSlotProps {
  root?: SlotComponentPropsWithoutOverride<'div'>;
}

export type SkeletonProps = ComponentProps<
  SkeletonSlotProps,
  {
    slot?: { root?: keyof React.ReactHTML | React.FunctionComponent };
  }
>;

export function Skeleton({
  'data-testid': testId,
  disableDefaultClasses,
  slot,
  slotProps: givenSlotProps,
  ...rest
}: SkeletonProps) {
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SkeletonSlotProps>({
      slotWithDefaultClasses: {
        root: clsx('tw-animate-pulse tw-bg-gray-300'),
      },
    })(givenSlotProps);
  }
  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);
  return createElement(slot?.root ?? 'div', {
    'data-testid': testId ?? 'busybox-skeleton',
    ...slotProps?.root,
    ...rootProps,
  });
}
