import { TablePagination } from '@busybox/react-components/Table/TablePagination';
import type { Meta, StoryObj } from '@storybook/react';
import vehicleMadeInUK from './fixtures/vehicle-made-in-uk.ts';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const columnHelper = createColumnHelper<(typeof vehicleMadeInUK)[0]>();

const columns = [
  columnHelper.accessor(vehicle => vehicle.company, {
    id: 'company',
    header: 'Company',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor(vehicle => vehicle.parentCompany, {
    id: 'parentCompany',
    header: 'Parent Company',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor(vehicle => vehicle.headquarters, {
    id: 'headquarters',
    header: 'Headquarters',
    cell: info => info.renderValue(),
  }),
  columnHelper.accessor(vehicle => vehicle.modal, {
    id: 'modal',
    header: 'Modal',
    cell: info => info.renderValue(),
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
      data: vehicleMadeInUK,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination: {
          pageSize: 10,
          pageIndex: 0,
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
              slotProps={{
                displayedRows: {
                  'aria-label': 'displayed rows',
                },
              }}
              rowsPerPageOptions={[
                10,
                20,
                30,
                { value: vehicleMadeInUK.length, label: 'All' },
              ]}
              count={vehicleMadeInUK.length}
              onRowsPerPageChange={e => {
                table.setPageSize(parseInt(e.target.value, 10));
              }}
              onPageChange={(_, page) => {
                console.log('page', page);
                table.setPageIndex(page);
              }}
              page={table.getState().pagination.pageIndex}
              rowsPerPage={table.getState().pagination.pageSize}
            />
          </tr>
        </tfoot>
      </table>
    );
  },
};
