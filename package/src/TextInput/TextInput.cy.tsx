import { cy, describe, expect, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import { Field } from '../Form/Field.tsx';
import { Label } from '../Form/Label.tsx';
import * as stories from './TextInput.stories.tsx';
import { TextInput } from './TextInput.tsx';

const { TextInput: TextInputStories } = composeStories(stories);

describe('TextInput', () => {
  describe('ref Prop', () => {
    it('ref should linked to input element', () => {
      const ref = cy.stub().as('ref');
      cy.mount(<TextInput ref={ref} />);
      cy.get('@ref').should('be.calledOnce');
      cy.get<typeof ref>('@ref').then(spy => {
        const [ele] = spy.firstCall.args;
        expect(ele).to.be.instanceOf(HTMLInputElement);
      });
    });
  });
  describe('TextInput with Field Context should working good', () => {
    it('create input with field context', () => {
      cy.mount(
        <Field name={'test-input'}>
          <TextInput />
        </Field>,
      );
      cy.findByRole('textbox').should('have.attr', 'name', 'test-input');
    });
    it('create input with field context and label should able locate input by label text', () => {
      cy.mount(
        <Field name={'test-input'}>
          <Label>Test Input</Label>
          <TextInput />
        </Field>,
      );
      cy.findByRole('textbox', {
        name: 'Test Input',
      }).should('have.attr', 'name', 'test-input');
    });
  });

  describe('TextInput stories', () => {
    it('create input without name should work', () => {
      cy.mount(
        <TextInputStories
          className={'tw-font-bold'}
          data-testid={'test-text-input'}
        />,
      );
      cy.findByTestId('test-text-input').should('have.class', 'tw-font-bold');
      cy.findByRole('textbox').should('not.have.attr', 'name');
    });

    it('create input with name should have aria role with name as well.', () => {
      cy.mount(
        <TextInputStories
          className={'tw-font-bold'}
          data-testid={'test-text-input'}
          name={'test-input'}
        />,
      );
      cy.findByTestId('test-text-input').should('have.class', 'tw-font-bold');
      cy.findByRole('textbox').should('have.attr', 'name', 'test-input');
    });

    it('extra class should able to pass into root from props', () => {
      cy.mount(
        <TextInputStories
          className={'tw-font-bold'}
          data-testid={'test-text-input'}
        />,
      );
      cy.findByTestId('test-text-input').should('have.class', 'tw-font-bold');
    });

    it('no default class should be applied when disableDefaultClasses used', () => {
      cy.mount(
        <TextInputStories
          className={'tw-font-bold'}
          data-testid={'test-text-input'}
          disableDefaultClasses
        />,
      );
      cy.findByTestId('test-text-input').then($el => {
        const classes = $el.attr('class')?.split(' ');
        cy.wrap(classes).should('have.length', 2);
        cy.wrap(classes?.slice(1)).should('deep.equal', ['tw-font-bold']);
      });
    });
  });
});
