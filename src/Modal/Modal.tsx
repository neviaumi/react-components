import MuiModal, {
  ModalOwnerState,
  ModalOwnProps,
  ModalSlots,
} from '@mui/base/Modal/index.js';
import clsx from 'clsx';
import React, { createElement, useMemo } from 'react';

import {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.d.js';
import { assocDefaultStyle } from '../utils/assign-default-style.js';
import { assocDefaultValues } from '../utils/assign-default-values.js';

interface SlotProps {
  backdrop?: SlotComponentPropsWithoutOverride<'div'>;
  content?: SlotComponentPropsWithoutOverride<'article'>;
  root?: SlotComponentPropsWithoutOverride<'div', ModalOwnerState>;
}

export type ModalProps = ComponentProps<
  SlotProps,
  Omit<ModalOwnProps, 'children'> & {
    children: any;
  }
>;

export default function Modal({
  children,
  disableDefaultClasses,
  open,
  slotProps,
  slots,
  ...rest
}: ModalProps) {
  const slotPropsWithDefaultStyle = useMemo<SlotProps | undefined>(
    () =>
      disableDefaultClasses
        ? slotProps
        : assocDefaultStyle<SlotProps>({
            slotWithDefaultClasses: {
              backdrop: clsx(
                'tw-bg-black',
                'tw-opacity-50',
                'tw-fixed',
                'tw-top-0',
                'tw-left-0',
                'tw-right-0',
                'tw-bottom-0',
                'tw--z-10',
              ),
              content: clsx('tw-bg-white', 'tw-px-4', 'tw-py-2', 'tw-w-100'),
              root: clsx(
                'tw-z-10',
                'tw-fixed',
                'tw-top-0',
                'tw-left-0',
                'tw-right-0',
                'tw-bottom-0',
                'tw-flex',
                'tw-justify-center',
                'tw-items-center',
              ),
            },
          })(slotProps),
    [disableDefaultClasses, slotProps],
  );
  const slotsWithValues = useMemo(
    () =>
      assocDefaultValues<ModalSlots>({
        backdrop: 'div',
      })(slots),
    [slots],
  );

  return (
    <MuiModal
      aria-labelledby={'busybox-modal-title'}
      open={open}
      slotProps={slotPropsWithDefaultStyle}
      slots={slotsWithValues}
      {...rest}
    >
      <article {...slotPropsWithDefaultStyle?.content}>{children}</article>
    </MuiModal>
  );
}

interface ModalTitleSlotProps {
  content?: SlotComponentPropsWithoutOverride<'h1'>;
  root?: SlotComponentPropsWithoutOverride<'div'>;
}

export type ModalTitleProps = ComponentProps<
  ModalTitleSlotProps,
  {
    id?: string;
    slot?: { root?: keyof React.ReactHTML };
  }
>;

export function ModalTitle({
  children,
  'data-testid': testId,
  id,
  slot,
  slotProps,
  ...rest
}: ModalTitleProps) {
  const slotPropsWithDefaultStyle = useMemo<ModalTitleSlotProps>(
    () =>
      assocDefaultStyle<SlotProps>({
        slotWithDefaultClasses: {
          root: clsx(
            'tw-mb-2 tw-flex tw-border-b tw-border-primary tw-pb-2 tw-text-primary',
          ),
        },
      })(slotProps),
    [slotProps],
  );
  return (
    <div {...rest} {...slotPropsWithDefaultStyle?.root}>
      {createElement(
        slot?.root ?? 'h1',
        {
          'data-testid': testId ?? 'busybox-modal-title',
          id: id ?? 'busybox-modal-title',
          ...slotPropsWithDefaultStyle?.content,
        },
        children,
      )}
    </div>
  );
}

interface ModalContentSlotProps {
  content?: SlotComponentPropsWithoutOverride<'section'>;
  root?: SlotComponentPropsWithoutOverride<'div'>;
}

export type ModalContentProps = ComponentProps<
  ModalContentSlotProps,
  {
    id?: string;
    slot?: { root?: keyof React.ReactHTML };
  }
>;

export function ModalContent({
  children,
  'data-testid': testId,
  id,
  slot,
  slotProps,
  ...rest
}: ModalContentProps) {
  const slotPropsWithDefaultStyle = useMemo<ModalTitleSlotProps>(
    () =>
      assocDefaultStyle<SlotProps>({
        slotWithDefaultClasses: {
          root: clsx('tw-mb-4 tw-flex tw-border-b-2 tw-pb-2 tw-text-primary'),
        },
      })(slotProps),
    [slotProps],
  );
  return (
    <div {...rest} {...slotPropsWithDefaultStyle?.root}>
      {createElement(
        slot?.root ?? 'section',
        {
          'data-testid': testId ?? 'busybox-modal-content',
          id: id ?? 'busybox-modal-content',
          ...rest,
          ...slotProps?.content,
        },
        children,
      )}
    </div>
  );
}
