import { cy, describe, it } from '@busybox/cypress';

import Slider from './Slider.tsx';

describe('Slider', () => {
  it('extra class should able to pass into root from props', () => {
    cy.mount(<Slider className={'tw-font-bold'} data-testid={'test-slider'} />);
    cy.findByTestId('test-slider').should('have.class', 'tw-font-bold');
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <Slider
        className={'tw-font-bold'}
        data-testid={'test-slider'}
        disableDefaultClasses
      />,
    );
    cy.findByTestId('test-slider').should(
      'have.attr',
      'class',
      'MuiSlider-root tw-font-bold',
    );
  });
});
