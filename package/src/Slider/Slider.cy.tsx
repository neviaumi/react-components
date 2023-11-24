import { cy, describe, expect, it } from '@busybox/cypress';

import { Field } from '../Form/Field.tsx';
import { Label } from '../Form/Label.tsx';
import { Slider } from './Slider.tsx';

describe('Slider', () => {
  describe('ref Prop', () => {
    it('ref should linked to input element', () => {
      const ref = cy.stub().as('ref');
      cy.mount(<Slider ref={ref} />);
      cy.get('@ref').should('be.calledOnce');
      cy.get<typeof ref>('@ref').then(spy => {
        const [ele] = spy.firstCall.args;
        expect(ele).to.be.instanceOf(HTMLInputElement);
      });
    });
  });
  describe('With field Context', () => {
    it('create slider with field then the name should bubble down to it', () => {
      cy.mount(
        <Field name={'test-slider'}>
          <Slider className={'tw-font-bold'} data-testid={'test-slider'} />
        </Field>,
      );
      cy.findByTestId('test-slider')
        .findByRole('slider', {
          hidden: true,
        })
        .should('have.attr', 'name', 'test-slider');
    });

    it('create slider with field and label then the aria-name should bubble down to it', () => {
      cy.mount(
        <Field name={'test-slider'}>
          <Label>Test Slider</Label>
          <Slider className={'tw-font-bold'} data-testid={'test-slider'} />
        </Field>,
      );
      cy.findByTestId('test-slider')
        .findByRole('slider', {
          hidden: true,
          name: 'Test Slider',
        })
        .should('have.attr', 'name', 'test-slider');
    });
  });

  describe('Without field Context', () => {
    it('create slider with name should attached to hidden input', () => {
      cy.mount(
        <Slider
          className={'tw-font-bold'}
          data-testid={'test-slider'}
          name={'test-slider'}
        />,
      );
      cy.findByTestId('test-slider').should('have.class', 'tw-font-bold');
      cy.findByTestId('test-slider')
        .findByRole('slider', {
          hidden: true,
        })
        .should('have.attr', 'name', 'test-slider');
    });

    it('create slider without name should work', () => {
      cy.mount(
        <Slider className={'tw-font-bold'} data-testid={'test-slider'} />,
      );
      cy.findByTestId('test-slider').should('have.class', 'tw-font-bold');
      cy.findByTestId('test-slider')
        .findByRole('slider', {
          hidden: true,
        })
        .should('not.have.attr', 'name');
    });
    it('extra class should able to pass into root from props', () => {
      cy.mount(
        <Slider className={'tw-font-bold'} data-testid={'test-slider'} />,
      );
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
});
