import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useAllRewards } from './useAllRewards';

export const AllRewards = () => {
  const {
    lazyGetLoyaltyAllRewardsListStatus,
    setSearch,
    setPageLimit,
    setPage,
    loyaltyAllRewardColumn,
  } = useAllRewards();

  return (
    <Box>
      <Search label="Search Here" setSearchBy={setSearch} />
      <Box mt={'0.75rem'}>
        <TanstackTable
          columns={loyaltyAllRewardColumn}
          data={lazyGetLoyaltyAllRewardsListStatus?.data?.data}
          isLoading={lazyGetLoyaltyAllRewardsListStatus?.isLoading}
          currentPage={
            lazyGetLoyaltyAllRewardsListStatus?.data?.data?.meta?.page
          }
          count={lazyGetLoyaltyAllRewardsListStatus?.data?.data?.meta?.pages}
          pageLimit={
            lazyGetLoyaltyAllRewardsListStatus?.data?.data?.meta?.limit
          }
          totalRecords={
            lazyGetLoyaltyAllRewardsListStatus?.data?.data?.meta?.total
          }
          setPage={setPage}
          setPageLimit={setPageLimit}
          isFetching={lazyGetLoyaltyAllRewardsListStatus?.isFetching}
          isError={lazyGetLoyaltyAllRewardsListStatus?.isError}
          isSuccess={lazyGetLoyaltyAllRewardsListStatus?.isSuccess}
          onPageChange={(page: any) => setPage(page)}
          isPagination
        />
      </Box>
    </Box>
  );
};
