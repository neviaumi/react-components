import type { Meta, StoryObj } from '@storybook/react';

import { Content, Footer, Header, Main, Page, Side } from './LayoutForStories';

const meta: Meta<typeof Page> = {
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Layout/ThreeColumnLayout',
};

export default meta;

type Story = StoryObj<typeof Page>;

export const MainInCenter: Story = {
  render: () => (
    <Page>
      <Header>TwoColumnLayout Header</Header>
      <Content className={'tw-flex'}>
        <Side className={'tw-w-1/4'}>TwoColumnLayout Side 1</Side>
        <Main className={'tw-w-2/4'}>TwoColumnLayout Main</Main>
        <Side className={'tw-w-1/4'}>TwoColumnLayout Side 2</Side>
      </Content>
      <Footer>TwoColumnLayout Footer</Footer>
    </Page>
  ),
};

export const MainInLeft: Story = {
  render: () => (
    <Page>
      <Header>TwoColumnLayout Header</Header>
      <Content className={'tw-flex'}>
        <Main className={'tw-w-2/4'}>TwoColumnLayout Main</Main>
        <Side className={'tw-w-1/4'}>TwoColumnLayout Side 1</Side>
        <Side className={'tw-w-1/4'}>TwoColumnLayout Side 2</Side>
      </Content>
      <Footer>TwoColumnLayout Footer</Footer>
    </Page>
  ),
};

export const MainInRight: Story = {
  render: () => (
    <Page>
      <Header>TwoColumnLayout Header</Header>
      <Content className={'tw-flex'}>
        <Side className={'tw-w-1/4'}>TwoColumnLayout Side 1</Side>
        <Side className={'tw-w-1/4'}>TwoColumnLayout Side 2</Side>
        <Main className={'tw-w-2/4'}>TwoColumnLayout Main</Main>
      </Content>
      <Footer>TwoColumnLayout Footer</Footer>
    </Page>
  ),
};
