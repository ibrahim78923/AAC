import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useGiftCards } from './useRewards';
import { ApiPollingButton } from '@/components/Buttons/ApiPollingButton';
import { AUTO_REFRESH_API_TIME_INTERVAL } from '@/config';

export const Rewards = () => {
  const {
    rewardsColumns,
    fulfilledTimeStamp,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    data,
    refetch,
    setPage,
    setLimit,
  } = useGiftCards();

  return (
    <Box
      border={1}
      borderColor={'custom.pale_gray'}
      borderRadius={3}
      bgcolor={'common.white'}
      height="100%"
    >
      <Box
        display={'flex'}
        gap={1}
        alignItems={'center'}
        p={1}
        justifyContent={'space-between'}
      >
        <Typography variant={'h5'}>Rewards</Typography>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <ApiPollingButton
            variant="text"
            onClick={refetch}
            showLoader={isLoading || isFetching}
            isFetching={isFetching}
            fulfilledTimeStamp={fulfilledTimeStamp}
            intervalTime={AUTO_REFRESH_API_TIME_INTERVAL?.DASHBOARD}
          />
          <Link href={AIR_LOYALTY_PROGRAM?.REWARDS}>
            <Button>View All</Button>
          </Link>
        </Box>
      </Box>

      <TanstackTable
        columns={rewardsColumns}
        data={data?.data?.physicalrewards}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        isSuccess={isSuccess}
        isPagination
        setPage={setPage}
        onPageChange={(page) => setPage(page)}
        setPageLimit={setLimit}
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        currentPage={data?.data?.meta?.page}
        totalRecords={data?.data?.meta?.total}
        rowsPerPageOptions={[3, 5]}
      />
    </Box>
  );
};
