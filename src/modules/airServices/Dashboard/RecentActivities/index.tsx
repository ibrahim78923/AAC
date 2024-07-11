import { Box, Button, Typography } from '@mui/material';
import { useRecentActivities } from './useRecentActivities';
import NoData from '@/components/NoData';
import RecentActivitiesList from './RecentActivitiesList';
import { RecentActivitiesCard } from './RecentActivitiesCard';
import { Fragment } from 'react';

export const RecentActivities = (props: any) => {
  const { data, isPreviewMode } = props;
  const { isDrawerOpen, setIsDrawerOpen } = useRecentActivities();

  return (
    <Box
      borderRadius={3}
      border={`1px solid`}
      borderColor="custom.off_white"
      height="100%"
    >
      <Box p={2}>
        <Typography variant="h5" color="slateBlue.main">
          Recent Activities
        </Typography>
      </Box>
      {data?.recentActivities?.length ? (
        <Box overflow={'auto'} height={'40vh'}>
          {data?.recentActivities?.map((item: any, index: any) => (
            <Fragment key={item?._id}>
              <RecentActivitiesCard data={item} index={index} />
            </Fragment>
          ))}
        </Box>
      ) : (
        <NoData message={'No recent activities found'} height={'100%'} />
      )}
      <Box textAlign={'center'}>
        <Button
          variant="text"
          disabled={isPreviewMode}
          fullWidth
          onClick={() => setIsDrawerOpen(true)}
        >
          View All
        </Button>
      </Box>
      {isDrawerOpen && (
        <RecentActivitiesList
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          data={data}
        />
      )}
    </Box>
  );
};
