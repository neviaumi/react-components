import classnames from 'classnames';

import { palette } from '../theme.js';
import WiredIconButton, {
  IconButtonProps,
} from '../wired-elements/WiredIconButton.js';

export default function IconButton(props: IconButtonProps) {
  const classes = classnames(
    palette.primary.main,
    palette.primary.contrastText,
    'tw-rounded-3xl',
    palette.primary.hover.main,
    palette.primary.hover.contrastText,
  );
  return (
    <div className={'tw-inline-block'}>
      <WiredIconButton
        className={classes}
        data-testid={props['data-testid'] ?? 'wired-icon-button'}
        onClick={props.onClick}
        role={'button'}
      >
        {props.children}
      </WiredIconButton>
    </div>
  );
}
