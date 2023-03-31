import { WiredIconButton } from 'wired-elements/lib/wired-icon-button.js';

import type { ComponentProps } from '../components.js';
import { createReactComponentFromLitElement } from './wc-to-react.js';

export type IconButtonProps = ComponentProps<{
  'aria-label'?: string;
  onClick: () => void;
}>;

const ReactWiredIconButton =
  createReactComponentFromLitElement<IconButtonProps>(
    'wired-icon-button',
    WiredIconButton,
  );

export default ReactWiredIconButton;
