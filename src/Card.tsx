import clsx from 'clsx';
import React, { createElement } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from './components.d.js';
import { assocDefaultStyle } from './utils/assign-default-style.js';

interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'div'>;
}

export type CardProps = ComponentProps<SlotProps>;

export default function Card({
  children,
  'data-testid': testId,
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: CardProps) {
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        root: clsx(
          'tw-py-0.5',
          'tw-px-1',
          'tw-border-primary-border',
          'hover:tw-border-primary-border-hover',
          'tw-border',
        ),
      },
    })(givenSlotProps);
  }

  return (
    <section
      data-testid={testId ?? 'busybox-card'}
      {...rest}
      {...slotProps?.root}
    >
      {children}
    </section>
  );
}

interface CardHeaderSlotProps {
  root?: SlotComponentPropsWithoutOverride<'h1'>;
}

export type CardHeaderProps = ComponentProps<
  CardHeaderSlotProps,
  {
    slot?: { root?: keyof React.ReactHTML };
  }
>;

export function CardHeader({
  'data-testid': testId,
  disableDefaultClasses,
  slot,
  slotProps: givenSlotProps,
  ...rest
}: CardHeaderProps) {
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        root: clsx('tw-text-primary-text', 'hover:tw-text-primary-text-hover'),
      },
    })(givenSlotProps);
  }
  return createElement(slot?.root ?? 'h1', {
    'data-testid': testId ?? 'busybox-card-header',
    ...rest,
    ...slotProps?.root,
  });
}
