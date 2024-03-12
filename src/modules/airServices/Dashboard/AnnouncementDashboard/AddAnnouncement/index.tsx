import { Box, Grid } from '@mui/material';
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
  userDropdown,
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
              {createAddAnnouncementDataArray(
                departmentDropdown,
                userDropdown,
              )?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option value={option?.value} key={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : item?.componentProps?.value
                      ? item?.componentProps?.value
                      : null}
                  </item.component>
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
