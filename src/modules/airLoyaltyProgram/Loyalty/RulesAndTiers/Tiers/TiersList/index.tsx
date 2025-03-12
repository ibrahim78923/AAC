import { SkeletonTanStackTable } from '@/components/Skeletons/SkeletonTanStackTable';
import TanstackTable from '@/components/Table/TanstackTable';
import { useTiersList } from './useTiersList';

export const TiersList = () => {
  const {
    tiersListColumns,
    lazyGetLoyaltyProgramLoyaltyTiersListStatus,
    handlePageChange,
    handleSetPage,
    handleSetPageLimit,
    refetch,
    increment,
    decrement,
    isApiCalled,
  } = useTiersList();

  if (isApiCalled) return <SkeletonTanStackTable />;

  return (
    <TanstackTable
      columns={tiersListColumns}
      data={
        lazyGetLoyaltyProgramLoyaltyTiersListStatus?.data?.data
          ?.mergedResults ?? []
      }
      isLoading={lazyGetLoyaltyProgramLoyaltyTiersListStatus?.isLoading}
      currentPage={
        lazyGetLoyaltyProgramLoyaltyTiersListStatus?.data?.data?.meta?.page
      }
      count={
        lazyGetLoyaltyProgramLoyaltyTiersListStatus?.data?.data?.meta?.pages
      }
      pageLimit={
        lazyGetLoyaltyProgramLoyaltyTiersListStatus?.data?.data?.meta?.limit
      }
      totalRecords={
        lazyGetLoyaltyProgramLoyaltyTiersListStatus?.data?.data?.meta?.total
      }
      setPage={handleSetPage}
      setPageLimit={handleSetPageLimit}
      isFetching={lazyGetLoyaltyProgramLoyaltyTiersListStatus?.isFetching}
      isError={lazyGetLoyaltyProgramLoyaltyTiersListStatus?.isError}
      isSuccess={lazyGetLoyaltyProgramLoyaltyTiersListStatus?.isSuccess}
      onPageChange={handlePageChange}
      isPagination
      errorProps={{
        canRefresh: true,
        refresh: refetch,
      }}
      incrementPageClick={increment}
      decrementPageClick={decrement}
      noDataTableText="No tiers found"
    />
  );
};
