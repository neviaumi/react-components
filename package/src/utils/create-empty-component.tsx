import { createComponentWithOmittedProps } from './create-component-with-omitted-props.tsx';

export const createEmptyComponent = createComponentWithOmittedProps([
  'children',
  'ownerState',
]);
