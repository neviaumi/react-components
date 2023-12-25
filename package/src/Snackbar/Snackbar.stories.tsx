import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button/Button.tsx';
import { Snackbar as SnackbarComponent } from './Snackbar.tsx';
import { SnackbarProvider } from './SnackbarProvider.tsx';
import { useSnackbar } from './useSnackbar.ts';

const meta: Meta<typeof SnackbarComponent> = {
  component: SnackbarComponent,
  title: 'Component/Snackbar',
};

export default meta;

type Story = StoryObj<typeof SnackbarComponent>;

export const Snackbar: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open Snackbar
        </Button>
        <SnackbarComponent
          autoHideDuration={1000}
          className={`tw-h-5 tw-w-20 tw-border-error tw-bg-error tw-text-error-contrast ${
            open
              ? 'tw-animate-[show_1s_ease-in-out]'
              : 'tw-animate-[hide_1s_ease-in-out_1_forwards]'
          }`}
          onClose={(_, reason) => {
            if (reason === 'clickaway') return;
            setOpen(false);
          }}
          open={open}
        >
          <span>Hello</span>
        </SnackbarComponent>
      </>
    );
  },
};

function StoryWithGlobalSnackbar() {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Button
      onClick={() =>
        enqueueSnackbar({
          autoHideDuration: 1000,
          children: <span>Hello</span>,
          className: `tw-h-5 tw-w-20 tw-border-error tw-bg-error tw-text-error-contrast`,
        })
      }
    >
      Open Snackbar
    </Button>
  );
}

export const GlobalSnackbar: Story = {
  render: () => {
    return (
      <SnackbarProvider>
        <StoryWithGlobalSnackbar />
      </SnackbarProvider>
    );
  },
};
