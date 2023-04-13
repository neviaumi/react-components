import type { Meta, StoryObj } from '@storybook/react';

import { Content, Footer, Header, Main, Page } from './LayoutForStories';

const meta: Meta<typeof Page> = {
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Layout/OneColumnLayout',
};

export default meta;

type Story = StoryObj<typeof Page>;

export const OneColumnLayout: Story = {
  render: () => (
    <Page>
      <Header>OneColumnLayout Header</Header>
      <Content>
        <Main className={'tw-h-full'}>OneColumnLayout Main</Main>
      </Content>
      <Footer>OneColumnLayout Footer</Footer>
    </Page>
  ),
};
