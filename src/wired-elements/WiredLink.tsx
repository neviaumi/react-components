import { MutableRefObject, useEffect, useRef } from 'react';
import { WiredLink } from 'wired-elements/lib/wired-link.js';

import type { ComponentProps } from '../components.js';
import { createReactComponentFromLitElement } from './wc-to-react.js';

export type LinkProps = ComponentProps<{
  download?: string | boolean;
  href: string;
  target?: string;
}>;

const ReactWiredLink = createReactComponentFromLitElement<
  LinkProps & {
    onClick?: (event: Event) => void;
    ref: MutableRefObject<any>;
  }
>('wired-link', WiredLink);

export default function Link(props: LinkProps) {
  const linkRef = useRef<WiredLink | null>(null);

  useEffect(() => {
    if (!linkRef.current) return;
    if (props.download)
      linkRef.current['anchor']?.setAttribute(
        'download',
        props.download === true ? '' : props.download,
      );
  }, [linkRef, props.download]);
  return (
    <ReactWiredLink href={props.href} ref={linkRef}>
      {props.children}
    </ReactWiredLink>
  );
}
