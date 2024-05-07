import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { usePhysical } from './usePhysical';
import { SingleRewardDetails } from '../SingleRewardsDetails';

export const Physical = () => {
  const {
    lazyGetAllLoyaltyPhysicalRewardsListStatus,
    setSearch,
    setPageLimit,
    setPage,
    loyaltyPhysicalRewardColumn,
    isRewardDetailsOpen,
    setIsRewardDetailsOpen,
  } = usePhysical();

  return (
    <>
      {!isRewardDetailsOpen?.isOpen ? (
        <Box>
          <Search label="Search Here" setSearchBy={setSearch} />
          <Box mt={'0.75rem'}>
            <TanstackTable
              columns={loyaltyPhysicalRewardColumn}
              data={
                lazyGetAllLoyaltyPhysicalRewardsListStatus?.data?.data?.rewards
              }
              isLoading={lazyGetAllLoyaltyPhysicalRewardsListStatus?.isLoading}
              currentPage={
                lazyGetAllLoyaltyPhysicalRewardsListStatus?.data?.data?.meta
                  ?.page
              }
              count={
                lazyGetAllLoyaltyPhysicalRewardsListStatus?.data?.data?.meta
                  ?.pages
              }
              pageLimit={
                lazyGetAllLoyaltyPhysicalRewardsListStatus?.data?.data?.meta
                  ?.limit
              }
              totalRecords={
                lazyGetAllLoyaltyPhysicalRewardsListStatus?.data?.data?.meta
                  ?.total
              }
              setPage={setPage}
              setPageLimit={setPageLimit}
              isFetching={
                lazyGetAllLoyaltyPhysicalRewardsListStatus?.isFetching
              }
              isError={lazyGetAllLoyaltyPhysicalRewardsListStatus?.isError}
              isSuccess={lazyGetAllLoyaltyPhysicalRewardsListStatus?.isSuccess}
              onPageChange={(page: any) => setPage(page)}
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
    </>
  );
};
