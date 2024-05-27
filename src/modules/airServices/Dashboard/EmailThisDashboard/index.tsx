import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useEmailThisDashboard } from './useEmailThisDashboard ';
import { createEmailThisDashboardDataArray } from './EmailThisDashboard.data';
import { RecurringEmail } from './RecurringEmail';

function EmailThisDashboard({ isDrawerOpen, setIsDrawerOpen }: any) {
  const { methods, watchRecurringEmail, watch, setValue, postEmailProgress } =
    useEmailThisDashboard();
  const recurringEmail = 'recurring';
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        title="Email this dashboard"
        submitHandler={() => {}}
        footer={true}
        isOk={true}
        okText="Send"
        isDisabled={postEmailProgress?.isLoading}
        isLoading={postEmailProgress?.isLoading}
        disabledCancelBtn={postEmailProgress?.isLoading}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={3}>
              {createEmailThisDashboardDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  {item?.component === Typography && (
                    <Typography>{item?.componentProps?.value}</Typography>

                  )}
                  {item?.component !== Typography && (
                    <item.component {...item?.componentProps} size="small" />
                  )}
                </Grid>
              ))}
              {watchRecurringEmail === recurringEmail && (
                <RecurringEmail watch={watch} setValue={setValue} />
              )}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
}

export default EmailThisDashboard;
