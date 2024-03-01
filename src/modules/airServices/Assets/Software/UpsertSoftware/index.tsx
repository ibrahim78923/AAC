import CommonDrawer from '@/components/CommonDrawer';
import { upsertSoftwareFormFields } from './UpsertSoftware.data';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';

export const UpsertSoftware = (props: any) => {
  const {
    isDrawerOpen,
    onClose,
    methods,
    submitHandler,
    isLoading,
    userQuery,
  } = props;
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={onClose}
      isOk
      okText="Save"
      footer
      title="New Software"
      submitHandler={submitHandler}
      isLoading={isLoading}
    >
      <Box mt={1}>
        <FormProvider methods={methods} onSubmit={submitHandler}>
          <Grid container spacing={1}>
            {upsertSoftwareFormFields(userQuery)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};
