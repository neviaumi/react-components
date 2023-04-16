import { cy, describe, it } from '@busybox/cypress';
import { composeStories } from '@storybook/react';

import * as stories from './Form.stories.js';

const { ReactHookForm } = composeStories(stories);

describe('ReactHookForm stories', () => {
  it('Trigger play function', () => {
    cy.mount(<ReactHookForm />);
    cy.getComponentCanvasRoot().then(elementRoot =>
      ReactHookForm.play({ canvasElement: elementRoot[0] }),
    );
  });
});
