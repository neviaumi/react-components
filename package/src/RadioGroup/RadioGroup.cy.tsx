import { cy, describe, it } from '@busybox/cypress';
import { useState } from 'react';

import { Field } from '../Form/Field.tsx';
import { Label } from '../Form/Label.tsx';
import { Radio, RadioGroup } from './RadioGroup.tsx';

describe('RadioGroup', () => {
  describe('Without field context', () => {
    it('select value should able to work without field context', () => {
      function ControlledRadioGroup() {
        const [radioValue, setRadioSelectedValue] = useState('');
        return (
          <RadioGroup
            name={'demo'}
            onChange={e => {
              setRadioSelectedValue(e.target.value);
            }}
            value={radioValue}
          >
            <Radio data-testid={'test-radio-1'} id={'1'} value={'1'}>
              Item 1
            </Radio>
            <Radio id={'2'} value={'2'}>
              Item 2
            </Radio>
            <Radio id={'3'} value={'3'}>
              Item 3
            </Radio>
          </RadioGroup>
        );
      }
      cy.mount(<ControlledRadioGroup />);
      cy.findByTestId('test-radio-1').click();
      cy.findByTestId('test-radio-1').should('have.class', 'tw-bg-primary');
    });
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
  describe('With field context', () => {
    it('name of fieldset should populated from label', () => {
      cy.mount(
        <Field name={'demo'} role={'radiogroup'}>
          <Label>Demo Radio Group</Label>
          <RadioGroup>
            <Radio data-testid={'test-radio'} id={'1'} value={'1'}>
              Item 1
            </Radio>
          </RadioGroup>
        </Field>,
      );
      cy.findByRole('radiogroup', {
        name: 'Demo Radio Group',
      }).should('exist');
    });
    it('name prop specific in Field should take precedence over RadioGroup', () => {
      function ControlledRadioGroup() {
        const [fieldValue, setFieldValue] = useState('');
        return (
          <Field
            name={'demo'}
            onChange={e => setFieldValue(e.target.value)}
            value={fieldValue}
          >
            <RadioGroup name={'demo-2'}>
              <Radio data-testid={'test-radio-1'} id={'1'} value={'1'}>
                Item 1
              </Radio>
              <Radio data-testid={'test-radio-2'} id={'2'} value={'2'}>
                Item 2
              </Radio>
            </RadioGroup>
          </Field>
        );
      }
      cy.mount(<ControlledRadioGroup />);
      cy.findByTestId('test-radio-1-input').should('have.attr', 'name', 'demo');
      cy.findByTestId('test-radio-2-input').should('have.attr', 'name', 'demo');
      cy.findByTestId('test-radio-1').click();
      cy.findByTestId('test-radio-1').should('have.class', 'tw-bg-primary');
    });
  });
});
