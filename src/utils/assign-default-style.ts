import clsx from 'clsx';
import { assocPath, path, pipe } from 'ramda';

export type AssocDefaultStyleInput<T extends Record<any, any>> = {
  slotWithDefaultClasses: {
    [key in keyof T]: string;
  };
};
export const assocDefaultStyle = <T extends Record<any, any>>({
  slotWithDefaultClasses,
}: AssocDefaultStyleInput<T>) => {
  return (currentSlotProps: T | undefined) => {
    const assocPathPipeline = Object.entries(slotWithDefaultClasses).map(
      ([slotName, defaultClasses]) => {
        return assocPath(
          [slotName, 'className'],
          clsx(defaultClasses, path([slotName, 'className'], currentSlotProps)),
        );
      },
    );
    if (assocPathPipeline.length === 0) return currentSlotProps ?? {};
    // @ts-expect-error Not sure why this is complaining
    return pipe(...assocPathPipeline)(currentSlotProps ?? {}) as T;
  };
};
