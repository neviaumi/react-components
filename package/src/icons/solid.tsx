import _UploadIcon from '@heroicons/react/20/solid/ArrowUpTrayIcon';
import _ExclamationIcon from '@heroicons/react/20/solid/ExclamationTriangleIcon';
import _MicrophoneIcon from '@heroicons/react/20/solid/MicrophoneIcon';
import _PauseIcon from '@heroicons/react/20/solid/PauseIcon';
import _PlayIcon from '@heroicons/react/20/solid/PlayIcon';
import _VolumeUpIcon from '@heroicons/react/20/solid/SpeakerWaveIcon';
import _StopIcon from '@heroicons/react/20/solid/StopIcon';
import _ChevronRightIcon from '@heroicons/react/20/solid/ChevronRightIcon';
import _ChevronLeftIcon from '@heroicons/react/20/solid/ChevronLeftIcon';
import _ChevronDoubleLeftIcon from '@heroicons/react/20/solid/ChevronDoubleLeftIcon';
import _ChevronDoubleRightIcon from '@heroicons/react/20/solid/ChevronDoubleRightIcon';

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

export const ChevronRightIcon = withHeroIcon(_ChevronRightIcon);
export const ChevronLeftIcon = withHeroIcon(_ChevronLeftIcon);

export const ChevronDoubleLeftIcon = withHeroIcon(_ChevronDoubleLeftIcon);
export const ChevronDoubleRightIcon = withHeroIcon(_ChevronDoubleRightIcon);
