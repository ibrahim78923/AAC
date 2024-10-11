import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useEmailThisDashboard } from './useEmailThisDashboard';

const EmailThisDashboard = (props: any) => {
  const { isOpenDrawer, setIsDrawerOpen } = props;
  const {
    methods,
    sendDashboardViaEmailFormFields,
    sendSalesDashboardViaEmailStatus,
    closeDrawer,
    handleSubmit,
    submitEmail,
    sendSalesDashboardViaEmailOnceStatus,
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
          sendSalesDashboardViaEmailStatus?.isLoading ||
          sendSalesDashboardViaEmailOnceStatus?.isLoading
        }
        isLoading={
          sendSalesDashboardViaEmailStatus?.isLoading ||
          sendSalesDashboardViaEmailOnceStatus?.isLoading
        }
        disabledCancelBtn={
          sendSalesDashboardViaEmailStatus?.isLoading ||
          sendSalesDashboardViaEmailOnceStatus?.isLoading
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
