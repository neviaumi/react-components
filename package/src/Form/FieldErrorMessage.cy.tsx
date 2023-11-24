import { cy, describe, it } from '@busybox/cypress';

import { Field } from './Field.tsx';
import { ErrorLevel } from './FieldError.ts';
import { FieldErrorMessage } from './FieldErrorMessage.tsx';

describe('FieldErrorMessage', () => {
  describe('TextInput with Field Context should working good', () => {
    it('show nothing when field not in error state', () => {
      cy.mount(
        <Field data-testid={'container'} name={'test-input'}>
          <FieldErrorMessage level={ErrorLevel.Warning}>
            Error
          </FieldErrorMessage>
        </Field>,
      );
      cy.findByTestId('container').children().should('have.length', 0);
    });
    it('show error with status role if warning level', () => {
      cy.mount(
        <Field error={true} name={'test-input'}>
          <FieldErrorMessage level={ErrorLevel.Warning}>
            Error
          </FieldErrorMessage>
        </Field>,
      );
      cy.findByRole('status').should('have.text', 'Error');
    });
    it('show error with alert role if error level', () => {
      cy.mount(
        <Field error={true} name={'test-input'}>
          <FieldErrorMessage level={ErrorLevel.Error}>Error</FieldErrorMessage>
        </Field>,
      );
      cy.findByRole('alert').should('have.text', 'Error');
    });
  });

  describe('Without FieldContext', () => {
    it('show nothing when without fieldContext', () => {
      cy.mount(
        <div data-testid={'container'}>
          <FieldErrorMessage level={ErrorLevel.Error}>Error!</FieldErrorMessage>
        </div>,
      );
      cy.findByTestId('container').children().should('have.length', 0);
    });
  });
});
