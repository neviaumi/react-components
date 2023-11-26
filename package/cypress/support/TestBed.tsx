import '../../.storybook/preview.css';

import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

export function TestBed(props: PropsWithChildren) {
  return (
    <main>
      <h1
        className={clsx(
          'tw-bg-warning',
          'hover:tw-bg-warning-user-action',
          'tw-text-warning-contrast',
          'hover:tw-text-warning-user-action',
          'tw-mb-1',
          'tw-block',
          'tw-border-b-2',
          'tw-border-warning',
          'hover:tw-border-warning-user-action',
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
