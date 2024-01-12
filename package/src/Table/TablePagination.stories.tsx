import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TablePagination as TablePaginationComponent } from './TablePagination.tsx';
import vehicleMadeInUK from './fixtures/vehicle-made-in-uk.ts';
const meta: Meta<typeof TablePaginationComponent> = {
  component: TablePaginationComponent,
  title: 'Component/Table/Pagination',
};

export default meta;

type Story = StoryObj<typeof TablePaginationComponent>;

export const Pagination: Story = {
  render: () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const rowsSource =
      rowsPerPage === -1
        ? vehicleMadeInUK
        : vehicleMadeInUK.slice(
            currentPage * rowsPerPage,
            (currentPage + 1) * rowsPerPage,
          );
    return (
      <table>
        <thead>
          <tr className={'tw-text-left'}>
            <th>Company</th>
            <th>Parent Company</th>
            <th>Headquarters</th>
            <th>Modal</th>
          </tr>
        </thead>
        <tbody>
          {rowsSource.map(row => (
            <tr key={`${row['modal']}-${row['company']}`}>
              <td className={'tw-pr-3'}>{row.company}</td>
              <td className={'tw-pr-3'}>{row.parentCompany}</td>
              <td className={'tw-pr-3'}>{row.headquarters}</td>
              <td className={'tw-pr-3'}>{row.modal}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TablePaginationComponent
              rowsPerPageOptions={[10, 20, 30, { value: -1, label: 'All' }]}
              count={vehicleMadeInUK.length}
              onRowsPerPageChange={e => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setCurrentPage(0);
              }}
              onPageChange={(_, page) => setCurrentPage(page)}
              page={currentPage}
              rowsPerPage={rowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    );
  },
};