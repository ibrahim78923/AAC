import TanstackTable from '@/components/Table/TanstackTable';
import { useTeamsList } from './useTeamsList';
import { SkeletonTanStackTable } from '@/components/Skeletons/SkeletonTanStackTable';

export const TeamsList = () => {
  const {
    operationsTeamsListColumn,
    lazyGetTeamListForOperationStatus,
    handlePageChange,
    handleSetPage,
    handleSetPageLimit,
    refetch,
    increment,
    decrement,
    isApiCalled,
  } = useTeamsList();

  if (isApiCalled) return <SkeletonTanStackTable />;

  return (
    <TanstackTable
      columns={operationsTeamsListColumn}
      data={lazyGetTeamListForOperationStatus?.data?.data?.userTeams}
      isLoading={lazyGetTeamListForOperationStatus?.isLoading}
      currentPage={lazyGetTeamListForOperationStatus?.data?.data?.meta?.page}
      count={lazyGetTeamListForOperationStatus?.data?.data?.meta?.pages}
      pageLimit={lazyGetTeamListForOperationStatus?.data?.data?.meta?.limit}
      totalRecords={lazyGetTeamListForOperationStatus?.data?.data?.meta?.total}
      setPage={handleSetPage}
      setPageLimit={handleSetPageLimit}
      isFetching={lazyGetTeamListForOperationStatus?.isFetching}
      isError={lazyGetTeamListForOperationStatus?.isError}
      isSuccess={lazyGetTeamListForOperationStatus?.isSuccess}
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
