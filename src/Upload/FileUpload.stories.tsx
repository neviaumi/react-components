import type { ComponentMeta, ComponentStory } from '@storybook/react';

import FileUploadComponent from './FileUpload.js';

export default {
  component: FileUploadComponent,
  title: 'Component/FileUpload',
} as ComponentMeta<typeof FileUploadComponent>;

export const FileUpload: ComponentStory<typeof FileUploadComponent> = ({
  children,
  ...rest
}) => <FileUploadComponent {...rest}>{children}</FileUploadComponent>;

FileUpload.args = {
  children: 'Click to Upload',
};
