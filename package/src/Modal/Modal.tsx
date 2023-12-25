import {
  Modal as MuiModal,
  type ModalOwnerState,
  type ModalOwnProps,
  type ModalSlots,
} from '@mui/base/Modal';
import clsx from 'clsx';
import React, { createElement, useMemo } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { assocDefaultValues } from '../utils/assign-default-values.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

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

export function Modal({
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
      open={open}
      slotProps={slotPropsWithDefaultStyle}
      slots={slotsWithValues}
      {...rest}
    >
      <article
        aria-labelledby={'busybox-modal-title'}
        {...slotPropsWithDefaultStyle?.content}
      >
        {children}
      </article>
    </MuiModal>
  );
}

interface ModalTitleSlotProps {
  root?: SlotComponentPropsWithoutOverride<'h1'>;
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
  disableDefaultClasses,
  id,
  slot,
  slotProps,
  ...rest
}: ModalTitleProps) {
  const slotPropsWithDefaultStyle = useMemo<ModalTitleSlotProps | undefined>(
    () =>
      disableDefaultClasses
        ? slotProps
        : assocDefaultStyle<ModalTitleSlotProps>({
            slotWithDefaultClasses: {
              root: clsx('tw-mb-2 tw-flex tw-pb-2 tw-text-primary'),
            },
          })(slotProps),
    [disableDefaultClasses, slotProps],
  );
  const rootProps = mergeRootSlotPropsToComponentProps()(
    slotPropsWithDefaultStyle,
    rest,
  );
  return createElement(
    slot?.root ?? 'h1',
    {
      'data-testid': testId ?? 'busybox-modal-title',
      id: id ?? 'busybox-modal-title',
      ...rootProps,
    },
    children,
  );
}

interface ModalContentSlotProps {
  root?: SlotComponentPropsWithoutOverride<'section'>;
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
  disableDefaultClasses,
  id,
  slot,
  slotProps,
  ...rest
}: ModalContentProps) {
  const slotPropsWithDefaultStyle = useMemo<ModalContentSlotProps | undefined>(
    () =>
      disableDefaultClasses
        ? slotProps
        : assocDefaultStyle<ModalContentSlotProps>({
            slotWithDefaultClasses: {
              root: clsx('tw-mb-4 tw-flex tw-pb-2 tw-text-primary'),
            },
          })(slotProps),
    [disableDefaultClasses, slotProps],
  );
  const rootProps = mergeRootSlotPropsToComponentProps()(
    slotPropsWithDefaultStyle,
    rest,
  );
  return createElement(
    slot?.root ?? 'section',
    {
      'data-testid': testId ?? 'busybox-modal-content',
      id: id ?? 'busybox-modal-content',
      ...rootProps,
    },
    children,
  );
}
