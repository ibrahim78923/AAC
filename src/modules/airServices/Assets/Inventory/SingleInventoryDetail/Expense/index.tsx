import TanstackTable from '@/components/Table/TanstackTable';
import { useExpense } from './useExpense';
import Header from './Header';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';

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
    isError,
    refetch,
  } = useExpense();

  return (
    <>
      <Header
        dropdownOptions={dropdownOptions}
        addExpenseProps={addExpenseProps}
        actionProps={actionProps}
      />
      <br />
      <PermissionsGuard
        permissions={[
          AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.EXPENSE_LIST_VIEW,
        ]}
      >
        <TanstackTable
          data={expenseData}
          columns={expenseColumns}
          isPagination
          isFetching={isFetching}
          isSuccess={isSuccess}
          isLoading={isLoading}
          isError={isError}
          setPageLimit={setPageLimit}
          setPage={setPage}
          count={metaData?.pages}
          totalRecords={metaData?.total}
          onPageChange={(page: number) => setPage(page)}
          currentPage={metaData?.page}
          pageLimit={pageLimit}
          errorProps={{
            canRefresh: true,
            refresh: refetch,
          }}
        />
      </PermissionsGuard>
    </>
  );
};
