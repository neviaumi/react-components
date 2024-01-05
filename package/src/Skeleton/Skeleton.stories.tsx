import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton as SkeletonComponent } from './Skeleton.tsx';

const meta: Meta<typeof SkeletonComponent> = {
  component: SkeletonComponent,
  title: 'Component/Skeleton',
};

export default meta;

type Story = StoryObj<typeof SkeletonComponent>;

export const Skeleton: Story = {
  render: () => {
    return <SkeletonComponent className={'tw-h-5 tw-w-10'} />;
  },
};
