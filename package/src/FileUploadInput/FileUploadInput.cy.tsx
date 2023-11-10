import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import { Field } from '../Form/Field.tsx';
import { Label } from '../Form/Label.tsx';
import * as stories from './FileUploadInput.stories.tsx';
import { FileUploadInput } from './FileUploadInput.tsx';

const { FileUploadInput: FileUploadInputStories } = composeStories(stories);

describe('FileUploadInput', () => {
  describe('With FieldContext', () => {
    it('Should able to relocate input by label content', () => {
      cy.mount(
        <Field name={'test-file-upload'}>
          <Label>File upload</Label>
          <FileUploadInput data-testid={'test-file-upload'}>
            Click to Upload
          </FileUploadInput>
        </Field>,
      );
      cy.findByLabelText('File upload').should(
        'have.attr',
        'name',
        'test-file-upload',
      );
    });
    it('Should render input with name', () => {
      cy.mount(
        <Field name={'test-file-upload'}>
          <FileUploadInput data-testid={'test-file-upload'}>
            Click to Upload
          </FileUploadInput>
        </Field>,
      );
      cy.findByTestId('test-file-upload-raw-upload-input').should(
        'have.attr',
        'name',
        'test-file-upload',
      );
    });
  });
  describe('Without FieldContext', () => {
    it('Should trigger onChange when selected file to upload', () => {
      const fileUploadCallback = cy.stub().as('fileUploadCallback');
      cy.mount(
        <FileUploadInputStories
          data-testid={'test-file-upload'}
          onChange={fileUploadCallback}
        >
          File upload test
        </FileUploadInputStories>,
      );

      cy.fixture('example.json').as('testUploadFixture');

      cy.findByTestId('test-file-upload-raw-upload-input').selectFile(
        '@testUploadFixture',
        { force: true },
      );
      cy.wrap(fileUploadCallback).should('be.called');
    });

    it('extra class should able to pass into root from props', () => {
      cy.mount(
        <FileUploadInputStories
          className={'tw-font-bold'}
          data-testid={'test-file-upload'}
        />,
      );
      cy.findByTestId('test-file-upload').should('have.class', 'tw-font-bold');
    });

    it('no default class should be applied when disableDefaultClasses used', () => {
      cy.mount(
        <FileUploadInputStories
          className={'tw-font-bold'}
          data-testid={'test-file-upload'}
          disableDefaultClasses
        />,
      );
      cy.findByTestId('test-file-upload').should(
        'have.attr',
        'class',
        'MuiButton-root tw-font-bold',
      );
    });

    it.skip('Should trigger onChange when click upload file button', () => {
      // I can't test that behavior on Cypress
      const fileUploadCallback = cy.stub().as('fileUploadCallback');
      cy.mount(
        <FileUploadInputStories
          data-testid={'test-file-upload'}
          onChange={fileUploadCallback}
        >
          File upload test
        </FileUploadInputStories>,
      );

      cy.findByTestId('test-file-upload').click();
      cy.wrap(fileUploadCallback).should('be.called');
    });
  });
});
