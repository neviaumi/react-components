import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEvent, useCallback, useState } from 'react';

import FileUploadInput from '../FileUploadInput/FileUploadInput.tsx';
import AudioComponent from './Audio.tsx';
// @ts-expect-error static file with file loader not working?
import mp3Fixture from './sunshine-of-your-love.mp3';

const meta: Meta<typeof AudioComponent> = {
  component: AudioComponent,
  title: 'Component/MediaViewer/Audio',
};

export default meta;

type Story = StoryObj<typeof AudioComponent>;

export const Audio: Story = {
  args: {
    src: mp3Fixture,
    type: 'audio/mpeg',
  },
  render: ({ children, ...rest }) => (
    <AudioComponent {...rest}>{children}</AudioComponent>
  ),
};

export const AudioPreviewWithFileUpload: Story = {
  render: args => {
    const [uploadedAudio, setUploadedAudio] = useState<{
      src: string;
      type: string;
    } | null>(null);
    const uploadImg = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      const [uploadFile]: FileList = event.target.files;
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          // convert image file to base64 string
          setUploadedAudio({
            src: reader.result as string,
            type: 'audio/mpeg',
          });
        },
        false,
      );
      reader.readAsDataURL(uploadFile);
    }, []);
    return (
      <div className={'tw-flex tw-flex-col'}>
        {uploadedAudio && (
          <AudioComponent
            data-testid={args['data-testid']}
            src={uploadedAudio.src}
            type={uploadedAudio.type}
          />
        )}
        <FileUploadInput data-testid={args['data-testid']} onChange={uploadImg}>
          Click and upload MP3 here
        </FileUploadInput>
      </div>
    );
  },
};
