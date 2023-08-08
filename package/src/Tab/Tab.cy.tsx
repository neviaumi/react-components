import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './Tab.stories.tsx';

const { TabStory } = composeStories(stories);

describe('TabStory', () => {
  it('Should navigate when click tab', () => {
    cy.mount(<TabStory />);
    function checkTab(index: number) {
      cy.findByTestId(`test-tab-panel-${index}`).should('be.visible');
      cy.findByTestId(`test-tab-${index}`).should(
        'have.attr',
        'aria-selected',
        'true',
      );
    }
    checkTab(0);
    cy.findByTestId(`test-tab-1`).click();
    checkTab(1);
    cy.findByTestId(`test-tab-2`).click();
    checkTab(2);
  });
});
