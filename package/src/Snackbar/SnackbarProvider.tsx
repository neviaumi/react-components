import { Portal, type PortalProps } from '@mui/base/Portal';
import clsx from 'clsx';
import { identity } from 'ramda';
import { createContext, type JSX, useCallback, useState } from 'react';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';
import {
  Snackbar,
  type SnackbarCloseReason,
  type SnackbarProps,
} from './Snackbar.tsx';

export const GlobalSnackbar = createContext<{
  closeSnackbar: (notificationId: string) => void;
  enqueueSnackbar: (props: SnackbarProps) => string;
  isSnackbarAppear: (notificationId: string) => boolean;
}>({
  closeSnackbar: () => {},
  enqueueSnackbar: () => '',
  isSnackbarAppear: () => false,
});

interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'div'>;
}
export type SnackbarProviderProps = ComponentProps<
  SlotProps,
  { portal?: PortalProps }
>;

export function SnackbarProvider({
  children,
  disableDefaultClasses,
  portal,
  slotProps: givenSlotProps,
  ...rest
}: SnackbarProviderProps) {
  const [snackbars, setSnackbars] = useState<JSX.Element[]>([]);
  const portalContainer = portal?.container ?? document.body;
  const slotProps = disableDefaultClasses
    ? givenSlotProps
    : assocDefaultStyle<SlotProps>({
        slotWithDefaultClasses: {
          root: clsx(
            'tw-absolute tw-left-1/2 tw-top-0 tw-z-20 tw--translate-x-1/2',
          ),
        },
      })(givenSlotProps);
  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);
  const closeSnackbar = useCallback((notificationId: string) => {
    setSnackbars(prev =>
      prev.filter(snackbar => snackbar.key !== notificationId),
    );
  }, []);
  const isSnackbarAppear = useCallback(
    (notificationId: string) => {
      return snackbars.some(snackbar => snackbar.key === notificationId);
    },
    [snackbars],
  );
  const enqueueSnackbar = useCallback(
    (props: SnackbarProps) => {
      const { key, onClose, ...rest } = props;
      const notificationId = String(key ?? window.crypto.randomUUID());
      if (isSnackbarAppear(notificationId)) return notificationId;
      const onSnackbarClose = (_: any, reason: SnackbarCloseReason) => {
        if (reason === 'clickaway') return;
        closeSnackbar(notificationId);
        (onClose ?? identity)(_, reason);
      };
      const snackbar = (
        <Snackbar
          {...rest}
          key={notificationId}
          onClose={onSnackbarClose}
          open={true}
        />
      );
      setSnackbars(prev => [...prev, snackbar]);
      return notificationId;
    },
    [closeSnackbar, isSnackbarAppear],
  );

  return (
    <GlobalSnackbar.Provider
      value={{ closeSnackbar, enqueueSnackbar, isSnackbarAppear }}
    >
      <Portal container={portalContainer}>
        <div {...rootProps}>{snackbars}</div>
      </Portal>
      {children}
    </GlobalSnackbar.Provider>
  );
}
