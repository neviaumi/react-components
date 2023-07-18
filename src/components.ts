import type { SlotComponentProps as MuiSlotComponentProps } from '@mui/base';
import type { ElementType, PropsWithChildren } from 'react';

export type ComponentProps<
  SlotProps extends MuiSlotComponentProps<any, any, any>,
  Extra = Record<string, unknown>,
> = PropsWithChildren<
  Extra & {
    // https://testing-library.com/docs/queries/bytestid
    'data-testid'?: string;
    disableDefaultClasses?: boolean;
    slotProps?: SlotProps;
  }
>;
export type SlotComponentProps<
  Element extends ElementType,
  Override,
  State,
> = MuiSlotComponentProps<Element, Override, State>;

export type SlotComponentPropsWithoutOverride<
  Element extends ElementType,
  State = unknown,
> = MuiSlotComponentProps<
  Element,
  {
    className?: string;
  },
  State
> & {
  className?: string;
} & Omit<
    ComponentProps<unknown, unknown>,
    'disableDefaultClasses' | 'slotProps'
  >;
