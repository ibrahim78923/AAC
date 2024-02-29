import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { createAddAnnouncementDataArray } from './AddAnnouncement.data';
import CommonDrawer from '@/components/CommonDrawer';

function AddAnnouncement({
  isDrawerOpen,
  title,
  okText,
  submit,
  methods,
  handleClose,
  departmentDropdown,
  userDropdown
}: any) {
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={handleClose}
        title={title}
        submitHandler={submit}
        footer={true}
        isOk={true}
        okText={okText}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={3}>
              {createAddAnnouncementDataArray(departmentDropdown,userDropdown)?.map((item: any) => (
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
