import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './Link.stories.tsx';

const { Link } = composeStories(stories);

describe('DateInput stories', () => {
  it('extra class should able to pass into root from props', () => {
    cy.mount(<Link className={'tw-font-bold'} data-testid={'test-link'} />);
    cy.findByTestId('test-link').should('have.class', 'tw-font-bold');
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <Link
        className={'tw-font-bold'}
        data-testid={'test-link'}
        disableDefaultClasses
      />,
    );
    cy.findByTestId('test-link').should('have.attr', 'class', 'tw-font-bold');
  });
});
