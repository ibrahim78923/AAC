import { Box, Button, Typography } from '@mui/material';
import NoData from '@/components/NoData';
import RecentActivitiesList from './RecentActivitiesList';
import { RecentActivitiesCard } from './RecentActivitiesCard';
import { Fragment, useState } from 'react';
import { SingleDashboardComponentPropsI } from '../SingleDashboard/SingleDashboard.interface';

export const RecentActivities = (props: SingleDashboardComponentPropsI) => {
  const { data, isPreviewMode } = props;
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return (
    <Box
      borderRadius={3}
      border={`1px solid`}
      borderColor="custom.off_white"
      maxHeight="100%"
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box
        px={2}
        py={1}
        borderBottom={`1px solid`}
        borderColor="custom.off_white"
      >
        <Typography variant="h5" color="slateBlue.main">
          Recent Activities
        </Typography>
      </Box>
      <Box flex={1}>
        {data?.recentActivities?.length ? (
          <>
            {data?.recentActivities?.map((item: any) => (
              <Fragment key={item?._id}>
                <RecentActivitiesCard data={item} />
              </Fragment>
            ))}
          </>
        ) : (
          <NoData message={'No recent activities found'} height={'100%'} />
        )}
      </Box>
      <Box textAlign={'center'}>
        <Button
          className="small"
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
