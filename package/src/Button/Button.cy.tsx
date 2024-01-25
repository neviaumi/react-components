import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './Button.stories.tsx';

const { Button } = composeStories(stories);

describe('Button stories', () => {
  it('onClick should be when click the button', () => {
    const clickCallback = cy.stub().as('clickCallback');
    cy.mount(
      <Button data-testid={'test-primary-button'} onClick={clickCallback}>
        Primary button test
      </Button>,
    );

    cy.findByTestId('test-primary-button').click();
    cy.wrap(clickCallback).should('be.called');
  });
  it('extra class should able to pass into root from props', () => {
    cy.mount(
      <Button className={'tw-font-bold'} data-testid={'test-primary-button'}>
        Primary button test
      </Button>,
    );
    cy.findByTestId('test-primary-button').should('have.class', 'tw-font-bold');
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <Button
        className={'tw-font-bold'}
        data-testid={'test-primary-button'}
        disableDefaultClasses
      >
        Primary button test
      </Button>,
    );
    cy.findByTestId('test-primary-button').then($el => {
      const classes = $el.attr('class')?.split(' ');
      cy.wrap(classes).should('have.length', 2);
      cy.wrap(classes?.slice(1)).should('deep.equal', ['tw-font-bold']);
    });
  });
});
