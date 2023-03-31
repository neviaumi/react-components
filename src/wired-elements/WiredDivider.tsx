import { WiredDivider } from 'wired-elements/lib/wired-divider.js';

import type { ComponentProps } from '../components.js';
import { createReactComponentFromLitElement } from './wc-to-react.js';

const ReactWiredDivider = createReactComponentFromLitElement<
  ComponentProps<unknown>
>('wired-divider', WiredDivider);

export default ReactWiredDivider;
