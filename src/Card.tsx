import type { ComponentProps } from './components.js';
import ReactWiredCard from './wired-elements/WiredCard.js';

export default function Card({
  children,
  ...rest
}: ComponentProps<{ fill?: string }>) {
  return <ReactWiredCard {...rest}>{children}</ReactWiredCard>;
}
