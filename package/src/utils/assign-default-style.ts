import clsx from 'clsx';
import { assocPath, pathOr, pipe } from 'ramda';

export type AssocDefaultStyleInput<T extends Record<any, any>> = {
  slotWithDefaultClasses: {
    [key in keyof T]: string | ((state: any) => string);
  };
};
export const assocDefaultStyle = <T extends Record<any, any>>({
  slotWithDefaultClasses,
}: AssocDefaultStyleInput<T>) => {
  return (currentSlotProps: T | undefined): T => {
    const assocPathPipeline = Object.entries(slotWithDefaultClasses).map(
      ([slotName, defaultClasses]) => {
        const isDefaultClassesFunction = typeof defaultClasses === 'function';
        const isSlotFunction =
          currentSlotProps !== undefined &&
          typeof currentSlotProps[slotName] === 'function';
        if (isDefaultClassesFunction || isSlotFunction) {
          if (isDefaultClassesFunction && !isSlotFunction) {
            return assocPath([slotName], (state: any) => {
              return {
                className: clsx(
                  defaultClasses(state),
                  pathOr('', [slotName, 'className'], currentSlotProps).trim(),
                ),
              };
            });
          }
          if (!isDefaultClassesFunction && isSlotFunction) {
            return assocPath([slotName], (state: any) => {
              const newProps = currentSlotProps[slotName](state);
              return assocPath(
                ['className'],
                clsx(
                  defaultClasses,
                  pathOr('', ['className'], newProps).trim(),
                ),
              )(newProps);
            });
          }
          if (isDefaultClassesFunction && isSlotFunction) {
            return assocPath([slotName], (state: any) => {
              const defaultClassName = defaultClasses(state);
              const newProps = currentSlotProps[slotName](state);
              return assocPath(
                ['className'],
                clsx(
                  defaultClassName,
                  pathOr('', ['className'], newProps).trim(),
                ),
              )(newProps);
            });
          }
        }

        return assocPath(
          [slotName, 'className'],
          clsx(
            defaultClasses,
            pathOr('', [slotName, 'className'], currentSlotProps).trim(),
          ),
        );
      },
    );
    if (assocPathPipeline.length === 0) return (currentSlotProps ?? {}) as T;
    // @ts-expect-error Not sure why this is complaining
    return pipe(...assocPathPipeline)(currentSlotProps ?? {}) as T;
  };
};
