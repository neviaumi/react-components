import type { Meta, StoryObj } from '@storybook/react';

import FractionNumberDisplayComponent from './FractionNumberDisplay';

const meta: Meta<typeof FractionNumberDisplayComponent> = {
  component: FractionNumberDisplayComponent,
  title: 'Component/Display',
};

export default meta;

type Story = StoryObj<typeof FractionNumberDisplayComponent>;

export const FractionNumberDisplay: Story = {
  render: () => {
    return (
      <>
        <FractionNumberDisplayComponent />
        <FractionNumberDisplayComponent denominator={'4'} numerator={'1'} />
        <FractionNumberDisplayComponent
          denominator={'4000'}
          numerator={'1000'}
        />
        <FractionNumberDisplayComponent denominator={'Foo'} numerator={'Bar'} />
      </>
    );
  },
};
