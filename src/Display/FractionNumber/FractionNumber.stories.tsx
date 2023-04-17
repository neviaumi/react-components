import type { Meta, StoryObj } from '@storybook/react';

import FractionNumberComponent from './FractionNumber';

const meta: Meta<typeof FractionNumberComponent> = {
  component: FractionNumberComponent,
  title: 'Component/Display',
};

export default meta;

type Story = StoryObj<typeof FractionNumberComponent>;

export const FractionNumber: Story = {
  render: () => {
    return (
      <>
        <FractionNumberComponent />
        <FractionNumberComponent denominator={'4'} numerator={'1'} />
        <FractionNumberComponent denominator={'4000'} numerator={'1000'} />
        <FractionNumberComponent denominator={'Foo'} numerator={'Bar'} />
      </>
    );
  },
};
