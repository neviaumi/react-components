import { useRef } from 'react';

import type { SlotComponentPropsWithoutOverride } from '../components.ts';
import {
  TablePagination,
  type TablePaginationProps,
} from './TablePagination.tsx';

export function withHiddenInput(TablePaginationComp: typeof TablePagination) {
  return function WithHiddenInput({
    onPageChange,
    page,
    slotProps,
    ...props
  }: TablePaginationProps & {
    slotProps?: TablePaginationProps['slotProps'] & {
      input?: SlotComponentPropsWithoutOverride<'input'>;
    };
  }) {
    const ref = useRef<HTMLInputElement>(null);
    const { input, ...tablePaginationSlotProps } = slotProps || {};
    const changeInputValueWhenPageChange = (e: any, page: number) => {
      ref.current!.value = String(page);
      onPageChange(e, page);
    };
    return (
      <>
        <input
          ref={ref}
          {...input}
          onChange={e => {
            // @ts-expect-error no type check here as event not used as well
            onPageChange(e, Number(e.target.value));
          }}
          type="hidden"
          value={page}
        />
        <TablePaginationComp
          {...props}
          onPageChange={changeInputValueWhenPageChange}
          page={page}
          slotProps={tablePaginationSlotProps}
        />
      </>
    );
  };
}
