import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useEmailThisDashboard } from './useEmailThisDashboard ';
import { createEmailThisDashboardDataArray } from './EmailThisDashboard.data';

function EmailThisDashboard({ isDrawerOpen, setIsDrawerOpen }: any) {
  const { handleSubmit, submit, methods } = useEmailThisDashboard();
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        title="Email this dashboard"
        submitHandler={() => handleSubmit(submit)()}
        footer={true}
        isOk={true}
        okText="Send"
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {createEmailThisDashboardDataArray?.map((item: any) => (
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

export default EmailThisDashboard;
