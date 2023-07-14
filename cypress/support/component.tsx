import './commands.ts';

import { cy, Cypress } from '@busybox/cypress';
import { setProjectAnnotations } from '@storybook/react';
import clsx from 'clsx';
// eslint-disable-next-line n/file-extension-in-import
import { mount } from 'cypress/react18';
import type { PropsWithChildren } from 'react';

import storyBookPreview from '../../.storybook/preview.ts';

setProjectAnnotations(storyBookPreview);

function TestBed(props: PropsWithChildren) {
  // @ts-expect-error https://github.com/cypress-io/cypress/issues/23025
  import('../../.storybook/preview.css');
  return (
    <main>
      <h1
        className={clsx(
          'tw-bg-warning',
          'hover:tw-bg-warning-hover',
          'tw-text-warning',
          'hover:tw-text-warning-hover',
          'tw-mb-1',
          'tw-block',
          'tw-border-b-2',
          'tw-border-warning',
          'hover:tw-border-warning-hover',
          'tw-text-center',
          'tw-text-9xl',
          'tw-font-bold',
        )}
      >
        TestBed
      </h1>
      {props.children}
    </main>
  );
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getComponentCanvasRoot(): Chainable<JQuery<HTMLElement>>;

      mount: typeof mount;
    }
  }
}

// Example use:
// cy.mount(<MyComponent />)
Cypress.Commands.add('mount', element => mount(<TestBed>{element}</TestBed>));

Cypress.Commands.add('getComponentCanvasRoot', () => {
  return cy.get(`div[data-cy-root]`);
});
// Should sync with ./component-index.html
