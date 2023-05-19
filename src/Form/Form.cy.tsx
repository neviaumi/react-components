import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';
import { dissocPath, pipe } from 'ramda';

import * as stories from './Form.stories.jsx';

const { ReactHookForm } = composeStories(stories);

describe('ReactHookForm stories', () => {
  it('Trigger play function', () => {
    cy.mount(<ReactHookForm />);
    cy.getComponentCanvasRoot().then(elementRoot =>
      ReactHookForm.play({ canvasElement: elementRoot[0] }),
    );
  });

  it.only('should contain values in form when click submit', () => {
    cy.mount(<ReactHookForm />);
    cy.fixture('example.png').as('testUploadFixture');

    cy.findByTestId('form-stories-number-input').type('20');
    cy.findByTestId('form-stories-upload-input-raw-upload-input').selectFile(
      '@testUploadFixture',
      { force: true },
    );
    cy.findByTestId('form-stories-slider-input')
      .as('sliderInput')
      .then(ele => {
        const currentLocation = ele.position();
        cy.get('@sliderInput').click(
          currentLocation.top + 100,
          currentLocation.left,
          { force: true },
        );
      });

    cy.findByTestId('form-stories-submit-button').click();
    cy.findByTestId('form-values').then(ele => {
      const values = JSON.parse(ele.text());

      cy.wrap(
        pipe(dissocPath(['proofOfAge', 'url']), dissocPath(['rating']))(values),
      ).should('deep.equal', {
        height: '20',
        proofOfAge: {
          name: 'example.png',
        },
      });
      cy.wrap(values.rating).should('be.gte', 0);
    });
  });
});
