import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './DateInput.stories.tsx';

const { DateInput } = composeStories(stories);

describe('DateInput stories', () => {
  it('extra class should able to pass into root from props', () => {
    cy.mount(
      <DateInput className={'tw-font-bold'} data-testid={'test-date-input'} />,
    );
    cy.findByTestId('test-date-input').should('have.class', 'tw-font-bold');
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <DateInput
        className={'tw-font-bold'}
        data-testid={'test-date-input'}
        disableDefaultClasses
      />,
    );
    cy.findByTestId('test-date-input').should(
      'have.attr',
      'class',
      'MuiInput-root tw-font-bold',
    );
  });
});
