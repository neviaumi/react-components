import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

import {
  Content as UnStyledContent,
  Footer as UnStyledFooter,
  Header as UnStyledHeader,
  LayoutProps,
  Main as UnStyledMain,
  Page as UnStyledPage,
  Side as UnStyledSide,
} from './Layout.jsx';

export function Page({
  className = '',
  ...props
}: PropsWithChildren<LayoutProps>) {
  return <UnStyledPage className={clsx('tw-h-screen', className)} {...props} />;
}

export function Content({
  className = '',
  ...props
}: PropsWithChildren<LayoutProps>) {
  return <UnStyledContent className={clsx(`tw-h-1/3`, className)} {...props} />;
}

export function Footer({
  className = '',
  ...props
}: PropsWithChildren<LayoutProps>) {
  return (
    <UnStyledFooter
      className={clsx(
        'tw-bg-rose-500',
        'tw-text-white',
        'tw-flex',
        'tw-h-1/3',
        'tw-items-center',
        'tw-justify-center',
        'tw-font-bold',
        className,
      )}
      {...props}
    />
  );
}

export function Header({
  className = '',
  ...props
}: PropsWithChildren<LayoutProps>) {
  return (
    <UnStyledHeader
      className={clsx(
        `tw-bg-rose-600`,
        `tw-text-white`,
        `tw-flex`,
        `tw-h-1/3`,
        `tw-items-center`,
        `tw-justify-center`,
        `tw-font-bold`,
        className,
      )}
      {...props}
    />
  );
}

export function Main({
  className = '',
  ...props
}: PropsWithChildren<LayoutProps>) {
  return (
    <UnStyledMain
      className={clsx(
        `tw-bg-sky-500/20`,
        `tw-text-white`,
        `tw-flex`,
        `tw-items-center`,
        `tw-justify-center`,
        `tw-font-bold`,
        className,
      )}
      {...props}
    />
  );
}

export function Side({
  className = '',
  ...props
}: PropsWithChildren<LayoutProps>) {
  return (
    <UnStyledSide
      className={clsx(
        `tw-bg-sky-600/20`,
        `tw-text-white`,
        `tw-flex`,
        `tw-items-center`,
        `tw-justify-center`,
        `tw-font-bold`,
        className,
      )}
      {...props}
    />
  );
}
