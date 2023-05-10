import clsx from 'clsx';
import React, { createElement } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from './components';
import { assocDefaultStyle } from './utils/assign-default-style';

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
    component: keyof React.ReactHTML;
  }
>;

export function CardHeader({
  component,
  'data-testid': testId,
  disableDefaultClasses,
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
  return createElement(component, {
    'data-testid': testId ?? 'busybox-card-header',
    ...rest,
    ...slotProps?.root,
  });
}
