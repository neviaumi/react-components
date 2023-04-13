import type { Meta, StoryObj } from '@storybook/react';

import FileUploadComponent from './FileUpload.js';

const meta: Meta<typeof FileUploadComponent> = {
  component: FileUploadComponent,
  title: 'Component/FileUpload',
};

export default meta;

type Story = StoryObj<typeof FileUploadComponent>;

export const FileUpload: Story = {
  args: {
    children: 'Click to Upload',
  },
  render: ({ children, ...rest }) => (
    <FileUploadComponent {...rest}>{children}</FileUploadComponent>
  ),
};
