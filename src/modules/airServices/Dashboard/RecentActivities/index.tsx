import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { Box, Button, Typography } from '@mui/material';
import { useRecentActivities } from './useRecentActivities';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';
import RecentActivitiesList from './RecentActivitiesList';
import { RecentActivitiesCard } from './RecentActivitiesCard';
import { Fragment } from 'react';

export const RecentActivities = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    data,
    isLoading,
    isError,
    isFetching,
  } = useRecentActivities();

  return (
    <>
      <Box p={2}>
        <Typography variant="h5" color="slateBlue.main">
          Recent Activities
        </Typography>
      </Box>
      {isLoading || isFetching ? (
        <SkeletonTable />
      ) : isError ? (
        <ApiErrorState height="100%" />
      ) : data?.data?.length ? (
        <Box overflow={'auto'} height={'40vh'}>
          {data?.data?.map((item: any, index: any) => (
            <Fragment key={item?._id}>
              <RecentActivitiesCard data={item} index={index} />
            </Fragment>
          ))}
        </Box>
      ) : (
        <NoData message={'No recent activities found'} height={'100%'} />
      )}
      <Box textAlign={'center'}>
        <Button variant="text" fullWidth onClick={() => setIsDrawerOpen(true)}>
          View All
        </Button>
      </Box>
      {isDrawerOpen && (
        <RecentActivitiesList
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
        />
      )}
    </>
  );
};
