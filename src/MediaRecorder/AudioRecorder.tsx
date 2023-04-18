import { useCallback, useEffect, useRef, useState } from 'react';

import IconButton from '../Button/IconButton.js';
import {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components';
import { MicrophoneIcon, StopIcon } from '../icons/solid.js';
import { assocDefaultStyle } from '../utils/assign-default-style';
import { useAudioRecorder } from './use-media-recorder.js';

interface SlotProps {
  errorMessage?: SlotComponentPropsWithoutOverride<'p', object>;
  errorTitle?: SlotComponentPropsWithoutOverride<'h1', object>;
  root?: SlotComponentPropsWithoutOverride<'button', object>;
  start?: SlotComponentPropsWithoutOverride<'button', object>;
  stop?: SlotComponentPropsWithoutOverride<'button', object>;
}

export type StartRecordingHandler = () => void;
export type StopRecordingHandler = (e: CustomEvent<{ value: Blob[] }>) => void;

export type AudioRecordProps = ComponentProps<
  SlotProps,
  {
    onStartRecording?: StartRecordingHandler;
    onStopRecording: StopRecordingHandler;
  }
>;

export default function AudioRecorder({
  'data-testid': testId,
  disableDefaultClasses,
  onStartRecording,
  onStopRecording,
  slotProps: givenSlotProps,
  ...rest
}: AudioRecordProps) {
  const [audioRecorder, recorderError, recordChunks] = useAudioRecorder({
    mimeType: 'audio/webm',
  });
  const [isRecording, setIsRecording] = useState(false);
  const recordingChunks = useRef<unknown[] | null>(null);
  const toggleIsRecording = useCallback(() => {
    if (isRecording) {
      audioRecorder?.stop();
      setIsRecording(false);
    } else {
      recordingChunks.current = [];
      audioRecorder?.start();
      onStartRecording?.();
      setIsRecording(true);
    }
  }, [audioRecorder, isRecording, onStartRecording]);
  useEffect(() => {
    if (!audioRecorder) return undefined;
    const onRecorderStop = () => {
      onStopRecording(
        new CustomEvent('finishRecording', {
          detail: {
            value: recordChunks.current!,
          },
        }),
      );
      recordChunks.current = null;
    };
    audioRecorder.addEventListener('stop', onRecorderStop);
    return () => {
      audioRecorder.removeEventListener('stop', onRecorderStop);
    };
  }, [audioRecorder, onStopRecording, recordChunks]);
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {},
    })(givenSlotProps);
  }
  // if (!audioRecorder) return null;
  if (recorderError)
    return (
      <div>
        <h1 className={slotProps?.errorTitle?.className}>
          {recorderError.name}
        </h1>
        <p className={slotProps?.errorMessage?.className}>
          {recorderError.message}
        </p>
      </div>
    );
  return (
    <IconButton
      data-testid={testId}
      disableDefaultClasses={disableDefaultClasses}
      onClick={toggleIsRecording}
      slotProps={{
        root: { ...slotProps?.root },
      }}
      {...rest}
    >
      {isRecording ? (
        <StopIcon className={slotProps?.stop?.className} />
      ) : (
        <MicrophoneIcon className={slotProps?.start?.className} />
      )}
    </IconButton>
  );
}
