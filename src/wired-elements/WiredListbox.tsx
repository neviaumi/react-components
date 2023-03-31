import { WiredListbox } from 'wired-elements/lib/wired-listbox.js';

import type { ComponentProps } from '../components';
import { createReactComponentFromLitElement } from './wc-to-react.js';

export type ListboxProps = ComponentProps<{
  horizontal?: boolean;
  id?: string;
  onSelected?: (e: CustomEvent<{ selected: string }>) => void;
  selected?: string | null;
}>;

const ReactWiredListbox = createReactComponentFromLitElement<ListboxProps>(
  'wired-listbox',
  WiredListbox,
  {
    onSelected: 'selected',
  },
);

export default ReactWiredListbox;
