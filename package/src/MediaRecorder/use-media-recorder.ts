import { type MutableRefObject, useEffect, useRef, useState } from 'react';

export function useMediaStream(constraints: MediaStreamConstraints) {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [requireMediaStreamError, setRequireMediaStreamError] =
    useState<Error | null>(null);
  useEffect(() => {
    if (!navigator.mediaDevices.getUserMedia) {
      setMediaStream(null);
      setRequireMediaStreamError(
        new Error('getUserMedia not supported on your browser!'),
      );
    }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(setMediaStream)
      .catch(setRequireMediaStreamError);
  }, []);

  return {
    mediaStream,
    requireMediaStreamError,
  };
}

export function useAudioRecorder(
  options?: MediaRecorderOptions,
): [MediaRecorder | null, Error | null, MutableRefObject<Blob[] | null>] {
  const { mediaStream, requireMediaStreamError } = useMediaStream({
    audio: true,
  });
  const [audioRecorder, setAudioRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [recorderError, setRecorderError] = useState<Error | null>(null);
  const recordedChunks = useRef<null | Blob[]>(null);
  useEffect(
    function setupRecorder() {
      if (!mediaStream) return undefined;
      const recorder = new MediaRecorder(mediaStream, options);
      setAudioRecorder(recorder);
      const onError = (event: MediaRecorderEventMap['error']) => {
        // @ts-expect-error Typing error!
        setRecorderError(event.error);
      };
      const onStart = () => {
        recordedChunks.current = [];
      };

      const onDataavailable = (event: BlobEvent) => {
        recordedChunks.current?.push(event.data);
      };

      recorder.addEventListener('dataavailable', onDataavailable);
      recorder.addEventListener('error', onError);
      recorder.addEventListener('start', onStart);

      return () => {
        recorder.removeEventListener('error', onError);
        recorder.removeEventListener('start', onStart);
        recorder.removeEventListener('dataavailable', onDataavailable);
      };
    },
    [mediaStream],
  );

  return [
    audioRecorder,
    requireMediaStreamError || recorderError,
    recordedChunks,
  ];
}
