import cn from 'classnames';

import type { ComponentProps } from '../../components';
import ReactWiredDivider from '../../wired-elements/WiredDivider.js';
import { Fraction, parseFraction } from './parse-fraction.js';

export type FractionNumberDisplayProps = ComponentProps<{
  id?: string;
  onClick?: (
    e: CustomEvent<{
      value: Fraction;
    }>,
  ) => void;
  value: string | null;
}>;

export default function FractionNumberDisplay(
  props: FractionNumberDisplayProps,
) {
  const { 'data-testid': testId, id, onClick, value } = props;
  const { denominator, numerator, raw } = parseFraction(value);
  const className = cn('tw-flex', 'tw-flex-col', 'tw-overflow-hidden', {
    'tw-w-2':
      denominator !== null &&
      numerator !== null &&
      denominator < 10 &&
      numerator < 10,
    'tw-w-5':
      denominator === null ||
      numerator === null ||
      denominator >= 10 ||
      numerator >= 10,
  });
  return (
    <div
      className={className}
      data-testid={testId}
      id={id}
      onClick={() =>
        onClick?.(
          new CustomEvent('click', {
            detail: {
              value: {
                denominator,
                numerator,
                raw,
              },
            },
          }),
        )
      }
    >
      <span className={'tw-text-center'}>{numerator ?? 'N/A'}</span>
      <ReactWiredDivider />
      <span className={'tw-text-center'}>{denominator ?? 'N/A'}</span>
    </div>
  );
}
