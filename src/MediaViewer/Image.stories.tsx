import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { ChangeEvent, useCallback, useState } from 'react';

import FileUpload from '../FileUpload/FileUpload.tsx';
import ImageComponent from './Image.tsx';

const meta: Meta<typeof ImageComponent> = {
  component: ImageComponent,
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Component/MediaViewer/Image',
} as Meta<typeof ImageComponent>;

export default meta;

type Story = StoryObj<typeof ImageComponent>;

export const Image: Story = {
  args: {
    alt: 'Cat 201 Created',
    src: 'https://http.cat/201',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await canvas.getByRole('img', {
      name: 'Cat 201 Created',
    });
  },
  render: ({ children, ...rest }) => (
    <ImageComponent {...rest}>{children}</ImageComponent>
  ),
};

export const ImagePreviewWhenFileUpload: Story = {
  render: args => {
    const [uploadedImg, setUploadedImg] = useState<{
      alt: string;
      src: string;
    } | null>(null);
    const uploadImg = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      const [uploadFile]: FileList = event.target.files;
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          // convert image file to base64 string
          setUploadedImg({
            alt: uploadFile.name,
            src: reader.result as string,
          });
        },
        false,
      );
      reader.readAsDataURL(uploadFile);
    }, []);
    return (
      <div className={'tw-flex tw-flex-col'}>
        {uploadedImg && (
          <ImageComponent
            alt={uploadedImg.alt}
            slotProps={{
              root: {
                className: 'tw-border-2 tw-w-[640px] tw-h-[480px]',
              },
            }}
            src={uploadedImg.src}
          />
        )}
        <FileUpload data-testid={args['data-testid']} onChange={uploadImg}>
          Click and upload image here
        </FileUpload>
      </div>
    );
  },
};
