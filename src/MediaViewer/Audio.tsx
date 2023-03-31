import parseMilliseconds from 'parse-ms';
import { useCallback, useEffect, useRef, useState } from 'react';

import IconButton from '../Button/IconButton.js';
import type { ComponentProps } from '../components.js';
import { PauseIcon, PlayIcon, VolumeUpIcon } from '../icons/solid.js';
import WiredSlider from '../wired-elements/WiredSlider.js';

export type AudioProps = ComponentProps<{
  src: string;
  type: string;
}>;

function formatSecond(second: number) {
  if (isNaN(second)) return '00:00';
  if (!Number.isFinite(second)) return '00:00';
  const { minutes, seconds } = parseMilliseconds(second * 1000);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0',
  )}`;
}

export default function Audio({
  'data-testid': testId,
  src,
  type,
}: AudioProps) {
  const [audioError, setAudioError] = useState<Error | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState('00:00');
  const [audioVolume, setAudioVolume] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const toggleAudioPlay = useCallback(async () => {
    if (!audioRef.current) return;
    try {
      if (audioPlaying) {
        await audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setAudioVolume((audioRef.current.volume ?? 0) * 100);
      setAudioPlaying(prevState => !prevState);
    } catch (e) {
      setAudioError(e as Error);
    }
  }, [audioPlaying]);
  const adjustAudioVolume = useCallback((event: CustomEvent) => {
    if (!audioRef.current) return;
    const volume = event.detail.value;
    setAudioVolume(volume);
    audioRef.current.volume = volume / 100.0;
  }, []);
  useEffect(function subscribeAudioTimeChange() {
    const audioEle = audioRef.current;
    const updateAudioCurrentTime: (event: Event) => void = () =>
      setAudioDuration(formatSecond(audioRef.current?.currentTime ?? 0));
    audioEle?.addEventListener('timeupdate', updateAudioCurrentTime);
    return () =>
      audioEle?.removeEventListener('timeupdate', updateAudioCurrentTime);
  }, []);
  if (audioError)
    return (
      <>
        <div>Error: {audioError.message}</div>
      </>
    );
  return (
    <>
      <audio ref={audioRef}>
        <source src={src} type={type} />
      </audio>
      <div
        className={'tw-flex tw-items-center tw-gap-1'}
        data-testid={testId && `${testId}-audio-controls`}
      >
        <IconButton onClick={toggleAudioPlay}>
          {audioPlaying ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
        <div>
          <div>
            <span className={'tw-font-bold'}>{audioDuration}</span> /{' '}
            {formatSecond(audioRef.current?.duration ?? 0)}
          </div>
          <div className={'tw-flex tw-items-center tw-gap-0.5'}>
            <VolumeUpIcon />
            <WiredSlider
              disabled={audioRef.current === null}
              max={100}
              min={0}
              onChange={adjustAudioVolume}
              value={audioVolume}
            />
          </div>
        </div>
      </div>
    </>
  );
}
