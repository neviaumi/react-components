import type { Meta, StoryObj } from '@storybook/react';

import ListComponent, { ListItem as ListItemComponent } from './List.jsx';

const meta: Meta<typeof ListComponent> = {
  component: ListComponent,
  title: 'Component/Display',
};

export default meta;

type Story = StoryObj<typeof ListComponent>;

export const List: Story = {
  render: () => {
    return (
      <>
        <h1 className={'tw-text-6xl'}>Music Key</h1>
        <ListComponent className={'tw-w-20'}>
          <ListItemComponent>C</ListItemComponent>
          <ListItemComponent>C#</ListItemComponent>
          <ListItemComponent>D</ListItemComponent>
          <ListItemComponent>D#</ListItemComponent>
          <ListItemComponent>E</ListItemComponent>
          <ListItemComponent>F</ListItemComponent>
          <ListItemComponent>F#</ListItemComponent>
          <ListItemComponent>G</ListItemComponent>
          <ListItemComponent>G#</ListItemComponent>
          <ListItemComponent>A</ListItemComponent>
          <ListItemComponent>A#</ListItemComponent>
          <ListItemComponent>B</ListItemComponent>
        </ListComponent>
      </>
    );
  },
};
