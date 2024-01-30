import { omit } from 'ramda';
import { createElement, type PropsWithChildren } from 'react';

export function createComponentWithOmittedProps(propsToOmit: string[]) {
  return function createEmptyElement(
    element: Parameters<typeof createElement>[0],
  ) {
    return function EmptyComponent(props: PropsWithChildren) {
      return createElement(element, omit(propsToOmit)(props));
    };
  };
}
