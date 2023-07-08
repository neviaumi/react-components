import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';
import { dissocPath, pipe } from 'ramda';

import * as stories from './Form.stories.jsx';

const { CarSearchForm, DriverRegisterForm } = composeStories(stories);

describe('Demo Form stories', () => {
  it('Trigger play function on CarSearchForm', () => {
    cy.mount(<CarSearchForm />);
    cy.getComponentCanvasRoot().then(elementRoot =>
      CarSearchForm.play({ canvasElement: elementRoot[0] }),
    );
  });

  it('should contain search conditions in form when click submit on CarSearchForm', () => {
    cy.mount(<CarSearchForm />);

    cy.findByTestId('form-stories-number-input').type('3');
    cy.findByTestId('form-stories-select-input').click();
    cy.findByTestId('form-stories-select-option-1').click();
    cy.findByTestId('form-stories-radio-input-option-2').click();
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
      cy.wrap(pipe(dissocPath(['rating']))(values)).should('deep.equal', {
        carBrand: 'Toyota',
        doors: '3',
        transmission: 'manual',
      });
      cy.wrap(values.rating).should('be.gte', 0);
    });
  });

  it('should contain driver detail in form when click submit', () => {
    cy.mount(<DriverRegisterForm />);
    cy.fixture('example.png').as('testUploadFixture');
    cy.findByTestId('form-stories-upload-input-raw-upload-input').selectFile(
      '@testUploadFixture',
      { force: true },
    );

    cy.findByTestId('form-stories-submit-button').click();
    cy.findByTestId('form-values').then(ele => {
      const values = JSON.parse(ele.text());
      cy.wrap(pipe(dissocPath(['proofOfAge', 'url']))(values)).should(
        'deep.equal',
        {
          proofOfAge: {
            name: 'example.png',
          },
        },
      );
    });
  });
});
