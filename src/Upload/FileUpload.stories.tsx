import type { Meta, StoryObj } from '@storybook/react';

import FileUploadComponent from './FileUpload.js';

export default {
  component: FileUploadComponent,
  title: 'Component/FileUpload',
} as Meta<typeof FileUploadComponent>;

export const FileUpload: StoryObj<typeof FileUploadComponent> = {
  args: {
    children: 'Click to Upload',
  },
  render: ({ children, ...rest }) => (
    <FileUploadComponent {...rest}>{children}</FileUploadComponent>
  ),
};
