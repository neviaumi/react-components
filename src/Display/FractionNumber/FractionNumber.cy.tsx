import { cy, describe, it } from '@busybox/cypress';

import FractionNumber from './FractionNumber';

describe('FractionNumber', () => {
  [
    {
      denominator: '4',
      numerator: '1',
    },
    {
      denominator: '4000',
      numerator: '1000',
    },
    {
      denominator: undefined,
      numerator: undefined,
    },
  ].forEach(({ denominator, numerator }) =>
    it(`Display given value when ${numerator}/${denominator}`, () => {
      cy.mount(
        <FractionNumber
          denominator={denominator}
          numerator={numerator}
          slotProps={{
            denominator: { 'data-testid': 'test-denominator' },
            numerator: {
              'data-testid': 'test-numerator',
            },
          }}
        />,
      );

      cy.findByTestId('test-numerator').should(
        'have.text',
        numerator === undefined ? 'N/A' : numerator,
      );
      cy.findByTestId('test-denominator').should(
        'have.text',
        denominator === undefined ? 'N/A' : denominator,
      );
    }),
  );
});
