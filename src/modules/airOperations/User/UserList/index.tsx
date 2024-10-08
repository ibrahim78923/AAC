import TanstackTable from '@/components/Table/TanstackTable';
import { useUserList } from './useUserList';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

export const UserList = () => {
  const {
    operationUsersListColumns,
    lazyGetProductUserListForOperationStatus,
    handlePageChange,
    handleSetPage,
    handleSetPageLimit,
    refetch,
    increment,
    decrement,
    isApiCalled,
  } = useUserList();

  if (isApiCalled) return <SkeletonTable />;

  return (
    <TanstackTable
      columns={operationUsersListColumns}
      data={
        lazyGetProductUserListForOperationStatus?.data?.data
          ?.usercompanyaccounts
      }
      isLoading={lazyGetProductUserListForOperationStatus?.isLoading}
      currentPage={
        lazyGetProductUserListForOperationStatus?.data?.data?.meta?.page
      }
      count={lazyGetProductUserListForOperationStatus?.data?.data?.meta?.pages}
      pageLimit={
        lazyGetProductUserListForOperationStatus?.data?.data?.meta?.limit
      }
      totalRecords={
        lazyGetProductUserListForOperationStatus?.data?.data?.meta?.total
      }
      setPage={handleSetPage}
      setPageLimit={handleSetPageLimit}
      isFetching={lazyGetProductUserListForOperationStatus?.isFetching}
      isError={lazyGetProductUserListForOperationStatus?.isError}
      isSuccess={lazyGetProductUserListForOperationStatus?.isSuccess}
      onPageChange={handlePageChange}
      isPagination
      errorProps={{
        canRefresh: true,
        refresh: refetch,
      }}
      incrementPageClick={increment}
      decrementPageClick={decrement}
    />
  );
};
