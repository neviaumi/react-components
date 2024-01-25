import { cy, describe, expect, it } from '@busybox/cypress';
import clsx from 'clsx';
import { useState } from 'react';

import { Field } from '../Form/Field.tsx';
import { Label } from '../Form/Label.tsx';
import { Select, SelectOption } from './Select.tsx';

describe('ref Prop', () => {
  it('ref should linked to input element', () => {
    const ref = cy.stub().as('ref');
    cy.mount(
      <Select data-testid={'test-select'} name={'demo'} ref={ref}>
        <SelectOption value={'Toyota'}>Toyota</SelectOption>
        <SelectOption value={'BMW'}>BMW</SelectOption>
        <SelectOption value={'Mini'}>Mini</SelectOption>
      </Select>,
    );
    cy.get('@ref').should('be.calledOnce');
    cy.get<typeof ref>('@ref').then(spy => {
      const [ele] = spy.firstCall.args;
      expect(ele).to.be.instanceOf(HTMLInputElement);
    });
  });
});

describe('Select', () => {
  it('should render hidden input with name', () => {
    cy.mount(
      <Select data-testid={'test-select'} name={'demo'}>
        <SelectOption value={'Toyota'}>Toyota</SelectOption>
        <SelectOption value={'BMW'}>BMW</SelectOption>
        <SelectOption value={'Mini'}>Mini</SelectOption>
      </Select>,
    );
    cy.get('input').should('have.attr', 'name', 'demo');
  });
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

  it.only('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <Select
        className={'tw-px-2 tw-py-1'}
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
    cy.findByTestId('test-select').then($el => {
      const classes = $el.attr('class')?.split(' ');
      cy.wrap(classes).should('have.length', 3);
      cy.wrap(classes?.slice(1)).should('deep.equal', ['tw-px-2', 'tw-py-1']);
    });
    cy.findByTestId('test-select').click();
    cy.findByTestId('test-select-option-1').then($el => {
      const classes = $el.attr('class')?.split(' ');
      cy.wrap(classes).should('have.length', 3);
      cy.wrap(classes?.slice(2)).should('deep.equal', ['tw-font-bold']);
    });
  });
});

describe('Select with Field', () => {
  it('should read value from field context', () => {
    cy.mount(
      <Field name={'carBand'} value={'BMW'}>
        <Label>Car band</Label>
        <Select data-testid={'test-select'}>
          <SelectOption value={'Toyota'}>Toyota</SelectOption>
          <SelectOption value={'BMW'}>BMW</SelectOption>
          <SelectOption value={'Mini'}>Mini</SelectOption>
        </Select>
      </Field>,
    );
    cy.findByTestId('test-select').should('have.text', 'BMW');
  });

  it('should read input name from field context', () => {
    cy.mount(
      <Field name={'carBand'} value={'BMW'}>
        <Label>Car band</Label>
        <Select data-testid={'test-select'}>
          <SelectOption value={'Toyota'}>Toyota</SelectOption>
          <SelectOption value={'BMW'}>BMW</SelectOption>
          <SelectOption value={'Mini'}>Mini</SelectOption>
        </Select>
      </Field>,
    );
    cy.findByRole('textbox', {
      hidden: true,
    }).should('have.attr', 'name', 'carBand');
  });

  it('should reflect label value as button aria name ', () => {
    function SelectWithLabelAndOnChange() {
      const [value, setValue] = useState('BMW');
      return (
        <Field
          name={'carBand'}
          onChange={e => setValue(e.target.value)}
          value={value}
        >
          <Label>Car band</Label>
          <Select data-testid={'test-select'}>
            <SelectOption value={'Toyota'}>Toyota</SelectOption>
            <SelectOption value={'BMW'}>BMW</SelectOption>
            <SelectOption value={'Mini'}>Mini</SelectOption>
          </Select>
        </Field>
      );
    }
    cy.mount(<SelectWithLabelAndOnChange />);
    cy.findByRole('combobox', {
      name: 'Car band',
    }).click();
    cy.findByRole('listbox', {
      name: 'carBand options',
    })
      .should('be.visible')
      .within(() => {
        cy.findByRole('option', {
          name: 'Toyota',
        }).click();
      });
    cy.findByRole('combobox', {
      name: 'Car band',
    }).should('have.text', 'Toyota');
  });
});
