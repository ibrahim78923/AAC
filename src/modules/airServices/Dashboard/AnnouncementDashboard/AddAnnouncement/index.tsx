import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import {
  createAnnouncementDashboardDataArray,
} from './AddAnnouncement.data';
import CommonDrawer from '@/components/CommonDrawer';

import { useAddAnnouncement } from './useAddAnnouncement ';

function AddAnnouncement({ isDrawerOpen, setIsDrawerOpen }: any) {
  const {
    methods,
    handleSubmit,
    submit,
  } = useAddAnnouncement();
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        title="New Announcements"
        submitHandler={() => handleSubmit(submit)()}
        footer={true}
        isOk={true}
        okText="Announce"
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={3}>
              {createAnnouncementDashboardDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  {item.component === Typography && (
                    <Typography>{item.componentProps.value}</Typography>
                  )}
                  {item.component !== Typography && (
                    <item.component {...item.componentProps} size="small" />
                  )}
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
}

export default AddAnnouncement;
