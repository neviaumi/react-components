import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../components.ts';
import { ExclamationIcon } from '../icons/solid.tsx';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';
import { ErrorLevel } from './FieldError.ts';
import { useFieldContext } from './useFieldContext.ts';

type state = {
  level: ErrorLevel;
};

interface SlotProps {
  icon?: SlotComponentPropsWithoutOverride<'svg', state>;
  message?: SlotComponentPropsWithoutOverride<'span', state>;
  root?: SlotComponentPropsWithoutOverride<'span', state>;
}

export type FieldMessageProps = ComponentProps<
  SlotProps,
  {
    level: ErrorLevel;
  }
>;

export function FieldErrorMessage({
  children,
  disableDefaultClasses,
  level,
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
          icon: level === 'error' ? 'tw-text-error' : 'tw-text-warning',
          message: level === 'error' ? 'tw-text-error' : 'tw-text-warning',
          root: 'tw-flex tw-gap-0.5 tw-items-end tw-mt-0.5',
        },
      })(givenSlotProps);
  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);

  return (
    <span role={level === 'error' ? 'alert' : 'status'} {...rootProps}>
      <ExclamationIcon {...slotProps?.icon} />
      <span {...slotProps?.message}>{children}</span>
    </span>
  );
}
