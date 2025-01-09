import { Box, Button, LinearProgress, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { CustomTooltip } from '@/components/CustomTooltip';
import TanstackTable from '@/components/Table/TanstackTable';
import { useTopConsumer } from './useTopConsumer';
import { Autorenew } from '@mui/icons-material';
import { pxToRem } from '@/utils/getFontValue';

export const TopConsumer = () => {
  const {
    topConsumersColumns,
    timeLapse,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    data,
    refetch,
    setPage,
    setLimit,
  } = useTopConsumer();

  return (
    <Box
      border={1}
      borderColor={'custom.pale_gray'}
      borderRadius={3}
      bgcolor={'common.white'}
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        p={2}
        justifyContent={'space-between'}
      >
        <Box display={'flex'} gap={1} alignItems={'center'}>
          <Typography variant={'h5'}>Top Consumers</Typography>

          <CustomTooltip
            title={
              'The consumers who have earned the most points will be the top consumers.'
            }
            placement={'right'}
          >
            <ErrorIcon sx={{ color: 'custom.main', cursor: 'pointer' }} />
          </CustomTooltip>
        </Box>
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
      </Box>

      <TanstackTable
        columns={topConsumersColumns}
        data={data?.data?.consumers}
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
        rowsPerPageOptions={[5, 10]}
      />
    </Box>
  );
};
