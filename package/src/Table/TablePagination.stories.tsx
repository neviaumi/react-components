import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { createEmptyComponent } from '../utils/create-empty-component.tsx';
import vehicleMadeInUK from './fixtures/vehicle-made-in-uk.ts';
import { TablePagination as TablePaginationComponent } from './TablePagination.tsx';
import { withHiddenInput } from './withHiddenInput.tsx';

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
              count={vehicleMadeInUK.length}
              onPageChange={(_, page) => setCurrentPage(page)}
              onRowsPerPageChange={e => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setCurrentPage(0);
              }}
              page={currentPage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
            />
          </tr>
        </tfoot>
      </table>
    );
  },
};

export const PaginationWithSearchForm: Story = {
  render: () => {
    const searchForm = useRef<HTMLFormElement>(null);
    const TablePagination = withHiddenInput(TablePaginationComponent);
    const formData = searchForm.current
      ? new FormData(searchForm.current)
      : null;
    const currentPage =
      formData !== null && formData.has('page')
        ? Number(formData.get('page'))
        : 0;
    const rowsPerPage =
      formData !== null && formData.has('rowsPerPage')
        ? Number(formData.get('rowsPerPage'))
        : 10;
    const [{ count: rowsCount, rows }, setRows] = useState(() => {
      return {
        count: vehicleMadeInUK.length,
        rows: vehicleMadeInUK.slice(
          currentPage * rowsPerPage,
          (currentPage + 1) * rowsPerPage,
        ),
      };
    });

    const setPagination = (values: { page: string; rowsPerPage?: string }) => {
      const form = searchForm.current;
      if (form === null) {
        return;
      }
      const formElements = form.elements;
      (formElements.namedItem('page') as Element).setAttribute(
        'value',
        values.page,
      );
      if (values.rowsPerPage !== undefined)
        (formElements.namedItem('rowsPerPage') as Element).setAttribute(
          'value',
          values.rowsPerPage,
        );
    };
    const triggerSearchWithPagination = (
      formElement: HTMLFormElement | null,
    ) => {
      if (!formElement) return;
      const paginationAndFilterFormData = Object.fromEntries(
        new FormData(formElement).entries(),
      );

      const {
        company,
        page: currentPage,
        rowsPerPage,
      } = {
        company: paginationAndFilterFormData['company'] as string,
        page: Number(paginationAndFilterFormData['page']),
        rowsPerPage: Number(paginationAndFilterFormData['rowsPerPage']),
      };
      const filteredRows = vehicleMadeInUK.filter(row => {
        return row.company.toLowerCase().includes(company.toLowerCase());
      });
      setRows({
        count: filteredRows.length,
        rows: filteredRows.slice(
          currentPage * rowsPerPage,
          (currentPage + 1) * rowsPerPage,
        ),
      });
    };
    return (
      <>
        <search>
          <form
            id={'pagination-filter'}
            onSubmit={e => {
              e.preventDefault();
              triggerSearchWithPagination(searchForm.current);
            }}
            ref={searchForm}
          >
            <fieldset>
              <label>Company</label>
              <input name={'company'} type="text" />
            </fieldset>
            <button>Filter</button>
          </form>
        </search>
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
            {rows.map(row => (
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
              <td colSpan={1000}>
                <TablePagination
                  count={rowsCount}
                  onPageChange={() => {
                    triggerSearchWithPagination(searchForm.current);
                  }}
                  onRowsPerPageChange={() => {
                    setPagination({
                      page: '0',
                    });
                    triggerSearchWithPagination(searchForm.current);
                  }}
                  page={currentPage}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
                  slotProps={{
                    input: {
                      form: 'pagination-filter',
                      name: 'page',
                    },
                    select: {
                      form: 'pagination-filter',
                      name: 'rowsPerPage',
                    },
                  }}
                  slots={{
                    displayedRows: createEmptyComponent('div'),
                    root: 'div',
                  }}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </>
    );
  },
};
