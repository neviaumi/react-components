import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './TextInput.stories.tsx';

const { TextInput } = composeStories(stories);

describe('TextInput stories', () => {
  it('extra class should able to pass into root from props', () => {
    cy.mount(
      <TextInput className={'tw-font-bold'} data-testid={'test-text-input'} />,
    );
    cy.findByTestId('test-text-input').should('have.class', 'tw-font-bold');
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <TextInput
        className={'tw-font-bold'}
        data-testid={'test-text-input'}
        disableDefaultClasses
      />,
    );
    cy.findByTestId('test-text-input').should(
      'have.attr',
      'class',
      'MuiInput-root tw-font-bold',
    );
  });
});
