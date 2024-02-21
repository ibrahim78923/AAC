import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Divider, IconButton } from '@mui/material';
import { useTheme } from '@mui/material';
import CustomPagination from '@/components/CustomPagination';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { useActivities } from './useActivities';
import { PAGINATION } from '@/config';
import { DATE_FORMAT, TIME_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import NoData from '@/components/NoData';

export const Activities = () => {
  const theme = useTheme();

  const { isLoading, isError, setPageLimit, setPage, isFetching, data } =
    useActivities();

  if (isLoading || isFetching) return <SkeletonTable />;

  if (isError) return <ApiErrorState />;

  return (
    <>
      <Typography variant="h5" color={'slateBlue.main'} my={1}>
        Activities
      </Typography>
      <Box
        border={'1px solid'}
        borderColor={'custom.off_white'}
        borderRadius={2}
      >
        {!!data?.data?.activitylogs?.length ? (
          data?.data?.activitylogs?.map((activity: any) => (
            <Box key={activity?._id}>
              <Box display={'flex'}>
                <IconButton
                  disabled
                  color="primary"
                  sx={{
                    border: `0.063rem solid ${theme?.palette?.primary?.main}`,
                    height: '1.75rem',
                    width: '1.75rem',
                  }}
                >
                  <BorderColorIcon color="primary" sx={{ p: 0.35 }} />
                </IconButton>
                <Box sx={{ marginLeft: 2 }}>
                  <Typography
                    variant="body2"
                    color="primary"
                    marginRight={0.3}
                    component={'span'}
                  >
                    {activity?.performedByName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="secondary"
                    marginRight={0.3}
                    component={'span'}
                  >
                    {activity?.activityType} {activity?.moduleName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    marginRight={0.3}
                    component={'span'}
                  >
                    {activity?.moduleName}
                  </Typography>

                  <Box>
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component={'span'}
                      mr="0.625rem"
                    >
                      {dayjs(activity?.createdAt)?.format(DATE_FORMAT?.UI)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component={'span'}
                    >
                      {dayjs(activity?.createdAt)?.format(TIME_FORMAT?.UI)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                display={'flex'}
                flexWrap={'wrap'}
                alignItems={'center'}
                gap={1.3}
                marginBottom={1.5}
              >
                <Box flex={'0 0 0.4%'}></Box>
                <Divider
                  orientation="vertical"
                  sx={{
                    borderRadius: '1.25rem',
                    background: theme?.palette?.primary?.light,
                    width: '0.25rem',
                    height: '3.063rem',
                  }}
                />
                <Box flex={0}></Box>
              </Box>
            </Box>
          ))
        ) : (
          <NoData height="40vh" />
        )}
      </Box>
      <CustomPagination
        count={data?.data?.meta?.pages}
        totalRecords={data?.data?.meta?.total}
        pageLimit={data?.data?.meta?.limit}
        currentPage={data?.data?.meta?.page}
        rowsPerPageOptions={PAGINATION?.ROWS_PER_PAGE}
        onPageChange={(page: any) => setPage(page)}
        setPageLimit={setPageLimit}
        setPage={setPage}
      />
    </>
  );
};
