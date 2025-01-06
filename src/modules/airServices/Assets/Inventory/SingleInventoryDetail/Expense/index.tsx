import TanstackTable from '@/components/Table/TanstackTable';
import { useExpense } from './useExpense';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { Header } from './Header';

export const Expense = () => {
  const {
    expenseColumns,
    expenseData,
    isFetching,
    isSuccess,
    isLoading,
    setPageLimit,
    setPage,
    metaData,
    isError,
    refetch,
    selectedExpenseList,
    setSelectedExpenseList,
  } = useExpense();

  return (
    <>
      <Header
        selectedExpenseList={selectedExpenseList}
        setSelectedExpenseList={setSelectedExpenseList}
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
          pageLimit={metaData?.limit}
          errorProps={{
            canRefresh: true,
            refresh: refetch,
          }}
        />
      </PermissionsGuard>
    </>
  );
};
