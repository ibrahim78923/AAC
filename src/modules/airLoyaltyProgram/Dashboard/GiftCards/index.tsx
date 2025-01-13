import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useGiftCards } from './useGiftCards';
import { ApiPollingButton } from '@/components/Buttons/ApiPollingButton';
import { AUTO_REFRESH_API_TIME_INTERVAL } from '@/config';

export const GiftCards = () => {
  const {
    giftCardsColumns,
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
        <Typography variant={'h5'}>Gift Cards</Typography>
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <ApiPollingButton
            variant="text"
            onClick={refetch}
            showLoader={isLoading || isFetching}
            isFetching={isFetching}
            fulfilledTimeStamp={fulfilledTimeStamp}
            intervalTime={AUTO_REFRESH_API_TIME_INTERVAL?.DASHBOARD}
          />
          <Link href={AIR_LOYALTY_PROGRAM?.GIFT_CARDS}>
            <Button>View All</Button>
          </Link>
        </Box>
      </Box>

      <TanstackTable
        columns={giftCardsColumns}
        data={data?.data?.giftcards}
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isLoading}
        isFetching={isFetching}
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
