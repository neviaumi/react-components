import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './Modal.stories.tsx';
import { Modal, ModalContent, ModalTitle } from './Modal.tsx';

const { Modal: ModalStory } = composeStories(stories);

describe('Modal component', () => {
  it('should merge className and className in slotProp.root', () => {
    cy.mount(
      <Modal
        className={'tw-font-normal'}
        data-testid={'test-modal'}
        disableDefaultClasses
        open={true}
        slotProps={{
          root: {
            className: 'tw-text-primary',
          },
        }}
      >
        <ModalTitle
          className={'tw-font-normal'}
          data-testid={'test-modal-title'}
          disableDefaultClasses
          slotProps={{
            root: {
              className: 'tw-text-primary',
            },
          }}
        >
          Modal Title
        </ModalTitle>
        <ModalContent
          className={'tw-font-normal'}
          data-testid={'test-modal-content'}
          disableDefaultClasses
          slotProps={{
            root: {
              className: 'tw-text-primary',
            },
          }}
        >
          Modal Content
        </ModalContent>
      </Modal>,
    );
    cy.findByTestId('test-modal').should(
      'have.class',
      'tw-font-normal tw-text-primary',
    );
    cy.findByTestId('test-modal-title').should(
      'have.attr',
      'class',
      'tw-text-primary tw-font-normal',
    );
    cy.findByTestId('test-modal-content').should(
      'have.attr',
      'class',
      'tw-text-primary tw-font-normal',
    );
  });
});

describe('Modal Story', () => {
  it('should contain values in form when click submit', () => {
    cy.mount(<ModalStory />);

    cy.findByTestId('toggle-modal-button').click();
    cy.findByTestId('ok-button').click();
    cy.findByTestId('message-ok-button-clicked').should('be.visible');
  });

  it('extra class should able to pass into root from props', () => {
    cy.mount(
      <ModalStory className={'tw-font-bold'} data-testid={'test-modal'} />,
    );
    cy.findByTestId('toggle-modal-button').click();
    cy.findByTestId('test-modal').should('have.class', 'tw-font-bold');
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <ModalStory
        className={'tw-font-bold'}
        data-testid={'test-modal'}
        disableDefaultClasses
      />,
    );
    cy.findByTestId('toggle-modal-button').click();
    cy.findByTestId('test-modal').then($el => {
      const classes = $el.attr('class')?.split(' ');
      cy.wrap(classes).should('have.length', 2);
      cy.wrap(classes?.slice(1)).should('deep.equal', ['tw-font-bold']);
    });
  });
});
