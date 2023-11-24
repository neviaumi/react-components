import _UploadIcon from '@heroicons/react/20/solid/esm/ArrowUpTrayIcon.js';
import _ExclamationIcon from '@heroicons/react/20/solid/esm/ExclamationTriangleIcon.js';
import _MicrophoneIcon from '@heroicons/react/20/solid/esm/MicrophoneIcon.js';
import _PauseIcon from '@heroicons/react/20/solid/esm/PauseIcon.js';
import _PlayIcon from '@heroicons/react/20/solid/esm/PlayIcon.js';
import _VolumeUpIcon from '@heroicons/react/20/solid/esm/SpeakerWaveIcon.js';
import _StopIcon from '@heroicons/react/20/solid/esm/StopIcon.js';
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
export const ExclamationIcon = withHeroIcon(_ExclamationIcon);
