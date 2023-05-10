import { NativeFormControlElement } from '@mui/base/FormControl/FormControl.types';
import clsx from 'clsx';
import parseMilliseconds from 'parse-ms';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as React from 'react';

import IconButton from '../Button/IconButton.js';
import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.js';
import { PauseIcon, PlayIcon, VolumeUpIcon } from '../icons/solid.js';
import { Field } from '../Input/Field';
import Slider, { SliderProps } from '../Input/Slider/Slider';
import { assocDefaultStyle } from '../utils/assign-default-style';
import { deepMerge } from '../utils/deep-merge.js';

interface SlotProps {
  currentDuration?: SlotComponentPropsWithoutOverride<'span'>;
  duration?: SlotComponentPropsWithoutOverride<'div'>;
  root?: SlotComponentPropsWithoutOverride<'div'>;
  toggle?: SlotComponentPropsWithoutOverride<'button'>;
  totalDuration?: SlotComponentPropsWithoutOverride<'span'>;
  volumeControl?: SlotComponentPropsWithoutOverride<'div'>;
  volumeSlider?: SliderProps;
}

export type AudioProps = ComponentProps<
  SlotProps,
  {
    src: string;
    type: string;
  }
>;

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
  disableDefaultClasses,
  slotProps: givenSlotProps,
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
  const adjustAudioVolume = useCallback(
    (event: React.ChangeEvent<NativeFormControlElement>) => {
      if (!audioRef.current) return;
      const volume = Number.parseInt(event.target.value, 10);
      setAudioVolume(volume);
      audioRef.current.volume = volume / 100.0;
    },
    [],
  );
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
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        currentDuration: clsx('tw-font-bold'),
        root: clsx('tw-flex', 'tw-items-center', 'tw-gap-1'),
        volumeControl: clsx('tw-flex', 'tw-gap-1.5'),
      },
    })(givenSlotProps);
    slotProps.volumeSlider = deepMerge<SliderProps, SliderProps>(
      slotProps.volumeSlider ?? {},
      {},
    ) as any;
  }
  return (
    <>
      <audio ref={audioRef}>
        <source src={src} type={type} />
      </audio>
      <div
        className={slotProps?.root?.className}
        data-testid={testId && `${testId}-audio-controls`}
      >
        <IconButton onClick={toggleAudioPlay}>
          {audioPlaying ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
        <div>
          <div className={slotProps?.duration?.className}>
            <span className={slotProps?.currentDuration?.className}>
              {audioDuration}
            </span>
            /
            <span className={slotProps?.totalDuration?.className}>
              {formatSecond(audioRef.current?.duration ?? 0)}
            </span>
          </div>
          <div className={slotProps?.volumeControl?.className}>
            <VolumeUpIcon />
            <Field
              className={'tw-w-full'}
              onChange={adjustAudioVolume}
              value={audioVolume}
            >
              <Slider
                max={100}
                min={0}
                slotProps={slotProps?.volumeSlider?.slotProps}
              />
            </Field>
          </div>
        </div>
      </div>
    </>
  );
}
