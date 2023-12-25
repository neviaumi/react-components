import { Button } from '@busybox/react-components/Button';
import {
  Modal,
  ModalContent,
  ModalTitle,
} from '@busybox/react-components/Modal';
import {
  Snackbar,
  type SnackbarCloseReason,
} from '@busybox/react-components/Snackbar';
import { SnackbarProvider } from '@busybox/react-components/SnackbarProvider';
import { useSnackbar } from '@busybox/react-components/useSnackbar';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import {
  userEvent,
  waitForElementToBeRemoved,
  within,
} from '@storybook/testing-library';
import type { PropsWithoutRef } from 'react';
import { useState } from 'react';

const meta: Meta = {
  title: 'Demo/Snackbar',
};

export default meta;

type Story = StoryObj;

export const SnackbarWithModal: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Open Modal by click open modal button', async () => {
      await userEvent.click(
        await canvas.findByRole('button', {
          name: 'Open Modal',
        }),
      );
      await expect(
        within(document.body).findByRole('article', {
          name: 'Demo show snackbar before close modal',
        }),
      ).resolves.toBeVisible();
    });
    await step('Close Modal by click close modal button', async () => {
      await userEvent.click(
        await within(document.body).findByRole('button', {
          name: 'Close the modal',
        }),
      );
      await expect(
        within(document.body).findByText('Will hide the modal after 5s'),
      ).resolves.toBeVisible();
      await waitForElementToBeRemoved(
        await within(document.body).findByRole('article', {
          name: 'Demo show snackbar before close modal',
        }),
        {
          timeout: 5000,
        },
      );
    });
  },
  render: () => {
    const [shouldModalOpen, setShouldModalOpen] = useState(false);
    const [shouldSnackbarOpen, setShouldSnackbarOpen] = useState(false);

    const beginModalCloseProcedure = () => {
      if (!shouldSnackbarOpen) setShouldSnackbarOpen(true);
    };

    return (
      <>
        <Modal onClose={beginModalCloseProcedure} open={shouldModalOpen}>
          <Snackbar
            autoHideDuration={5000}
            className={'tw-mt-1 tw-bg-primary tw-px-4 tw-py-2 tw-text-primary'}
            onClose={(_: unknown, reason: SnackbarCloseReason) => {
              if (reason === 'clickaway') return;
              setShouldSnackbarOpen(false);
              setShouldModalOpen(false);
            }}
            open={shouldSnackbarOpen}
          >
            Will hide the modal after 5s
          </Snackbar>
          <ModalTitle>Demo show snackbar before close modal</ModalTitle>
          <ModalContent>
            <Button onClick={beginModalCloseProcedure}>Close the modal</Button>
          </ModalContent>
        </Modal>
        <Button onClick={() => setShouldModalOpen(true)}>Open Modal</Button>
      </>
    );
  },
};

export const SnackbarProviderWithModal: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Open Modal by click open modal button', async () => {
      await userEvent.click(
        await canvas.findByRole('button', {
          name: 'Open Modal',
        }),
      );
      await expect(
        within(document.body).findByRole('article', {
          name: 'Demo trigger snackbar with snackbar provider inside modal',
        }),
      ).resolves.toBeVisible();
    });
    await step('Close Modal by click close modal button', async () => {
      await userEvent.click(
        await within(document.body).findByRole('button', {
          name: 'Close the modal',
        }),
      );
      await expect(
        within(document.body).findByText('Will hide the modal after 5s'),
      ).resolves.toBeVisible();
      await waitForElementToBeRemoved(
        await within(document.body).findByRole('article', {
          name: 'Demo trigger snackbar with snackbar provider inside modal',
        }),
        {
          timeout: 5000,
        },
      );
    });
  },

  render: () => {
    const [shouldModalOpen, setShouldModalOpen] = useState(false);

    function ModalWithSnackbarProvider({
      onClose,
      open,
    }: PropsWithoutRef<{ onClose: () => void; open: boolean }>) {
      const notificationId = 'demo-notification';
      const { enqueueSnackbar, isSnackbarAppear } = useSnackbar();
      function enqueueSnackbarAndCloseModal() {
        enqueueSnackbar({
          autoHideDuration: 5000,
          children: 'Will hide the modal after 5s',
          className: 'tw-bg-primary tw-text-primary tw-px-4 tw-py-2 tw-mt-1',
          key: notificationId,
          onClose: onClose,
        });
      }

      return (
        <Modal onClose={enqueueSnackbarAndCloseModal} open={open}>
          <ModalTitle>
            Demo trigger snackbar with snackbar provider inside modal
          </ModalTitle>
          <ModalContent>
            <Button
              className={'disabled:tw-bg-disabled disabled:tw-text-disabled'}
              disabled={isSnackbarAppear(notificationId)}
              onClick={enqueueSnackbarAndCloseModal}
            >
              Close the modal
            </Button>
          </ModalContent>
        </Modal>
      );
    }

    return (
      <SnackbarProvider>
        <ModalWithSnackbarProvider
          onClose={() => setShouldModalOpen(false)}
          open={shouldModalOpen}
        />
        <Button onClick={() => setShouldModalOpen(true)}>Open Modal</Button>
      </SnackbarProvider>
    );
  },
};
