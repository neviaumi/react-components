import { assocPath, pipe } from 'ramda';

export type AssocDefaultValuesInput<T extends Record<any, any>> = {
  [key in keyof T]: T[key];
};
export const assocDefaultValues = <T extends Record<any, any>>(
  assocDefaultValuesInput: AssocDefaultValuesInput<T>,
) => {
  return (current: T | undefined): T => {
    const assocPathPipeline = Object.entries(assocDefaultValuesInput).map(
      ([slotName, defaultValue]) => {
        return assocPath([slotName], current?.[slotName] ?? defaultValue);
      },
    );
    if (assocPathPipeline.length === 0) return (current ?? {}) as T;
    // @ts-expect-error Not sure why this is complaining
    return pipe(...assocPathPipeline)(current ?? {}) as T;
  };
};
