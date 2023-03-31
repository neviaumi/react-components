import WiredImage, { ImageProps } from '../wired-elements/WiredImage.js';

export default function Image({ alt, src, ...props }: ImageProps) {
  return (
    <WiredImage alt={alt} aria-label={alt} role={'img'} src={src} {...props} />
  );
}
