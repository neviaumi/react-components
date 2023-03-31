import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/testing-react';

import * as stories from './FileUpload.stories.js';

const { FileUpload } = composeStories(stories);

describe('FileUpload stories', () => {
  it('Should trigger onChange when selected file to upload', () => {
    const fileUploadCallback = cy.stub().as('fileUploadCallback');
    cy.mount(
      <FileUpload
        data-testid={'test-file-upload'}
        onChange={fileUploadCallback}
      >
        File upload test
      </FileUpload>,
    );

    cy.fixture('example.json').as('testUploadFixture');

    cy.findByTestId('test-file-upload-raw-upload-input').selectFile(
      '@testUploadFixture',
      { force: true },
    );
    cy.wrap(fileUploadCallback).should('be.called');
  });

  it.skip('Should trigger onChange when click upload file', () => {
    // I can't test that behavior on Cypress
    const fileUploadCallback = cy.stub().as('fileUploadCallback');
    cy.mount(
      <FileUpload
        data-testid={'test-file-upload'}
        onChange={fileUploadCallback}
      >
        File upload test
      </FileUpload>,
    );

    cy.findByTestId('test-file-upload').click();
    cy.wrap(fileUploadCallback).should('be.called');
  });
});
