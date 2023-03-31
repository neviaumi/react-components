import type { ComponentProps } from '../components';

export interface LayoutProps {
  className?: string;
}

export function Page({
  children,
  className = '',
  ...rest
}: ComponentProps<LayoutProps>) {
  return (
    <div
      className={`tw-container ${className}`}
      role={'document'}
      tabIndex={0}
      {...rest}
    >
      {children}
    </div>
  );
}

export function Main({ children, ...rest }: ComponentProps<LayoutProps>) {
  return <article {...rest}>{children}</article>;
}

export function Content({ children, ...rest }: ComponentProps<LayoutProps>) {
  return <main {...rest}>{children}</main>;
}

export function Header({ children, ...rest }: ComponentProps<LayoutProps>) {
  return <header {...rest}>{children}</header>;
}

export function Footer({ children, ...rest }: ComponentProps<LayoutProps>) {
  return <footer {...rest}>{children}</footer>;
}

export function Side({ children, ...rest }: ComponentProps<LayoutProps>) {
  return <aside {...rest}>{children}</aside>;
}
