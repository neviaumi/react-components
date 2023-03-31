import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Content, Footer, Header, Main, Page, Side } from './LayoutForStories';

export default {
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
  subcomponents: { Footer, Header, Main, Side },
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Layout/TwoColumnLayout',
} as ComponentMeta<typeof Page>;

export const Horizontal: ComponentStory<typeof Page> = () => (
  <Page>
    <Header>TwoColumnLayout Header</Header>
    <Content className={'tw-flex'}>
      <Main className={'tw-w-2/3'}>TwoColumnLayout Main</Main>
      <Side className={'tw-w-1/3'}>TwoColumnLayout Side</Side>
    </Content>
    <Footer>TwoColumnLayout Footer</Footer>
  </Page>
);

export const HorizontalWithTwoVerticalSide: ComponentStory<
  typeof Page
> = () => (
  <Page>
    <Header>TwoColumnLayout Header</Header>
    <Content className={'tw-flex'}>
      <Main className={'tw-w-2/3'}>TwoColumnLayout Main</Main>
      <Side className={'tw-flex tw-w-1/3 tw-flex-col'}>
        <Side className={'tw-h-1/2 tw-w-full'}>TwoColumnLayout Side 1</Side>
        <Side className={'tw-h-1/2 tw-w-full'}>TwoColumnLayout Side 2</Side>
      </Side>
    </Content>
    <Footer>TwoColumnLayout Footer</Footer>
  </Page>
);

export const HorizontalWithTwoHorizontalSide: ComponentStory<
  typeof Page
> = () => (
  <Page>
    <Header>TwoColumnLayout Header</Header>
    <Content className={'tw-flex'}>
      <Main className={'tw-w-2/3'}>TwoColumnLayout Main</Main>
      <Side className={'tw-flex tw-w-1/3'}>
        <Side className={'tw-h-full tw-w-1/2'}>TwoColumnLayout Side 1</Side>
        <Side className={'tw-h-full tw-w-1/2'}>TwoColumnLayout Side 2</Side>
      </Side>
    </Content>
    <Footer>TwoColumnLayout Footer</Footer>
  </Page>
);

export const HorizontalWithInlineVertical: ComponentStory<typeof Page> = () => (
  <Page>
    <Header>TwoColumnLayout Header</Header>
    <Content className={'tw-flex'}>
      <Side className={'tw-h-full tw-w-1/3'}>TwoColumnLayout Side 1</Side>
      <div className={'tw-flex tw-w-2/3 tw-flex-col'}>
        <Main className={'tw-h-1/2'}>TwoColumnLayout Main</Main>
        <Side className={'tw-h-1/2'}>TwoColumnLayout Side 2</Side>
      </div>
    </Content>
    <Footer>TwoColumnLayout Footer</Footer>
  </Page>
);

export const Vertical: ComponentStory<typeof Page> = () => (
  <Page>
    <Header>TwoColumnLayout Header</Header>
    <Content className={'tw-flex tw-flex-col'}>
      <Main className={'tw-h-2/3'}>TwoColumnLayout Main</Main>
      <Side className={'tw-h-1/3'}>TwoColumnLayout Side</Side>
    </Content>
    <Footer>TwoColumnLayout Footer</Footer>
  </Page>
);

export const VerticalWithTwoHorizontalSide: ComponentStory<
  typeof Page
> = () => (
  <Page>
    <Header>TwoColumnLayout Header</Header>
    <Content className={'tw-flex tw-flex-col'}>
      <Main className={'tw-h-2/3'}>TwoColumnLayout Main</Main>
      <Side className={'tw-flex tw-h-1/3'}>
        <Side className={'tw-h-full tw-w-1/2'}>TwoColumnLayout Side 1</Side>
        <Side className={'tw-h-full tw-w-1/2'}>TwoColumnLayout Side 2</Side>
      </Side>
    </Content>
    <Footer>TwoColumnLayout Footer</Footer>
  </Page>
);

export const VerticalWithInlineHorizontal: ComponentStory<typeof Page> = () => (
  <Page>
    <Header>TwoColumnLayout Header</Header>
    <Content className={'tw-flex tw-flex-col'}>
      <div className={'tw-flex tw-h-2/3'}>
        <Main className={'tw-w-2/3'}>TwoColumnLayout Main</Main>
        <Side className={'tw-w-1/3'}>TwoColumnLayout Side 1</Side>
      </div>
      <Side className={'tw-h-1/3'}>TwoColumnLayout Side 2</Side>
    </Content>
    <Footer>TwoColumnLayout Footer</Footer>
  </Page>
);
