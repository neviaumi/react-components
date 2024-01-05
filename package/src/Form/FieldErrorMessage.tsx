import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { ExclamationIcon } from '../icons/solid.tsx';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';
import { useFieldContext } from './useFieldContext.ts';

interface SlotProps {
  icon?: SlotComponentPropsWithoutOverride<'svg'>;
  message?: SlotComponentPropsWithoutOverride<'span'>;
  root?: SlotComponentPropsWithoutOverride<'span'>;
}

export type FieldMessageProps = ComponentProps<SlotProps>;

export function FieldErrorMessage({
  children,
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: FieldMessageProps) {
  const { formControlContext } = useFieldContext();
  if (!formControlContext) {
    return null;
  }
  if (!formControlContext.error) return null;
  const slotProps = disableDefaultClasses
    ? givenSlotProps
    : assocDefaultStyle<SlotProps>({
        slotWithDefaultClasses: {
          root: 'tw-flex tw-gap-0.5 tw-items-end tw-mt-0.5',
        },
      })(givenSlotProps);
  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);

  return (
    <span role={'alert'} {...rootProps}>
      <ExclamationIcon {...slotProps?.icon} />
      <span {...slotProps?.message}>{children}</span>
    </span>
  );
}
