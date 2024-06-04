import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useSingleCallsNotesDrawer } from './useSingleCallsNotesDrawer';

const SingleCallsNotesDrawer = (props: any) => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    cancelCallNotes,
    viewCallNotesFormFields,
    isViewDrawerOpen,
    setIsViewDrawerOpen,
  } = useSingleCallsNotesDrawer(props);

  return (
    <CommonDrawer
      footer
      isDrawerOpen={isViewDrawerOpen}
      onClose={() => setIsViewDrawerOpen(false)}
      title="View Call Notes"
      okText="Add"
      cancelText="cancel"
      isOk
      submitHandler={handleSubmit(onSubmit)}
      cancelBtnHandler={() => cancelCallNotes?.()}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {viewCallNotesFormFields?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default SingleCallsNotesDrawer;
