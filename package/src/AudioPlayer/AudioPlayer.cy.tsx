import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './AudioPlayer.stories.tsx';

const { AudioPreviewWithFileUpload } = composeStories(stories);

describe('AudioPreviewWhenFileUpload stories', () => {
  function setupTest(args: any = {}) {
    cy.mount(
      <AudioPreviewWithFileUpload data-testid={'test-audio-preview'} {...args}>
        Audio File upload test
      </AudioPreviewWithFileUpload>,
    );

    cy.fixture('sunshine-of-your-love.mp3').as('testUploadFixture');

    cy.findByTestId('test-audio-preview-raw-upload-input').selectFile(
      '@testUploadFixture',
      { force: true },
    );

    cy.findByTestId('test-audio-preview-audio-controls').should('be.visible');
  }

  it('extra class should able to pass into root from props', () => {
    setupTest({ className: 'tw-w-full' });
    cy.findByTestId('test-audio-preview-audio-controls').should(
      'have.class',
      'tw-w-full',
    );
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    setupTest({ className: 'tw-w-full', disableDefaultClasses: true });
    cy.findByTestId('test-audio-preview-audio-controls').then($el => {
      const classes = $el.attr('class')?.split(' ');
      cy.wrap(classes).should('have.length', 1);
      cy.wrap(classes).should('deep.equal', ['tw-w-full']);
    });
  });
});
