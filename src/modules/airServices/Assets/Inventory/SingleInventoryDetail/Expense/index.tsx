import TanstackTable from '@/components/Table/TanstackTable';
import { useExpense } from './useExpense';
import Header from './Header';

export const Expense = () => {
  const {
    expenseColumns,
    dropdownOptions,
    addExpenseProps,
    actionProps,
    expenseData,
    isFetching,
    isSuccess,
    isLoading,
    setPageLimit,
    setPage,
    pageLimit,
    metaData,
  } = useExpense();

  return (
    <>
      <Header
        dropdownOptions={dropdownOptions}
        addExpenseProps={addExpenseProps}
        actionProps={actionProps}
      />
      <br />
      <TanstackTable
        data={expenseData}
        columns={expenseColumns}
        isPagination
        isFetching={isFetching}
        isSuccess={isSuccess}
        isLoading={isLoading}
        setPageLimit={setPageLimit}
        setPage={setPage}
        count={metaData?.pages}
        totalRecords={metaData?.total}
        onPageChange={(page: any) => setPage(page)}
        currentPage={metaData?.page}
        pageLimit={pageLimit}
      />
    </>
  );
};
