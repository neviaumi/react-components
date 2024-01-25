import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './Tab.stories.tsx';
import { Tab, TabPanel, Tabs, TabsList } from './Tab.tsx';

describe('TabStory', () => {
  const { Tabs: TabsStory } = composeStories(stories);

  it('Should navigate when click tab', () => {
    cy.mount(<TabsStory />);
    function checkTab(index: number) {
      cy.findByTestId(`test-tab-panel-${index}`).should('be.visible');
      cy.findByTestId(`test-tab-${index}`).should(
        'have.attr',
        'aria-selected',
        'true',
      );
    }
    checkTab(0);
    cy.findByTestId(`test-tab-1`).click();
    checkTab(1);
    cy.findByTestId(`test-tab-2`).click();
    checkTab(2);
  });
});

describe('Tabs component', () => {
  it('extra class should able to pass into root from props', () => {
    cy.mount(
      <Tabs defaultValue={'0'}>
        <TabsList>
          <Tab
            className={'tw-font-bold'}
            data-testid={'test-tab-0'}
            value={'0'}
          >
            Tab 1
          </Tab>
        </TabsList>
        <TabPanel data-testid={'test-tab-panel-0'} value={'0'}>
          Tab 1 content
        </TabPanel>
      </Tabs>,
    );
    cy.findByTestId('test-tab-0').should('have.class', 'tw-font-bold');
  });
  it('no default class should be applied when disableDefaultClasses used', () => {
    cy.mount(
      <Tabs defaultValue={'0'}>
        <TabsList>
          <Tab
            className={'tw-font-bold'}
            data-testid={'test-tab-0'}
            disableDefaultClasses
            value={'0'}
          >
            Tab 1
          </Tab>
        </TabsList>
        <TabPanel data-testid={'test-tab-panel-0'} value={'0'}>
          Tab 1 content
        </TabPanel>
      </Tabs>,
    );
    cy.findByTestId('test-tab-0').then($el => {
      const classes = $el.attr('class')?.split(' ');
      cy.wrap(classes).should('have.length', 3);
      cy.wrap(classes?.slice(2)).should('deep.equal', ['tw-font-bold']);
    });
  });
});
