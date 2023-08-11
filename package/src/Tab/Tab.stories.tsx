import type { Meta, StoryObj } from '@storybook/react';

import { Tab, TabPanel, Tabs as TabsComponent, TabsList } from './Tab.tsx';

const meta: Meta<typeof TabsComponent> = {
  component: TabsComponent,
  title: 'Component/Tabs',
};

export default meta;

type Story = StoryObj<typeof TabsComponent>;

export const Tabs: Story = {
  render: () => {
    return (
      <TabsComponent defaultValue={'0'}>
        <TabsList>
          <Tab data-testid={'test-tab-0'} value={'0'}>
            Tab 1
          </Tab>
          <Tab data-testid={'test-tab-1'} value={'1'}>
            Tab 2
          </Tab>
          <Tab data-testid={'test-tab-2'} value={'2'}>
            Tab 3
          </Tab>
        </TabsList>
        <TabPanel data-testid={'test-tab-panel-0'} value={'0'}>
          Tab 1 content
        </TabPanel>
        <TabPanel data-testid={'test-tab-panel-1'} value={'1'}>
          Tab 2 content
        </TabPanel>
        <TabPanel data-testid={'test-tab-panel-2'} value={'2'}>
          Tab 3 content
        </TabPanel>
      </TabsComponent>
    );
  },
};
