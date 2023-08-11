import { cy, describe, it } from '@busybox/cypress';

import { Radio, RadioGroup } from './RadioGroup.tsx';

describe('RadioGroup', () => {
  it('extra class should able to pass into root from props', () => {
    cy.mount(
      <RadioGroup
        name={'demo'}
        onChange={() => {
          return;
        }}
      >
        <Radio
          className={'tw-font-bold'}
          data-testid={'test-radio'}
          id={'1'}
          value={'1'}
        >
          Item 1
        </Radio>
      </RadioGroup>,
    );
    cy.findByTestId('test-radio-input').should('have.class', 'tw-font-bold');
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <RadioGroup
        name={'demo'}
        onChange={() => {
          return;
        }}
      >
        <Radio
          className={'tw-font-bold'}
          data-testid={'test-radio'}
          disableDefaultClasses={true}
          id={'1'}
          value={'1'}
        >
          Item 1
        </Radio>
      </RadioGroup>,
    );
    cy.findByTestId('test-radio-input').should(
      'have.attr',
      'class',
      'tw-font-bold',
    );
  });
});
