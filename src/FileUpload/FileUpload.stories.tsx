import type { Meta, StoryObj } from '@storybook/react';

import Label from '../Form/Label.tsx';
import FileUploadComponent from './FileUpload.tsx';

const meta: Meta<typeof FileUploadComponent> = {
  component: FileUploadComponent,
  title: 'Component/Form/FileUpload',
};

export default meta;

type Story = StoryObj<typeof FileUploadComponent>;

export const FileUpload: Story = {
  args: {
    children: 'Click to Upload',
  },
  render: ({ children, 'data-testid': testId, ...rest }) => (
    <>
      <Label>Click toUpload File</Label>
      <FileUploadComponent data-testid={testId} {...rest}>
        {children}
      </FileUploadComponent>
    </>
  ),
};
