import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import { useExpense } from './useExpense';
import Header from './Header';
import { data } from './Expense.data';

export const Expense = () => {
  const { expenseColumns, dropdownOptions, addExpenseProps, actionProps }: any =
    useExpense();

  return (
    <>
      <Header
        dropdownOptions={dropdownOptions}
        addExpenseProps={addExpenseProps}
        actionProps={actionProps}
      />
      <br />
      <TanstackTable data={data} columns={expenseColumns} />
      <CustomPagination count={1} rowsPerPageOptions={[1, 2]} entriePages={1} />
    </>
  );
};
