import { cy, describe, it } from '@busybox/cypress';
import clsx from 'clsx';

import { Select, SelectOption } from './Select.tsx';

describe('Select', () => {
  it('extra class should able to pass into root from props', () => {
    cy.mount(
      <Select
        className={'tw-font-bold'}
        data-testid={'test-select'}
        name={'demo'}
        onChange={() => {
          return;
        }}
      >
        <SelectOption
          className={'tw-font-bold'}
          data-testid={'test-select-option-1'}
          value={'Toyota'}
        >
          Toyota
        </SelectOption>
        <SelectOption
          className={'tw-font-bold'}
          data-testid={'test-select-option-2'}
          value={'BMW'}
        >
          BMW
        </SelectOption>
        <SelectOption
          className={'tw-font-bold'}
          data-testid={'test-select-option-3'}
          value={'Mini'}
        >
          Mini
        </SelectOption>
      </Select>,
    );
    cy.findByTestId('test-select').should('have.class', 'tw-font-bold');
    cy.findByTestId('test-select').click();
    cy.findByTestId('test-select-option-1').should(
      'have.class',
      'tw-font-bold',
    );
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <Select
        className={'tw-font-bold'}
        data-testid={'test-select'}
        disableDefaultClasses
        name={'demo'}
        onChange={() => {
          return;
        }}
        slotProps={{
          listbox: {
            className: clsx(
              'tw-m-0 tw-mt-1 tw-flex tw-flex-col tw-border-2 tw-border-primary tw-pt-0.5',
            ),
          },
          popper: { className: clsx('tw-z-10') },
          root: {
            className: clsx('tw-px-2 tw-py-1'),
          },
        }}
      >
        <SelectOption
          className={'tw-font-bold'}
          data-testid={'test-select-option-1'}
          disableDefaultClasses
          value={'Toyota'}
        >
          Toyota
        </SelectOption>
        <SelectOption
          className={'tw-font-bold'}
          data-testid={'test-select-option-2'}
          disableDefaultClasses
          value={'BMW'}
        >
          BMW
        </SelectOption>
        <SelectOption
          className={'tw-font-bold'}
          data-testid={'test-select-option-3'}
          disableDefaultClasses
          value={'Mini'}
        >
          Mini
        </SelectOption>
      </Select>,
    );
    cy.findByTestId('test-select').should(
      'have.attr',
      'class',
      'MuiSelect-root tw-px-2 tw-py-1 tw-font-bold tw-px-2 tw-py-1',
    );
    cy.findByTestId('test-select').click();
    cy.findByTestId('test-select-option-1').should(
      'have.attr',
      'class',
      'MuiOption-root MuiOption-highlighted tw-font-bold',
    );
  });
});