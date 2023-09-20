import { cy, describe, it } from '@busybox/cypress';

import { AudioRecorder } from './AudioRecorder.tsx';

describe('AudioRecorder', () => {
  it('extra class should able to pass into root from props', () => {
    cy.mount(
      <AudioRecorder
        className={'tw-font-bold'}
        data-testid={'test-audio-recorder'}
        onStopRecording={cy.stub().as('onStopRecording')}
      />,
    );
    cy.findByTestId('test-audio-recorder').should('have.class', 'tw-font-bold');
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <AudioRecorder
        className={'tw-font-bold'}
        data-testid={'test-audio-recorder'}
        disableDefaultClasses
        onStopRecording={cy.stub().as('onStopRecording')}
      />,
    );
    cy.findByTestId('test-audio-recorder').should(
      'have.attr',
      'class',
      'MuiButton-root tw-font-bold',
    );
  });
});
