import { TablePagination } from '@busybox/react-components/Table/TablePagination';
import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import vehicleMadeInUK from './fixtures/vehicle-made-in-uk.ts';

const columnHelper = createColumnHelper<(typeof vehicleMadeInUK)[0]>();

const columns = [
  columnHelper.accessor(vehicle => vehicle.company, {
    cell: info => info.getValue(),
    header: 'Company',
    id: 'company',
  }),
  columnHelper.accessor(vehicle => vehicle.parentCompany, {
    cell: info => info.getValue(),
    header: 'Parent Company',
    id: 'parentCompany',
  }),
  columnHelper.accessor(vehicle => vehicle.headquarters, {
    cell: info => info.renderValue(),
    header: 'Headquarters',
    id: 'headquarters',
  }),
  columnHelper.accessor(vehicle => vehicle.modal, {
    cell: info => info.renderValue(),
    header: 'Modal',
    id: 'modal',
  }),
];

const meta: Meta<typeof TablePagination> = {
  component: TablePagination,
  title: 'Demo/React table',
};

export default meta;

type Story = StoryObj<typeof TablePagination>;

export const DemoTablePaginationStory: Story = {
  name: 'Vehicle Made In UK',
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const tableBody = within(canvas.getByTestId('test-table-body'));
    await step('Default in page one and show 10 rows per page', async () => {
      await expect(tableBody.findAllByRole('row')).resolves.toHaveLength(10);
      await expect(
        canvas.findByLabelText('displayed rows'),
      ).resolves.toHaveTextContent(`1–10 of ${vehicleMadeInUK.length}`);
    });
  },
  render: () => {
    const table = useReactTable({
      columns,
      data: vehicleMadeInUK,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
    });
    return (
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody data-testid={'test-table-body'}>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TablePagination
              count={vehicleMadeInUK.length}
              onPageChange={(_, page) => {
                table.setPageIndex(page);
              }}
              onRowsPerPageChange={e => {
                table.setPageSize(parseInt(e.target.value, 10));
              }}
              page={table.getState().pagination.pageIndex}
              rowsPerPage={table.getState().pagination.pageSize}
              rowsPerPageOptions={[
                10,
                20,
                30,
                { label: 'All', value: vehicleMadeInUK.length },
              ]}
              slotProps={{
                displayedRows: {
                  'aria-label': 'displayed rows',
                },
              }}
            />
          </tr>
        </tfoot>
      </table>
    );
  },
};
