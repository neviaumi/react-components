import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './NumberInput.stories.tsx';

const { NumberInput } = composeStories(stories);

describe('NumberInput stories', () => {
  it('extra class should able to pass into root from props', () => {
    cy.mount(
      <NumberInput
        className={'tw-font-bold'}
        data-testid={'test-number-input'}
      />,
    );
    cy.findByTestId('test-number-input').should('have.class', 'tw-font-bold');
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <NumberInput
        className={'tw-font-bold'}
        data-testid={'test-number-input'}
        disableDefaultClasses
      />,
    );
    cy.findByTestId('test-number-input').should(
      'have.attr',
      'class',
      'MuiInput-root tw-font-bold',
    );
  });
});
