import clsx from 'clsx';
import { mergeWithKey } from 'ramda';

type SlotProps =
  | {
      root?: any;
    }
  | undefined;

type ComponentProps = Record<string, any>;

export function concatClassNameOrTakeRight(
  key: string,
  l: any,
  r: any,
): string | undefined {
  if (key === 'className') {
    return clsx(l, r);
  }
  return l;
}

export const mergeRootSlotPropsToComponentProps =
  (resolveConflict = concatClassNameOrTakeRight) =>
  (slotProps: SlotProps, componentProps: ComponentProps) => {
    return mergeWithKey(resolveConflict, slotProps?.root ?? {}, componentProps);
  };
