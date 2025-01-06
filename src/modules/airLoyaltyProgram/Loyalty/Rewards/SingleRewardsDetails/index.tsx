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
    lazyGetRewardsListStatus,
    refetch,
    handleSearch,
    redeemRewardData,
  } = useSingleRewardsDetails?.(props);

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
            data={redeemRewardData}
            isLoading={lazyGetRewardsListStatus?.isLoading}
            currentPage={lazyGetRewardsListStatus?.data?.data?.meta?.page}
            count={lazyGetRewardsListStatus?.data?.data?.meta?.pages}
            pageLimit={lazyGetRewardsListStatus?.data?.data?.meta?.limit}
            totalRecords={lazyGetRewardsListStatus?.data?.data?.meta?.total}
            setPage={setPage}
            setPageLimit={setPageLimit}
            isFetching={lazyGetRewardsListStatus?.isFetching}
            isError={lazyGetRewardsListStatus?.isError}
            isSuccess={lazyGetRewardsListStatus?.isSuccess}
            onPageChange={(page: any) => setPage(page)}
            errorProps={{ canRefresh: true, refresh: refetch }}
            isPagination
          />
        </Box>
      </Box>
    </>
  );
};
