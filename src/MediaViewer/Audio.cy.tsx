import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/testing-react';

import * as stories from './Audio.stories.js';

const { AudioPreviewWithFileUpload } = composeStories(stories);

describe('AudioPreviewWhenFileUpload stories', () => {
  it('Should show audio control when selected file to upload', () => {
    cy.mount(
      <AudioPreviewWithFileUpload data-testid={'test-file-upload'}>
        Audio File upload test
      </AudioPreviewWithFileUpload>,
    );

    cy.fixture('sunshine-of-your-love.mp3').as('testUploadFixture');

    cy.findByTestId('test-file-upload-raw-upload-input').selectFile(
      '@testUploadFixture',
      { force: true },
    );

    cy.findByTestId('test-file-upload-audio-controls').should('be.visible');
  });
});
