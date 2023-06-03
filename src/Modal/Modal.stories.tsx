import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';
import { useCallback, useState } from 'react';

import Button from '../Button/Button.jsx';
import ModalComponent, { ModalContent, ModalTitle } from './Modal.jsx';

const meta: Meta<typeof ModalComponent> = {
  component: ModalComponent,
  title: 'Component/Modal',
};

export default meta;
type Story = StoryObj<typeof ModalComponent>;
export const ToggleModal: Story = {
  render: () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [hasOkButtonClicked, setHasOkButtonClicked] = useState(false);
    const closeModal = useCallback(() => {
      setModalOpen(false);
    }, [setModalOpen]);
    const whenOkButtonClick = useCallback(() => {
      setHasOkButtonClicked(true);
      closeModal();
    }, [setHasOkButtonClicked, closeModal]);
    return (
      <>
        <Button
          data-testid={'toggle-modal-button'}
          onClick={useCallback(() => setModalOpen(current => !current), [])}
        >
          Click to {modalOpen ? 'close' : 'open'} modal
        </Button>
        <ModalComponent
          data-testid={'modal'}
          onClose={closeModal}
          open={modalOpen}
        >
          <ModalTitle>Modal Title</ModalTitle>
          <ModalContent>Modal Content</ModalContent>
          <footer className={clsx('tw-mb-2 tw-flex tw-justify-end tw-gap-2')}>
            <Button data-testid={'ok-button'} onClick={whenOkButtonClick}>
              Ok
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </footer>
        </ModalComponent>
        {hasOkButtonClicked && (
          <p data-testid={'message-ok-button-clicked'}>Ok button clicked</p>
        )}
      </>
    );
  },
};
