import type { ComponentMeta, ComponentStory, Story } from '@storybook/react';
import { ChangeEvent, ComponentProps, useState } from 'react';

import Audio from '../MediaViewer/Audio.js';
import { generateTestIdWithPrefix } from '../test-helpers/test-id.js';
import FileUpload from '../Upload/FileUpload.js';
import Link from '../wired-elements/WiredLink.js';
import AudioRecorderComponent from './AudioRecorder.js';

export default {
  component: AudioRecorderComponent,
  subcomponents: { Audio, FileUpload },
  title: 'Component/MediaRecorder/Audio',
} as ComponentMeta<typeof AudioRecorderComponent>;

export const AudioRecorderAndFileUploadWithPreview: ComponentStory<
  typeof AudioRecorderComponent
> = args => {
  const [isRecording, setIsRecording] = useState<boolean | null>(false);
  const [downloadUrl, setDownloadUrl] = useState<{
    src: string;
    type: string;
  } | null>(null);

  return (
    <div className={'tw-flex tw-flex-col'}>
      <div className={'tw-flex tw-flex-row'}>
        {!isRecording && (
          <FileUpload
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
          </FileUpload>
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
          <Audio src={downloadUrl?.src} type={downloadUrl?.type} />
          <Link download={'recording.webm'} href={downloadUrl?.src}>
            Download Record here
          </Link>
        </div>
      )}
    </div>
  );
};

export const AudioRecorderProduceAudioBuffer: Story<
  ComponentProps<typeof AudioRecorderComponent> & {
    onAudioBufferReady: (buffer: AudioBuffer) => void;
  }
> = ({ 'data-testid': testId, onAudioBufferReady }) => {
  return (
    <div className={'tw-flex tw-flex-col'}>
      <AudioRecorderComponent
        data-testid={testId}
        onStopRecording={e => {
          const blob = new Blob(e.detail.value);
          const audioContext = new AudioContext();
          const fileReader = new FileReader();

          fileReader.addEventListener('loadend', async () => {
            const arrayBuffer = fileReader.result as ArrayBuffer;
            const buffer = await audioContext.decodeAudioData(arrayBuffer);
            onAudioBufferReady(buffer);
          });
          fileReader.readAsArrayBuffer(blob);
        }}
      />
    </div>
  );
};
