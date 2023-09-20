import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '../Form/Label.tsx';
import { FileUploadInput as FileUploadInputComponent } from './FileUploadInput.tsx';

const meta: Meta<typeof FileUploadInputComponent> = {
  component: FileUploadInputComponent,
  title: 'Component/Form/FileUploadInput',
};

export default meta;

type Story = StoryObj<typeof FileUploadInputComponent>;

export const FileUploadInput: Story = {
  args: {
    children: 'Click to Upload',
  },
  render: ({ children, 'data-testid': testId, ...rest }) => (
    <>
      <Label>Click toUpload File</Label>
      <FileUploadInputComponent data-testid={testId} {...rest}>
        {children}
      </FileUploadInputComponent>
    </>
  ),
};
