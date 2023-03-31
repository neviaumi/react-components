import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/testing-react';

import * as stories from './Image.stories.js';

const { ImagePreviewWhenFileUpload } = composeStories(stories);

describe('ImagePreviewWhenFileUpload stories', () => {
  it('Should show image when selected file to upload', () => {
    cy.mount(
      <ImagePreviewWhenFileUpload data-testid={'test-file-upload'}>
        File upload test
      </ImagePreviewWhenFileUpload>,
    );

    cy.fixture('example.png').as('testUploadFixture');

    cy.findByTestId('test-file-upload-raw-upload-input').selectFile(
      '@testUploadFixture',
      { force: true },
    );

    cy.findByRole('img', { name: 'example.png' }).should('be.visible');
  });
});
