import TanstackTable from '@/components/Table/TanstackTable';
import { useRoleAndRightsList } from './useRoleAndRightsList';
import { SkeletonTanStackTable } from '@/components/Skeletons/SkeletonTanStackTable';

export const RoleAndRightsList = () => {
  const {
    loyaltyRolesAndRightColumns,
    lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus,
    handlePageChange,
    handleSetPage,
    handleSetPageLimit,
    refetch,
    increment,
    decrement,
    isApiCalled,
  } = useRoleAndRightsList();

  if (isApiCalled) return <SkeletonTanStackTable />;

  return (
    <TanstackTable
      columns={loyaltyRolesAndRightColumns}
      data={
        lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus?.data?.data
          ?.companyaccountroles
      }
      isLoading={
        lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus?.isLoading
      }
      currentPage={
        lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus?.data?.data
          ?.meta?.page
      }
      count={
        lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus?.data?.data
          ?.meta?.pages
      }
      pageLimit={
        lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus?.data?.data
          ?.meta?.limit
      }
      totalRecords={
        lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus?.data?.data
          ?.meta?.total
      }
      setPage={handleSetPage}
      setPageLimit={handleSetPageLimit}
      isFetching={
        lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus?.isFetching
      }
      isError={
        lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus?.isError
      }
      isSuccess={
        lazyGetLoyaltyProgramRoleAndRightsPermissionsRoleListStatus?.isSuccess
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
