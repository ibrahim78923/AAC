import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useRewards } from './useRewards';
import { Box } from '@mui/material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { SingleRewardDetails } from './SingleRewardsDetails';
import { UpsertRewards } from './UpsertRewards';

export const Rewards = () => {
  const {
    lazyGetLoyaltyRewardsListStatus,
    setPageLimit,
    setPage,
    loyaltyAllRewardColumn,
    isRewardDetailsOpen,
    setIsRewardDetailsOpen,
    refetch,
    isRewardDrawerOpen,
    setIsRewardDrawerOpen,
    handleSearch,
  } = useRewards();
  return (
    <>
      <PageTitledHeader
        title="Rewards"
        addTitle="Add"
        handleAction={() => setIsRewardDrawerOpen?.({ isOpen: true, data: '' })}
      />
      <>
        {!isRewardDetailsOpen?.isOpen ? (
          <Box>
            <Search label="Search Here" setSearchBy={handleSearch} />
            <Box mt={'0.75rem'}>
              <TanstackTable
                columns={loyaltyAllRewardColumn}
                data={lazyGetLoyaltyRewardsListStatus?.data?.data?.rewards}
                isLoading={lazyGetLoyaltyRewardsListStatus?.isLoading}
                currentPage={
                  lazyGetLoyaltyRewardsListStatus?.data?.data?.meta?.page
                }
                count={lazyGetLoyaltyRewardsListStatus?.data?.data?.meta?.pages}
                pageLimit={
                  lazyGetLoyaltyRewardsListStatus?.data?.data?.meta?.limit
                }
                totalRecords={
                  lazyGetLoyaltyRewardsListStatus?.data?.data?.meta?.total
                }
                setPage={setPage}
                setPageLimit={setPageLimit}
                isFetching={lazyGetLoyaltyRewardsListStatus?.isFetching}
                isError={lazyGetLoyaltyRewardsListStatus?.isError}
                isSuccess={lazyGetLoyaltyRewardsListStatus?.isSuccess}
                onPageChange={(page: any) => setPage(page)}
                errorProps={{ canRefresh: true, refresh: refetch }}
                isPagination
              />
            </Box>
          </Box>
        ) : (
          <SingleRewardDetails
            isRewardDetailsOpen={isRewardDetailsOpen}
            setIsRewardDetailsOpen={setIsRewardDetailsOpen}
          />
        )}
        {isRewardDrawerOpen?.isOpen && (
          <UpsertRewards
            isRewardDrawerOpen={isRewardDrawerOpen?.isOpen}
            setIsRewardDrawerOpen={setIsRewardDrawerOpen}
          />
        )}
      </>
    </>
  );
};
