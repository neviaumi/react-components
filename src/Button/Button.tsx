import classnames from 'classnames';

import { palette } from '../theme.js';
import WiredButton, { ButtonProps } from '../wired-elements/WiredButton.js';

export default function Button(props: ButtonProps) {
  const classes = classnames(
    palette.primary.main,
    palette.primary.contrastText,
    palette.primary.hover.main,
    palette.primary.hover.contrastText,
  );
  return (
    <div className={'tw-inline-block'}>
      <WiredButton
        aria-label={props.children as string}
        data-testid={props['data-testid'] ?? 'wired-button'}
        {...props}
        className={classes}
        role={'button'}
      >
        {props.children}
      </WiredButton>
    </div>
  );
}
