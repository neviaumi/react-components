import clsx from 'clsx';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.d.js';
import { assocDefaultStyle } from '../utils/assign-default-style.js';

interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'img'>;
}

export type ButtonProps = ComponentProps<SlotProps>;

export default function Image({
  children,
  'data-testid': testId,
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: ButtonProps) {
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        root: clsx('tw-object-cover'),
      },
    })(givenSlotProps);
  }

  return (
    <img data-testid={testId ?? 'busybox-img'} {...rest} {...slotProps?.root}>
      {children}
    </img>
  );
}
