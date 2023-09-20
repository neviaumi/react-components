import clsx from 'clsx';

import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

interface SlotProps {
  root?: SlotComponentPropsWithoutOverride<'img'>;
}

export type ImageProps = ComponentProps<SlotProps>;

export function Image({
  'data-testid': testId,
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: ImageProps) {
  let slotProps = givenSlotProps;

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        root: clsx('tw-object-cover'),
      },
    })(givenSlotProps);
  }

  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);

  return <img data-testid={testId ?? 'busybox-img'} {...rootProps} />;
}
