import {
  TablePagination as MuiTablePagination,
  type TablePaginationActionsProps,
  type TablePaginationOwnProps,
} from '@mui/base/TablePagination';
import clsx from 'clsx';

import type { ComponentProps } from '../components.ts';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../icons/solid.tsx';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import { assocDefaultValues } from '../utils/assign-default-values.ts';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';

type SlotProps = Required<TablePaginationOwnProps>['slotProps'];

export type TablePaginationProps = ComponentProps<
  SlotProps,
  TablePaginationOwnProps
>;

export function TablePagination({
  children,
  'data-testid': testId,
  disableDefaultClasses,
  slotProps: givenSlotProps,
  ...rest
}: TablePaginationProps) {
  let slotProps = givenSlotProps || {};

  if (!disableDefaultClasses) {
    slotProps = assocDefaultStyle<SlotProps>({
      slotWithDefaultClasses: {
        actions: clsx('tw-flex'),
        displayedRows: clsx('tw-ml-auto', 'tw-mr-2'),
        toolbar: clsx('tw-flex', 'tw-flex-row'),
      },
    })(givenSlotProps);
  }
  // @ts-expect-error can be optional
  const {
    // @ts-expect-error can be optional
    actions: givenActionProps = {},
  }: {
    actions: TablePaginationActionsProps;
  } = slotProps;
  givenActionProps.slots = assocDefaultValues<
    Required<TablePaginationActionsProps>['slots']
  >({
    backPageIcon: ChevronLeftIcon,
    firstPageIcon: ChevronDoubleLeftIcon,
    lastPageIcon: ChevronDoubleRightIcon,
    nextPageIcon: ChevronRightIcon,
  })(givenActionProps.slots);
  givenActionProps.slotProps = assocDefaultStyle<
    Required<TablePaginationActionsProps>['slotProps']
  >({
    slotWithDefaultClasses: {
      backButton: clsx('disabled:tw-text-disabled'),
      firstButton: clsx('disabled:tw-text-disabled'),
      lastButton: clsx('disabled:tw-text-disabled'),
      nextButton: clsx('disabled:tw-text-disabled'),
    },
  })(givenActionProps?.slotProps);
  slotProps.actions = assocDefaultValues<Required<SlotProps>['actions']>({
    showFirstButton: true,
    showLastButton: true,
  })(givenActionProps);
  const rootProps = mergeRootSlotPropsToComponentProps()(slotProps, rest);

  return (
    <MuiTablePagination
      data-testid={testId ?? 'busybox-table-pagination'}
      slotProps={slotProps}
      {...rootProps}
    >
      {children}
    </MuiTablePagination>
  );
}
