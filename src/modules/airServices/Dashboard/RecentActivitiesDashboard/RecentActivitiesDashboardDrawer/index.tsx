import { Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { RecentActivitiesDashboardCard } from '../RecentActivitiesDashboardCard';
import { recentActivitiesDashboardCardData } from '../RecentActivitiesDashboardCard/RecentActivitiesDashboardCard.data';
import Divider from '@mui/material/Divider';
import { useDashboard } from '../../useDashboard';

function RecentActivitiesDashboardDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
}: any) {
  const { recentActivities } = useDashboard();
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
          {recentActivitiesDashboardCardData(recentActivities)?.map(
            (item, index) => (
              <>
                <Box key={item?.id} marginTop={1}>
                  <RecentActivitiesDashboardCard
                    icon={item?.icon}
                    recentActivity={item?.recentActivity}
                    recentActivityRequest={item?.recentActivityRequest}
                    recentActivityDateTime={item?.recentActivityDateTime}
                    recentActivityName={item?.recentActivityName}
                    recentActivitySerialNumber={
                      item?.recentActivitySerialNumber
                    }
                    recentActivityModuleName={item?.recentActivityModuleName}
                  />
                </Box>
                {recentActivitiesDashboardCardData(recentActivities)?.length -
                  1 !==
                  index && (
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
            ),
          )}{' '}
        </Box>
      </CommonDrawer>
    </>
  );
}

export default RecentActivitiesDashboardDrawer;
