import { MutableRefObject, useRef } from 'react';
import { WiredSlider } from 'wired-elements/lib/wired-slider.js';

import type { ComponentProps } from '../components.js';
import { createReactComponentFromLitElement } from './wc-to-react.js';

type SliderProps = ComponentProps<{
  disabled?: boolean;
  max?: number;
  min: number;
  onChange: (event: CustomEvent<{ value: number }>) => void;
  value: number;
}>;

const ReactWiredSlider = createReactComponentFromLitElement<
  SliderProps & {
    ref: MutableRefObject<null | WiredSlider>;
  }
>('wired-slider', WiredSlider);

export default function Slider(props: SliderProps) {
  const sliderRef = useRef<WiredSlider>(null);
  if (sliderRef.current) {
    sliderRef.current.value = props.value;
  }
  return <ReactWiredSlider {...props} ref={sliderRef} />;
}
