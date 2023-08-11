import { cy, describe, it } from '@busybox/cypress';

import { Card, CardTitle } from './Card.tsx';

describe('Card stories', () => {
  it('extra class should able to pass into root from props', () => {
    cy.mount(
      <Card className={'tw-font-bold'} data-testid={'test-card'}>
        <CardTitle
          className={'tw-text-9xl'}
          data-testid={'test-card-title'}
          slot={{ root: 'h1' }}
        >
          Card Header
        </CardTitle>
        <section>Card Body</section>
      </Card>,
    );
    cy.findByTestId('test-card').should('have.class', 'tw-font-bold');
    cy.findByTestId('test-card-title').should('have.class', 'tw-text-9xl');
  });

  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <Card
        className={'tw-font-bold'}
        data-testid={'test-card'}
        disableDefaultClasses
      >
        <CardTitle
          className={'tw-text-9xl'}
          data-testid={'test-card-title'}
          disableDefaultClasses
          slot={{ root: 'h1' }}
        >
          Card Header
        </CardTitle>
        <section>Card Body</section>
      </Card>,
    );
    cy.findByTestId('test-card').should('have.attr', 'class', 'tw-font-bold');
    cy.findByTestId('test-card-title').should(
      'have.attr',
      'class',
      'tw-text-9xl',
    );
  });

  it('Card title can replace with custom component though slot prop', () => {
    function Title(props: any) {
      return <div {...props} data-testid={'test-card-custom-title'} />;
    }
    cy.mount(
      <Card
        className={'tw-font-bold'}
        data-testid={'test-card'}
        disableDefaultClasses
      >
        <CardTitle
          className={'tw-text-9xl'}
          data-testid={'test-card-title'}
          disableDefaultClasses
          slot={{ root: Title }}
        >
          Card Header
        </CardTitle>
        <section>Card Body</section>
      </Card>,
    );
    cy.findByTestId('test-card').should('have.attr', 'class', 'tw-font-bold');
    cy.findByTestId('test-card-custom-title').should(
      'have.attr',
      'class',
      'tw-text-9xl',
    );
  });
});
