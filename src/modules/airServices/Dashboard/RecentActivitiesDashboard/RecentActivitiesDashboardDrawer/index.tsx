import { Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { RecentActivitiesDashboardCard } from '../RecentActivitiesDashboardCard';
import { recentActivitiesDashboardCardData } from '../RecentActivitiesDashboardCard/RecentActivitiesDashboardCard.data';
import { v4 as uuidv4 } from 'uuid';
import Divider from '@mui/material/Divider';

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
            <>
              <Box key={uuidv4()} marginTop={1}>
                <RecentActivitiesDashboardCard
                  icon={item?.icon}
                  recentActivity={item?.recentActivity}
                  recentActivityRequest={item?.recentActivityRequest}
                  recentActivityDateTime={item?.recentActivityDateTime}
                />
              </Box>
              {recentActivitiesDashboardCardData?.length - 1 !== index && (
                <Divider
                  orientation="vertical"
                  sx={{
                    borderRadius: '1rem',
                    borderBottomWidth: '45px',
                    marginLeft: '2.1rem',
                    width: '6px',
                  }}
                />
              )}
            </>
          ))}{' '}
        </Box>
      </CommonDrawer>
    </>
  );
}

export default RecentActivitiesDashboardDrawer;
