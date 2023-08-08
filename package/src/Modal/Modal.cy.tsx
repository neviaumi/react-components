import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './Modal.stories.tsx';

const { Modal } = composeStories(stories);

describe('ToggleModal stories', () => {
  it('should contain values in form when click submit', () => {
    cy.mount(<Modal />);

    cy.findByTestId('toggle-modal-button').click();
    cy.findByTestId('ok-button').click();
    cy.findByTestId('message-ok-button-clicked').should('be.visible');
  });
});
