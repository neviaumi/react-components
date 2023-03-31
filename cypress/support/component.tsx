import './commands.js';

import { cy, Cypress } from '@busybox/cypress';
import { setGlobalConfig } from '@storybook/testing-react';
import { mount } from 'cypress/react18';
import type { PropsWithChildren } from 'react';

import * as globalStorybookConfig from '../../.storybook/preview.js';

setGlobalConfig(globalStorybookConfig);

function TestBed(props: PropsWithChildren) {
  // @ts-expect-error https://github.com/cypress-io/cypress/issues/23025
  import('../../.storybook/preview.css');
  return (
    <main>
      <h1
        className={
          'tw-mb-1 tw-block tw-border-b-2 tw-border-red-400 tw-bg-blue-100 tw-text-center tw-text-9xl' +
          ' tw-font-bold tw-text-gray-600'
        }
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
