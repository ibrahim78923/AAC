import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { useDigital } from './useDigital';
import { SingleRewardDetails } from '../SingleRewardsDetails';

export const Digital = () => {
  const {
    lazyGetAllLoyaltyDigitalRewardsListStatus,
    setSearch,
    setPageLimit,
    setPage,
    loyaltyDigitalRewardColumn,
    isRewardDetailsOpen,
    setIsRewardDetailsOpen,
  } = useDigital();

  return (
    <>
      {!isRewardDetailsOpen?.isOpen ? (
        <Box>
          <Search label="Search Here" setSearchBy={setSearch} />
          <Box mt={'0.75rem'}>
            <TanstackTable
              columns={loyaltyDigitalRewardColumn}
              data={lazyGetAllLoyaltyDigitalRewardsListStatus?.data?.data}
              isLoading={lazyGetAllLoyaltyDigitalRewardsListStatus?.isLoading}
              currentPage={
                lazyGetAllLoyaltyDigitalRewardsListStatus?.data?.data?.meta
                  ?.page
              }
              count={
                lazyGetAllLoyaltyDigitalRewardsListStatus?.data?.data?.meta
                  ?.pages
              }
              pageLimit={
                lazyGetAllLoyaltyDigitalRewardsListStatus?.data?.data?.meta
                  ?.limit
              }
              totalRecords={
                lazyGetAllLoyaltyDigitalRewardsListStatus?.data?.data?.meta
                  ?.total
              }
              setPage={setPage}
              setPageLimit={setPageLimit}
              isFetching={lazyGetAllLoyaltyDigitalRewardsListStatus?.isFetching}
              isError={lazyGetAllLoyaltyDigitalRewardsListStatus?.isError}
              isSuccess={lazyGetAllLoyaltyDigitalRewardsListStatus?.isSuccess}
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
