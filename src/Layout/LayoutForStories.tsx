import type { PropsWithChildren } from 'react';

import {
  Content as UnStyledContent,
  Footer as UnStyledFooter,
  Header as UnStyledHeader,
  LayoutProps,
  Main as UnStyledMain,
  Page as UnStyledPage,
  Side as UnStyledSide,
} from './Layout.js';

export function Page({
  className = '',
  ...props
}: PropsWithChildren<LayoutProps>) {
  return <UnStyledPage className={`tw-h-screen ${className}`} {...props} />;
}

export function Content({
  className = '',
  ...props
}: PropsWithChildren<LayoutProps>) {
  return <UnStyledContent className={`tw-h-1/3 ${className}`} {...props} />;
}

export function Footer({
  className = '',
  ...props
}: PropsWithChildren<LayoutProps>) {
  return (
    <UnStyledFooter
      className={`tw-flex tw-h-1/3 tw-items-center tw-justify-center tw-bg-red-400/20 tw-font-bold tw-text-neutral-400 ${className}`}
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
      className={`tw-flex tw-h-1/3 tw-items-center tw-justify-center tw-bg-red-600/60 tw-font-bold tw-text-white ${className}`}
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
      className={`tw-flex tw-items-center tw-justify-center tw-bg-lime-400/20 tw-font-bold tw-text-neutral-400 ${className}`}
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
      className={`tw-flex tw-items-center tw-justify-center tw-bg-blue-400/20 tw-font-bold tw-text-neutral-400 ${className}`}
      {...props}
    />
  );
}
