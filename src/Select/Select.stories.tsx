import type { Meta, StoryObj } from '@storybook/react';

import SelectComponent, { SelectOption } from './Select.jsx';

const meta: Meta<typeof SelectComponent> = {
  component: SelectComponent,
  title: 'Component/Select',
};

export default meta;
type Story = StoryObj<typeof SelectComponent>;
export const Select: Story = {
  render: () => {
    return (
      <>
        <SelectComponent
          data-testid={'select'}
          defaultValue={'Toyota'}
          slotProps={{
            listbox: {
              className: 'tw-w-20',
            },
            root: { className: 'tw-h-5 tw-w-20' },
          }}
        >
          <SelectOption value={'Toyota'}>Toyota</SelectOption>
          <SelectOption value={'BMW'}>BMW</SelectOption>
          <SelectOption value={'Mini'}>Mini</SelectOption>
        </SelectComponent>
      </>
    );
  },
};
