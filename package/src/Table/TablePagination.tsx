import {
  TablePagination as MuiTablePagination,
  type TablePaginationOwnProps,
  type TablePaginationActionsProps,
  type TablePaginationActionsSlotProps,
} from '@mui/base/TablePagination';
import type { ComponentProps } from '../components.ts';
import { assocDefaultStyle } from '../utils/assign-default-style.ts';
import clsx from 'clsx';
import { mergeRootSlotPropsToComponentProps } from '../utils/merge-root-slot-props-to-component-prop.ts';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '../icons/solid.tsx';
import { assocDefaultValues } from '../utils/assign-default-values.ts';
import type { FunctionComponent } from 'react';

type SlotProps = Required<TablePaginationOwnProps>['slotProps'];

type ActionSlots = {
  firstPageIcon: FunctionComponent;
  lastPageIcon: FunctionComponent;
  nextPageIcon: FunctionComponent;
  backPageIcon: FunctionComponent;
};

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
        toolbar: clsx('tw-flex', 'tw-flex-row'),
        displayedRows: clsx('tw-ml-auto', 'tw-mr-2'),
        actions: clsx('tw-flex'),
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
    firstPageIcon: ChevronDoubleLeftIcon,
    lastPageIcon: ChevronDoubleRightIcon,
    nextPageIcon: ChevronRightIcon,
    backPageIcon: ChevronLeftIcon,
  })(givenActionProps.slots);
  givenActionProps.slotProps = assocDefaultStyle<
    Required<TablePaginationActionsProps>['slotProps']
  >({
    slotWithDefaultClasses: {
      backButton: clsx('disabled:tw-text-disabled'),
      nextButton: clsx('disabled:tw-text-disabled'),
      lastButton: clsx('disabled:tw-text-disabled'),
      firstButton: clsx('disabled:tw-text-disabled'),
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
