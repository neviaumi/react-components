import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './Image.stories.tsx';

const { ImagePreviewWhenFileUpload } = composeStories(stories);

describe('ImagePreviewWhenFileUpload stories', () => {
  function setupTest(args: any = {}) {
    cy.mount(
      <ImagePreviewWhenFileUpload
        data-testid={'test-image-preview'}
        {...args}
      />,
    );

    cy.fixture('example.png').as('testUploadFixture');

    cy.findByTestId('test-image-preview-raw-upload-input').selectFile(
      '@testUploadFixture',
      { force: true },
    );

    cy.findByRole('img', { name: 'example.png', timeout: 10000 }).should(
      'be.visible',
    );
  }
  it('extra class should able to pass into root from props', () => {
    setupTest({ className: 'tw-w-full' });
    cy.findByRole('img', { name: 'example.png' }).should(
      'have.class',
      'tw-w-full',
    );
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    setupTest({ className: 'tw-w-full', disableDefaultClasses: true });
    cy.findByRole('img', { name: 'example.png' }).should(
      'have.attr',
      'class',
      'tw-border-2 tw-w-[640px] tw-h-[480px] tw-w-full',
    );
  });
});
