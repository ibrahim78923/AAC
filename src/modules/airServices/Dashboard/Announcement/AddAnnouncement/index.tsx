import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useAddAnnouncement } from './useAddAnnouncement';

const AddAnnouncement = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    createAddAnnouncementFormFields,
    submit,
    methods,
    handleClose,
    handleSubmit,
    postAnnouncementStatus,
  } = useAddAnnouncement(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={handleClose}
        title={'New Announcements'}
        submitHandler={() => handleSubmit(submit)()}
        footer
        isOk
        okText={'Announce'}
        isLoading={postAnnouncementStatus?.isLoading}
        isDisabled={postAnnouncementStatus?.isLoading}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {createAddAnnouncementFormFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.heading ? item?.heading : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default AddAnnouncement;
