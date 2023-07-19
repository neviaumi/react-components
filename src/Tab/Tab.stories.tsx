import type { Meta, StoryObj } from '@storybook/react';

import Tabs, { Tab, TabPanel, TabsList } from './Tab.tsx';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Component/Tabs',
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const TabStory: Story = {
  name: 'Tabs',
  render: () => {
    return (
      <Tabs defaultValue={'0'}>
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
      </Tabs>
    );
  },
};
