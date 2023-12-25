import {
  Snackbar as MuiSnackbar,
  type SnackbarOwnerState,
  type SnackbarProps as MuiSnackbarProps,
} from '@mui/base/Snackbar';
import clsx from 'clsx';
import { useState } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'div', SnackbarOwnerState>;
}

export type SnackbarProps = ComponentProps<SlotProps, MuiSnackbarProps>;

export function Snackbar({
  disableDefaultClasses,
  open,
  slotProps: givenSlotProps,
  ...rest
}: SnackbarProps) {
  const [animationFinish, setAnimationFinish] = useState(true);
  const slotProps = disableDefaultClasses
    ? givenSlotProps
    : assocDefaultStyle<SlotProps>({
        slotWithDefaultClasses: {
          root: clsx('tw-origin-center'),
        },
      })(givenSlotProps);
  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);
  return (
    <MuiSnackbar
      open={open}
      slotProps={slotProps}
      {...rootProps}
      exited={animationFinish}
      onAnimationEnd={() => {
        setAnimationFinish(open !== true);
      }}
      onAnimationStart={() => {
        setAnimationFinish(false);
      }}
    />
  );
}

export type { SnackbarCloseReason } from '@mui/base/useSnackbar';
