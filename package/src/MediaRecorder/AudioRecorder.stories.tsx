import type { Meta, StoryObj } from '@storybook/react';
import { type ChangeEvent, type ComponentProps, useState } from 'react';

import { AudioPlayer } from '../AudioPlayer/AudioPlayer.tsx';
import { FileUploadInput } from '../FileUploadInput/FileUploadInput.tsx';
import { Link } from '../Link/Link.tsx';
import { generateTestIdWithPrefix } from '../test-helpers/test-id.ts';
import { AudioRecorder as AudioRecorderComponent } from './AudioRecorder.tsx';

const meta: Meta<typeof AudioRecorderComponent> = {
  component: AudioRecorderComponent,
  title: 'Component/MediaRecorder/Audio',
};

export default meta;
type Story = StoryObj<
  ComponentProps<typeof AudioRecorderComponent> & {
    onAudioBufferReady?: (buffer: AudioBuffer) => void;
  }
>;

export const AudioRecorderAndFileUploadWithPreview: Story = {
  render: args => {
    const [isRecording, setIsRecording] = useState<boolean | null>(false);
    const [downloadUrl, setDownloadUrl] = useState<{
      src: string;
      type: string;
    } | null>(null);

    return (
      <div className={'tw-flex tw-flex-col'}>
        <div className={'tw-flex tw-flex-row'}>
          {!isRecording && (
            <FileUploadInput
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (!event.target.files) return;
                const [uploadFile]: FileList = event.target.files;
                const reader = new FileReader();

                reader.addEventListener(
                  'load',
                  () => {
                    // convert image file to base64 string
                    setDownloadUrl({
                      src: reader.result as string,
                      type: 'audio/mpeg',
                    });
                  },
                  false,
                );
                reader.readAsDataURL(uploadFile);
              }}
            >
              Upload
            </FileUploadInput>
          )}
          <AudioRecorderComponent
            {...args}
            onStartRecording={() => setIsRecording(true)}
            onStopRecording={e => {
              const blob = new Blob(e.detail.value);
              setDownloadUrl({
                src: URL.createObjectURL(blob),
                type: 'audio/webm',
              });
              setIsRecording(false);
            }}
          />
        </div>
        {!isRecording && downloadUrl && (
          <div
            data-testid={generateTestIdWithPrefix({
              id: 'preview',
              prefix: args['data-testid'],
            })}
          >
            <AudioPlayer src={downloadUrl?.src} type={downloadUrl?.type} />
            <Link download={'recording.webm'} href={downloadUrl?.src}>
              Download Record here
            </Link>
          </div>
        )}
      </div>
    );
  },
};

export const AudioRecorderProduceAudioBuffer: Story = {
  render: ({ 'data-testid': testId, onAudioBufferReady }) => {
    return (
      <div>
        <AudioRecorderComponent
          data-testid={testId}
          onStopRecording={e => {
            const blob = new Blob(e.detail.value);
            const audioContext = new AudioContext();
            const fileReader = new FileReader();

            fileReader.addEventListener('loadend', async () => {
              const arrayBuffer = fileReader.result as ArrayBuffer;
              const buffer = await audioContext.decodeAudioData(arrayBuffer);
              onAudioBufferReady?.(buffer);
            });
            fileReader.readAsArrayBuffer(blob);
          }}
        />
      </div>
    );
  },
};
