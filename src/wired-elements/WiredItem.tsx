import { WiredItem } from 'wired-elements/lib/wired-item.js';

import type { ComponentProps } from '../components';
import { createReactComponentFromLitElement } from './wc-to-react';

export type ItemProps = ComponentProps<{ value: string }>;

const ReactWiredItem = createReactComponentFromLitElement<ItemProps>(
  'wired-item',
  WiredItem,
);

export default ReactWiredItem;
