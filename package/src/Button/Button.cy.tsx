import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './Button.stories.tsx';

const { Primary } = composeStories(stories);

describe('Button stories', () => {
  it('Primary button', () => {
    const clickCallback = cy.stub().as('clickCallback');
    cy.mount(
      <Primary data-testid={'test-primary-button'} onClick={clickCallback}>
        Primary button test
      </Primary>,
    );

    cy.findByTestId('test-primary-button').click();
    cy.wrap(clickCallback).should('be.called');
  });
});
