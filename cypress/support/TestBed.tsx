import '../../.storybook/preview.css';

import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

export default function TestBed(props: PropsWithChildren) {
  return (
    <main>
      <h1
        className={clsx(
          'tw-bg-warning',
          'hover:tw-bg-warning-hover',
          'tw-text-warning',
          'hover:tw-text-warning-hover',
          'tw-mb-1',
          'tw-block',
          'tw-border-b-2',
          'tw-border-warning',
          'hover:tw-border-warning-hover',
          'tw-text-center',
          'tw-text-9xl',
          'tw-font-bold',
        )}
      >
        TestBed
      </h1>
      {props.children}
    </main>
  );
}
