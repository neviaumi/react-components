import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './FileUploadInput.stories.tsx';

const { FileUploadInput } = composeStories(stories);

describe('FileUploadInput stories', () => {
  it('Should trigger onChange when selected file to upload', () => {
    const fileUploadCallback = cy.stub().as('fileUploadCallback');
    cy.mount(
      <FileUploadInput
        data-testid={'test-file-upload'}
        onChange={fileUploadCallback}
      >
        File upload test
      </FileUploadInput>,
    );

    cy.fixture('example.json').as('testUploadFixture');

    cy.findByTestId('test-file-upload-raw-upload-input').selectFile(
      '@testUploadFixture',
      { force: true },
    );
    cy.wrap(fileUploadCallback).should('be.called');
  });

  it.skip('Should trigger onChange when click upload file button', () => {
    // I can't test that behavior on Cypress
    const fileUploadCallback = cy.stub().as('fileUploadCallback');
    cy.mount(
      <FileUploadInput
        data-testid={'test-file-upload'}
        onChange={fileUploadCallback}
      >
        File upload test
      </FileUploadInput>,
    );

    cy.findByTestId('test-file-upload').click();
    cy.wrap(fileUploadCallback).should('be.called');
  });
});
