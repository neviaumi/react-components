import clsx from 'clsx';
import React, { createElement } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'div'>;
}

export type CardProps = ComponentProps<SlotProps>;

export function Card({
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

  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);

  return (
    <section
      data-testid={testId ?? 'busybox-card'}
      {...slotProps?.root}
      {...rootProps}
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
    slot?: { root?: keyof React.ReactHTML | React.FunctionComponent };
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
  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);

  return createElement(slot?.root ?? 'h1', {
    'data-testid': testId ?? 'busybox-card-title',
    ...slotProps?.root,
    ...rootProps,
  });
}
