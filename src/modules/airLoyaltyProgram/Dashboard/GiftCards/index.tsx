import TanstackTable from '@/components/Table/TanstackTable';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { Box, Button, LinearProgress, Typography } from '@mui/material';
import Link from 'next/link';
import { useGiftCards } from './useGiftCards';
import { Autorenew } from '@mui/icons-material';
import { pxToRem } from '@/utils/getFontValue';

export const GiftCards = () => {
  const {
    giftCardsColumns,
    timeLapse,
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
          <Button
            className="small"
            color="inherit"
            size="small"
            startIcon={<Autorenew />}
            onClick={refetch}
            disabled={isLoading || isFetching}
            sx={{
              fontSize: pxToRem(12),
              fontWeight: 'fontWeightRegular',
              textTransform: 'lowercase',
            }}
          >
            {isLoading || isFetching ? (
              <Box>
                <LinearProgress sx={{ width: pxToRem(70) }} />
              </Box>
            ) : (
              timeLapse?.lastFetchLapseTime
            )}
          </Button>
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
