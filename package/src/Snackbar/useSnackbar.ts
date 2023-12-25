import { useContext } from 'react';

import { GlobalSnackbar } from './SnackbarProvider.tsx';

export function useSnackbar() {
  const globalSnackbarContext = useContext(GlobalSnackbar);
  return {
    closeSnackbar: globalSnackbarContext.closeSnackbar,
    enqueueSnackbar: globalSnackbarContext.enqueueSnackbar,
    isSnackbarAppear: globalSnackbarContext.isSnackbarAppear,
  };
}
