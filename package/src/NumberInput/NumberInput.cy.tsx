import { cy, describe, expect, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import { Field } from '../Form/Field.tsx';
import { Label } from '../Form/Label.tsx';
import * as stories from './NumberInput.stories.tsx';
import { NumberInput } from './NumberInput.tsx';

const { NumberInput: NumerInputStories } = composeStories(stories);

describe('NumberInput', () => {
  describe('ref Prop', () => {
    it('ref should linked to input element', () => {
      const ref = cy.stub().as('ref');
      cy.mount(<NumberInput ref={ref} />);
      cy.get('@ref').should('be.calledOnce');
      cy.get<typeof ref>('@ref').then(spy => {
        const [ele] = spy.firstCall.args;
        expect(ele).to.be.instanceOf(HTMLInputElement);
      });
    });
  });
  describe('With FieldContext', () => {
    it('input should resolvable by label content', () => {
      cy.mount(
        <Field name={'test-number-input'}>
          <Label>Number Input</Label>
          <NumberInput />
        </Field>,
      );
      cy.findByRole('spinbutton', {
        name: 'Number Input',
      }).should('have.attr', 'name', 'test-number-input');
    });
    it('should render input with name', () => {
      cy.mount(
        <Field name={'test-number-input'}>
          <NumberInput />
        </Field>,
      );
      cy.findByRole('spinbutton').should(
        'have.attr',
        'name',
        'test-number-input',
      );
    });
  });
  describe('Without FieldContext', () => {
    it('should render input with name', () => {
      cy.mount(<NumberInput name="test-number-input" />);
      cy.findByRole('spinbutton').should(
        'have.attr',
        'name',
        'test-number-input',
      );
    });
    it('extra class should able to pass into root from props', () => {
      cy.mount(
        <NumerInputStories
          className={'tw-font-bold'}
          data-testid={'test-number-input'}
        />,
      );
      cy.findByTestId('test-number-input').should('have.class', 'tw-font-bold');
    });

    it('no default class should be applied when disableDefaultClasses used', () => {
      cy.mount(
        <NumerInputStories
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
});
