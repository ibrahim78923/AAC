import { Box, Button, Typography } from '@mui/material';
import NoData from '@/components/NoData';
import RecentActivitiesList from './RecentActivitiesList';
import { useState } from 'react';
import { SingleDashboardComponentPropsI } from '../SingleDashboard/SingleDashboard.interface';
import { ActivityCard } from '@/components/Cards/ActivityCard';
import { DATE_TIME_FORMAT } from '@/constants';
import { RecentActivitiesIcon } from '@/assets/icons';

export const RecentActivities = (props: SingleDashboardComponentPropsI) => {
  const { data, isPreviewMode } = props;
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const recentActivitiesData = data?.recentActivities;
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
        {recentActivitiesData?.length ? (
          <>
            {recentActivitiesData?.map((item: any) => (
              <ActivityCard
                key={item?._id}
                firstName={item?.userDetails?.firstName}
                lastName={item?.userDetails?.lastName}
                activityType={item?.activityType}
                moduleName={item?.moduleName}
                dateFormat={DATE_TIME_FORMAT?.DMDHMA}
                activityDate={item?.createdAt}
                Icon={<RecentActivitiesIcon />}
                hasBorderBottom
              />
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
          data={recentActivitiesData}
        />
      )}
    </Box>
  );
};
