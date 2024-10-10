import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useSingleRewardsDetails } from './useSingleRewardsDetails';
import { SingleRewardDetailsPropsI } from '../Rewards.interface';

export const SingleRewardDetails = (props: SingleRewardDetailsPropsI) => {
  const { setIsRewardDetailsOpen } = props;
  const {
    singleRewardDetailsColumns,
    setPageLimit,
    setPage,
    lazyGetAllLoyaltyPhysicalRewardsListStatus,
    refetch,
    handleSearch,
  } = useSingleRewardsDetails?.();

  return (
    <>
      <PageTitledHeader
        title={'Redeemed Transactions'}
        canMovedBack
        moveBack={() =>
          setIsRewardDetailsOpen?.({ isOpen: false, rewardType: '' })
        }
      />
      <Box>
        <Search label="Search Here" setSearchBy={handleSearch} />
        <Box mt={'0.75rem'}>
          <TanstackTable
            columns={singleRewardDetailsColumns}
            data={lazyGetAllLoyaltyPhysicalRewardsListStatus?.data?.data}
            isLoading={lazyGetAllLoyaltyPhysicalRewardsListStatus?.isLoading}
            currentPage={
              lazyGetAllLoyaltyPhysicalRewardsListStatus?.data?.data?.meta?.page
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
            isFetching={lazyGetAllLoyaltyPhysicalRewardsListStatus?.isFetching}
            isError={lazyGetAllLoyaltyPhysicalRewardsListStatus?.isError}
            isSuccess={lazyGetAllLoyaltyPhysicalRewardsListStatus?.isSuccess}
            onPageChange={(page: any) => setPage(page)}
            errorProps={{ canRefresh: true, refresh: refetch }}
            isPagination
          />
        </Box>
      </Box>
    </>
  );
};
