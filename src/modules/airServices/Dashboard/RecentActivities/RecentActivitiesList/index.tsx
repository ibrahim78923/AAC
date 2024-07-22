import { Box, Typography } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { RecentActivitiesCard } from '../RecentActivitiesCard';
import Divider from '@mui/material/Divider';
import NoData from '@/components/NoData';
import { Fragment } from 'react';

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
                    <Box key={item?.id} marginTop={1}>
                      <Fragment key={item?._id}>
                        <RecentActivitiesCard data={item} index={index} />
                      </Fragment>
                    </Box>
                    {data?.data?.length - 1 !== index && (
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
