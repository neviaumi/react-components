import {
  ArrowUpTrayIcon as _UploadIcon,
  MicrophoneIcon as _MicrophoneIcon,
  PauseIcon as _PauseIcon,
  PlayIcon as _PlayIcon,
  SpeakerWaveIcon as _VolumeUpIcon,
  StopIcon as _StopIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import type React from 'react';

function withHeroIcon(HeroIcon: React.FunctionComponent) {
  return function Wrapper(props: React.ComponentProps<'svg'>) {
    const { className: givenClassName, ...rest } = props;
    const className = clsx(
      'tw-h-[20px]',
      'tw-w-[20px]',
      ...(givenClassName ?? '').split(' '),
    );
    // @ts-expect-error no typing fix !
    return <HeroIcon className={className} {...rest} />;
  };
}
export const PauseIcon = withHeroIcon(_PauseIcon);
export const PlayIcon = withHeroIcon(_PlayIcon);
export const VolumeUpIcon = withHeroIcon(_VolumeUpIcon);
export const MicrophoneIcon = withHeroIcon(_MicrophoneIcon);
export const StopIcon = withHeroIcon(_StopIcon);
export const UploadIcon = withHeroIcon(_UploadIcon);
