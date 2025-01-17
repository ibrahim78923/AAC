import { Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import NoData from '@/components/NoData';
import { DATE_TIME_FORMAT } from '@/constants';
import { RecentActivitiesIcon } from '@/assets/icons';
import { ActivityCard } from '@/components/Cards/ActivityCard';

const RecentActivitiesList = (props: any) => {
  const { data, isDrawerOpen, setIsDrawerOpen } = props;

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Recent Activities"
        footer={false}
        isOk={false}
        okText=""
      >
        <>
          <Box marginTop={1}>
            <Typography variant="h5" color="slateBlue.main">
              Today
            </Typography>
          </Box>
          <Box my="0.75rem">
            {!!data?.length ? (
              <>
                {data?.map((item: any, index: any) => (
                  <Box key={item?._id} marginTop={1}>
                    <ActivityCard
                      key={item?._id}
                      firstName={item?.userDetails?.firstName}
                      lastName={item?.userDetails?.lastName}
                      activityType={item?.activityType}
                      moduleName={item?.moduleName}
                      dateFormat={DATE_TIME_FORMAT?.DMDHMA}
                      activityDate={item?.createdAt}
                      Icon={<RecentActivitiesIcon />}
                      hasBorderBottom={index !== data?.length - 1}
                    />
                  </Box>
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
