import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useEmailThisDashboard } from './useEmailThisDashboard';

const EmailThisDashboard = (props: any) => {
  const { isOpenDrawer, setIsDrawerOpen } = props;
  const {
    methods,
    sendDashboardViaEmailFormFields,
    sendMarketerDashboardViaEmailStatus,
    closeDrawer,
    handleSubmit,
    submitEmail,
    sendMarketerDashboardViaEmailOnceStatus,
  } = useEmailThisDashboard(setIsDrawerOpen);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isOpenDrawer}
        onClose={closeDrawer}
        title="Email this dashboard"
        submitHandler={handleSubmit(submitEmail)}
        footer
        isOk
        okText="Send"
        isDisabled={
          sendMarketerDashboardViaEmailStatus?.isLoading ||
          sendMarketerDashboardViaEmailOnceStatus?.isLoading
        }
        isLoading={
          sendMarketerDashboardViaEmailStatus?.isLoading ||
          sendMarketerDashboardViaEmailOnceStatus?.isLoading
        }
        disabledCancelBtn={
          sendMarketerDashboardViaEmailStatus?.isLoading ||
          sendMarketerDashboardViaEmailOnceStatus?.isLoading
        }
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={1}>
              {sendDashboardViaEmailFormFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size="small">
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

export default EmailThisDashboard;
