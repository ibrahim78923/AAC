import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Card, Divider, IconButton } from '@mui/material';
import { useTheme } from '@mui/material';
import { ActivitiesDataI } from './Activities.interface';
import { v4 as uuidv4 } from 'uuid';
import CustomPagination from '@/components/CustomPagination';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { useActivities } from './useActivities';
import { PAGINATION } from '@/config';

export const Activities = () => {
  const theme = useTheme();

  const {
    isLoading,
    isError,
    activitiesData,
    paginationData,
    pageLimit,
    page,
    handlePageChange,
    setPageLimit,
    setPage,
  } = useActivities();
  if (isLoading) return <SkeletonTable />;
  if (isError) return <ApiErrorState />;

  return (
    <>
      <Typography variant="h5" pb={1.6} color={theme?.palette?.slateBlue?.main}>
        Activities
      </Typography>
      <Card sx={{ p: 2.4 }}>
        {activitiesData?.map((activity: ActivitiesDataI, index: number) => (
          <Box key={uuidv4()}>
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
                  {activity?.createdBy}
                </Typography>
                <Typography
                  variant="body2"
                  color="secondary"
                  marginRight={0.3}
                  component={'span'}
                >
                  {activity?.createdByOne}
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  marginRight={0.3}
                  component={'span'}
                >
                  {activity?.createdByTwo}
                </Typography>

                <Box>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    component={'span'}
                    mr="0.625rem"
                  >
                    {activity?.timeOne}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    component={'span'}
                  >
                    {activity?.timeTwo}
                  </Typography>
                </Box>
                <Box sx={{ marginLeft: 2 }} key={uuidv4()}>
                  {index === 1 && (
                    <ul>
                      <li>
                        <Typography
                          variant="body2"
                          color="textPrimary"
                          component={'span'}
                        >
                          {activity?.attachedTicketPoint}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary"
                          component={'span'}
                        >
                          {activity?.attachedTicketPointOne}
                        </Typography>
                      </li>
                      <li>
                        <Typography
                          variant="body2"
                          color="textPrimary"
                          component={'span'}
                        >
                          {activity?.attachedTicketThree}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="primary"
                          component={'span'}
                        >
                          {activity?.attachedTicketPointFour}
                        </Typography>
                      </li>
                    </ul>
                  )}
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
        ))}
      </Card>
      <CustomPagination
        count={paginationData?.pages}
        totalRecords={paginationData?.total}
        pageLimit={pageLimit}
        currentPage={page}
        rowsPerPageOptions={PAGINATION?.ROWS_PER_PAGE}
        onPageChange={handlePageChange}
        setPageLimit={setPageLimit}
        setPage={setPage}
      />
    </>
  );
};
