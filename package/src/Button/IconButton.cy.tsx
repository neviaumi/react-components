import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './IconButton.stories.tsx';

const { IconButton } = composeStories(stories);

describe('Icon Button stories', () => {
  it('extra class should able to pass into root from props', () => {
    cy.mount(
      <IconButton
        className={'tw-font-bold'}
        data-testid={'test-primary-button'}
      >
        Primary button test
      </IconButton>,
    );
    cy.findAllByTestId('test-primary-button').should(
      'have.class',
      'tw-font-bold',
    );
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <IconButton
        className={'tw-font-bold'}
        data-testid={'test-primary-button'}
        disableDefaultClasses
      >
        Primary button test
      </IconButton>,
    );
    cy.findAllByTestId('test-primary-button').should(
      'have.attr',
      'class',
      'MuiButton-root tw-font-bold',
    );
  });
});
