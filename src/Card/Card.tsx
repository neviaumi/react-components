import clsx from 'clsx';
import React, { createElement } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.d.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';

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
          'tw-border-primary',
          'hover:tw-border-primary-hover',
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

interface CardTitleSlotProps {
  root?: SlotComponentPropsWithoutOverride<'h1'>;
}

export type CardTitleProps = ComponentProps<
  CardTitleSlotProps,
  {
    slot?: { root?: keyof React.ReactHTML };
  }
>;

export function CardTitle({
  'data-testid': testId,
  disableDefaultClasses,
  slot,
  slotProps: givenSlotProps,
  ...rest
}: CardTitleProps) {
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        root: clsx('tw-text-primary', 'hover:tw-text-primary-hover'),
      },
    })(givenSlotProps);
  }
  return createElement(slot?.root ?? 'h1', {
    'data-testid': testId ?? 'busybox-card-title',
    ...rest,
    ...slotProps?.root,
  });
}
