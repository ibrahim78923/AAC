import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useEmailThisDashboard } from './useEmailThisDashboard';

const EmailThisDashboard = (props: any) => {
  const { isDrawerOpen } = props;
  const {
    methods,
    sendDashboardViaEmailFormFields,
    postEmailProgress,
    closeDrawer,
  } = useEmailThisDashboard(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => closeDrawer?.()}
        title="Email this dashboard"
        submitHandler={() => {}}
        footer
        isOk
        okText="Send"
        isDisabled={postEmailProgress?.isLoading}
        isLoading={postEmailProgress?.isLoading}
        disabledCancelBtn={postEmailProgress?.isLoading}
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
