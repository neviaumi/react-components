import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import { Field } from '../Form/Field.tsx';
import { Label } from '../Form/Label.tsx';
import * as stories from './DateInput.stories.tsx';

const { DateInput: DateInputStories } = composeStories(stories);

describe('DateInput', () => {
  describe('With field context', () => {
    it('should able to locate by label content ', () => {
      cy.mount(
        <Field name={'demo-date'}>
          <Label>Test Date</Label>
          <DateInputStories data-testid={'test-date-input'} />
        </Field>,
      );
      cy.findByLabelText('Test Date').should('have.attr', 'name', 'demo-date');
    });
    it('should able to render with name that reflected from field context', () => {
      cy.mount(
        <Field name={'demo-date'}>
          <DateInputStories data-testid={'test-date-input'} />
        </Field>,
      );
      cy.findByTestId('test-date-input').within(() =>
        cy.get('input').should('have.attr', 'name', 'demo-date'),
      );
    });
  });
  describe('Without field context', () => {
    it('should able to render without field context', () => {
      cy.mount(
        <DateInputStories data-testid={'test-date-input'} name={'demo-date'} />,
      );
      cy.findByTestId('test-date-input').within(() =>
        cy.get('input').should('have.attr', 'name', 'demo-date'),
      );
    });
    it('extra class should able to pass into root from props', () => {
      cy.mount(
        <DateInputStories
          className={'tw-font-bold'}
          data-testid={'test-date-input'}
        />,
      );
      cy.findByTestId('test-date-input').should('have.class', 'tw-font-bold');
    });

    it('no default class should be applied when disableDefaultClasses used', () => {
      cy.mount(
        <DateInputStories
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
});
