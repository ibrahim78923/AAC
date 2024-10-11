import TanstackTable from '@/components/Table/TanstackTable';
import { useUserList } from './useUserList';
import { SkeletonTanStackTable } from '@/components/Skeletons/SkeletonTanStackTable';

export const UserList = () => {
  const {
    loyaltyProgramUsersListColumns,
    lazyGetLoyaltyProgramUserManagementProductUserListsStatus,
    handlePageChange,
    handleSetPage,
    handleSetPageLimit,
    refetch,
    increment,
    decrement,
    isApiCalled,
  } = useUserList();

  if (isApiCalled) return <SkeletonTanStackTable />;

  return (
    <TanstackTable
      columns={loyaltyProgramUsersListColumns}
      data={
        lazyGetLoyaltyProgramUserManagementProductUserListsStatus?.data?.data
          ?.usercompanyaccounts
      }
      isLoading={
        lazyGetLoyaltyProgramUserManagementProductUserListsStatus?.isLoading
      }
      currentPage={
        lazyGetLoyaltyProgramUserManagementProductUserListsStatus?.data?.data
          ?.meta?.page
      }
      count={
        lazyGetLoyaltyProgramUserManagementProductUserListsStatus?.data?.data
          ?.meta?.pages
      }
      pageLimit={
        lazyGetLoyaltyProgramUserManagementProductUserListsStatus?.data?.data
          ?.meta?.limit
      }
      totalRecords={
        lazyGetLoyaltyProgramUserManagementProductUserListsStatus?.data?.data
          ?.meta?.total
      }
      setPage={handleSetPage}
      setPageLimit={handleSetPageLimit}
      isFetching={
        lazyGetLoyaltyProgramUserManagementProductUserListsStatus?.isFetching
      }
      isError={
        lazyGetLoyaltyProgramUserManagementProductUserListsStatus?.isError
      }
      isSuccess={
        lazyGetLoyaltyProgramUserManagementProductUserListsStatus?.isSuccess
      }
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
