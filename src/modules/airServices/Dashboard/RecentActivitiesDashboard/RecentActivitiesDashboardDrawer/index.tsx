import { Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { RecentActivitiesDashboardCard } from '../RecentActivitiesDashboardCard';
import { recentActivitiesDashboardCardData } from '../RecentActivitiesDashboardCard/RecentActivitiesDashboardCard.data';
import { v4 as uuidv4 } from 'uuid';

function RecentActivitiesDashboardDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
}: any) {
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        title="Recent Activities"
        footer={false}
        isOk={false}
        okText=""
      >
        <Box>
          <Box marginTop={1}>
            <Typography variant="h5">Today</Typography>
          </Box>
          {recentActivitiesDashboardCardData?.map((item, index) => (
            <Box key={uuidv4()}>
              <RecentActivitiesDashboardCard
                icon={item?.icon}
                recentActivityText={item?.recentActivityText}
                recentActivityTextPassword={item?.recentActivityTextPassword}
                recentActivityTextDateTime={item?.recentActivityTextDateTime}
                isborderbottom={
                  recentActivitiesDashboardCardData?.length - 1 !== index
                }
              />
            </Box>
          ))}{' '}
        </Box>
      </CommonDrawer>
    </>
  );
}

export default RecentActivitiesDashboardDrawer;
