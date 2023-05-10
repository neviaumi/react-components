import type {
  ComponentProps,
  SlotComponentPropsWithoutOverride,
} from '../../components.d.js';
import { assocDefaultStyle } from '../../utils/assign-default-style.js';

interface SlotProps {
  denominator?: SlotComponentPropsWithoutOverride<'span'>;
  numerator?: SlotComponentPropsWithoutOverride<'div'>;
  root?: SlotComponentPropsWithoutOverride<'div'>;
  separator?: SlotComponentPropsWithoutOverride<'hr'>;
}

export type FractionNumberProps = ComponentProps<
  SlotProps,
  {
    denominator?: string;
    numerator?: string;
  }
>;

export default function FractionNumber(props: FractionNumberProps) {
  const {
    'data-testid': testId,
    denominator,
    disableDefaultClasses,
    numerator,
    slotProps: givenSlotProps,
  } = props;
  let slotProps = givenSlotProps;
  if (disableDefaultClasses !== false) {
    const slotWithDefaultClasses: {
      [key in keyof SlotProps]: string;
    } = {
      denominator: 'tw-text-center',
      numerator: 'tw-text-center',
      root: 'tw-flex tw-flex-col tw-overflow-hidden',
    };
    slotProps = assocDefaultStyle<SlotProps>({ slotWithDefaultClasses })(
      givenSlotProps,
    );
  }

  return (
    <div data-testid={testId} {...slotProps?.root}>
      <span {...slotProps?.numerator}>{numerator ?? 'N/A'}</span>
      <hr {...slotProps?.separator} />
      <span {...slotProps?.denominator}>{denominator ?? 'N/A'}</span>
    </div>
  );
}
