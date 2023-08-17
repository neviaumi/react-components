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

  it('extra class should able to pass into root from props', () => {
    cy.mount(<Modal className={'tw-font-bold'} data-testid={'test-modal'} />);
    cy.findByTestId('toggle-modal-button').click();
    cy.findByTestId('test-modal').should('have.class', 'tw-font-bold');
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <Modal
        className={'tw-font-bold'}
        data-testid={'test-modal'}
        disableDefaultClasses
      />,
    );
    cy.findByTestId('toggle-modal-button').click();
    cy.findByTestId('test-modal').should(
      'have.attr',
      'class',
      'MuiModal-root tw-font-bold',
    );
  });
});
