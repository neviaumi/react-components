import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Content, Footer, Header, Main, Page } from './LayoutForStories';

export default {
  component: Page,
  parameters: {
    layout: 'fullscreen',
  },
  subcomponents: { Footer, Header, Main },
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Layout/OneColumnLayout',
} as ComponentMeta<typeof Page>;

export const OneColumnLayout: ComponentStory<typeof Page> = () => (
  <Page>
    <Header>OneColumnLayout Header</Header>
    <Content>
      <Main className={'tw-h-full'}>OneColumnLayout Main</Main>
    </Content>
    <Footer>OneColumnLayout Footer</Footer>
  </Page>
);
