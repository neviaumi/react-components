import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './AudioRecorder.stories.tsx';

const {
  AudioRecorderAndFileUploadWithPreview,
  AudioRecorderProduceAudioBuffer,
} = composeStories(stories);

describe.skip('AudioRecorderAndFileUploadWithPreview stories', () => {
  it('Should show audio control when finish recoding', () => {
    cy.mount(
      <AudioRecorderAndFileUploadWithPreview
        data-testid={'test-audio-recorder'}
      />,
    );
    cy.findByTestId('test-audio-recorder').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.findByTestId('test-audio-recorder').click();
    cy.findByTestId('test-audio-recorder-preview').should('be.visible');
  });
});

describe.skip('AudioRecorderProduceAudioBuffer stories', () => {
  it('Should have audioBuffer when callback', () => {
    const onAudioBufferCalled = cy.stub();
    cy.mount(
      <AudioRecorderProduceAudioBuffer
        data-testid={'test-audio-recorder'}
        onAudioBufferReady={onAudioBufferCalled}
      />,
    );
    cy.findByTestId('test-audio-recorder').click();
    cy.findByTestId('test-audio-recorder').click();
    cy.wrap(onAudioBufferCalled)
      .should('be.called')
      .then(() => {
        const audioBuffer = onAudioBufferCalled.getCall(0).args[0];
        cy.wrap(audioBuffer instanceof AudioBuffer).should('be.true');
      });
  });
});
