import React from 'react';
import { expenseTableData, expenseTableColumns } from './ExpenseTable.utils';
import TanstackTable from '@/components/Tabel/TanstackTable';

const ExpenseTable = ({ setexpensData, expensData }: any) => {
  return (
    <div>
      <TanstackTable
        columns={expenseTableColumns(
          expensData,
          setexpensData,
          expenseTableData,
        )}
        data={expenseTableData}
      />
    </div>
  );
};

export default ExpenseTable;
