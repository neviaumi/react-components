import { cy, describe, it } from '@busybox/cypress';

import vehicleMadeInUK from './fixtures/vehicle-made-in-uk.ts';
import {
  TablePagination,
  type TablePaginationProps,
} from './TablePagination.tsx';
import { useState } from 'react';

function TestTableWithPagination(props: Partial<TablePaginationProps>) {
  const [rowsPerPage, setRowsPerPage] = useState(-1);
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
        <tr>
          <TablePagination
            {...props}
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
      <tfoot></tfoot>
    </table>
  );
}

describe('Table Pagination', () => {
  it('should disable action buttons when there is no more pages', () => {
    cy.mount(<TestTableWithPagination />);
    cy.findByRole('button', { name: 'Go to first page' }).should('be.disabled');
    cy.findByRole('button', { name: 'Go to next page' }).should('be.disabled');
    cy.findByRole('button', { name: 'Go to previous page' }).should(
      'be.disabled',
    );
    cy.findByRole('button', { name: 'Go to last page' }).should('be.disabled');
  });

  it('should able to change row displayed per page', () => {
    cy.mount(
      <TestTableWithPagination
        slotProps={{
          displayedRows: {
            'aria-label': 'displayed rows',
          },
        }}
      />,
    );
    cy.findByLabelText('displayed rows').should(
      'have.text',
      `1–${vehicleMadeInUK.length} of ${vehicleMadeInUK.length}`,
    );
    cy.findByRole('combobox', { name: 'Rows per page: -1' }).select('10');
    cy.findByLabelText('displayed rows').should(
      'have.text',
      `1–10 of ${vehicleMadeInUK.length}`,
    );
  });

  it('should able to change page number and displayed rows should change accordingly ', () => {
    cy.mount(
      <TestTableWithPagination
        slotProps={{
          displayedRows: {
            'aria-label': 'displayed rows',
          },
        }}
      />,
    );
    cy.findByRole('combobox', { name: 'Rows per page: -1' }).select('10');
    cy.findByLabelText('displayed rows').should(
      'have.text',
      `1–10 of ${vehicleMadeInUK.length}`,
    );
    cy.findByRole('button', { name: 'Go to next page' }).click();
    cy.findByLabelText('displayed rows').should(
      'have.text',
      `11–20 of ${vehicleMadeInUK.length}`,
    );
  });
});
