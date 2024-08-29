import { Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { RecentActivitiesCard } from '../RecentActivitiesCard';
import NoData from '@/components/NoData';

const RecentActivitiesList = (props: any) => {
  const { data, isDrawerOpen, setIsDrawerOpen } = props;
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
        <>
          <Box marginTop={1}>
            <Typography variant="h5">Today</Typography>
          </Box>
          <Box my="0.75rem">
            {!!data?.recentActivities?.length ? (
              <>
                {data?.recentActivities?.map((item: any, index: any) => (
                  <>
                    <Box key={item?._id} marginTop={1}>
                      <RecentActivitiesCard data={item} index={index} />
                    </Box>
                  </>
                ))}
              </>
            ) : (
              <NoData />
            )}
          </Box>
        </>
      </CommonDrawer>
    </>
  );
};

export default RecentActivitiesList;
