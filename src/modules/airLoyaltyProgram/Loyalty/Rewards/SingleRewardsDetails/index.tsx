import { Box } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import Search from '@/components/Search';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useSingleRewardsDetails } from './useSingleRewardsDetails';
import { LOYALTY_REWARDS_TYPE_MAPPED } from '@/constants/api-mapped';

export const SingleRewardDetails = (props: any) => {
  const { isRewardDetailsOpen, setIsRewardDetailsOpen } = props;
  const {
    singleRewardDetailsColumns,
    setSearch,
    setPageLimit,
    setPage,
    lazyGetAllLoyaltyPhysicalRewardsListStatus,
  } = useSingleRewardsDetails?.(props);

  return (
    <>
      <PageTitledHeader
        title={`${LOYALTY_REWARDS_TYPE_MAPPED?.[
          isRewardDetailsOpen?.rewardType
        ]}`}
        canMovedBack
        moveBack={() =>
          setIsRewardDetailsOpen?.({ isOpen: false, rewardType: '' })
        }
      />
      <Box>
        <Search label="Search Here" setSearchBy={setSearch} />
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
            isPagination
          />
        </Box>
      </Box>
    </>
  );
};
