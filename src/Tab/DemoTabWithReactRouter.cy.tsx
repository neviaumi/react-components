import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './DemoTabWithReactRouter.stories.tsx';

const { DemoTabStory } = composeStories(stories);

describe('Demo tab with React Router stories', () => {
  it('Trigger play function on Demo Story', () => {
    cy.mount(<DemoTabStory />);
    cy.getComponentCanvasRoot().then(elementRoot =>
      DemoTabStory.play({ canvasElement: elementRoot[0] }),
    );
  });
});
